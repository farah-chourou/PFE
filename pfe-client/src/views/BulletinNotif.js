import React,{ Component } from 'react';
import axios from 'axios';
import  { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NotificationAlert from "react-notification-alert";
import {Modal,Row,Col,Form} from "react-bootstrap";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import {MdSend} from 'react-icons/md';
import moment from 'moment';
import 'moment/locale/fr';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

import {FiAlertCircle} from 'react-icons/fi';

const useStyles = makeStyles((theme) => ({

 root: {
  '& .MuiTextField-root': {
    margin: theme.spacing(1),
    width: '25ch',
  },
},

button: {
  margin: theme.spacing(1),
},
formControl: {
  margin: theme.spacing(1),
  minWidth: 120,
},
selectEmpty: {
  marginTop: theme.spacing(2),
},

}));


 export default function  BulletinNotif (props) {
      const classes = useStyles();
      const[id,setId]=useState(props.match.params.id)
      const [notif,setNotif]=useState([])
      const [bull, setBull] = useState([])
      const [expediteur, setExpediteur] = useState([])
      const[user,setUser]=useState([])
      const[comment,setComment]=useState()
      var color ="";
      var title=""
      var message="";
      var icon ="";

      const [show,setShow] =useState(false);
      const [avis,setAvis] = useState("")
      const [AllAvis,setAllAvis] = useState([])
      const [showAutre,setShowAutre]=useState(false)
     const[commentaireMed,setCommentaireMed] = useState("")
      const [autreAvis,setAutreAvis] = useState("")

      const [showSelect,setShowSelect]=useState(false)
  const [medecins,setMedecins]=useState([])
  const [specialiteMed,setSpecialiteMed]=useState()

      moment.locale('fr');



      useEffect(() => {
        const local = localStorage.getItem("user");
        setUser(JSON.parse(local)) 
      
        getBull();
        updateEtatNotif();

        getAllAvis();
        getAllMed();

       }, [])


   const getBull=()=>{
      axios.get('http://localhost:8080/getNotif/'+id).then(res => {
      { 
        (res.data.suivisBull != null)? 
setBull(res.data.suivisBull)      
      : 
      ( setBull(res.data.suivisBullMed)
  )
      }


      setNotif(res.data)
      setExpediteur(res.data.expediteurNotif)
    
    }
    )
  }


 const updateEtatNotif=() =>{
axios.put(' http://localhost:8080/updateNotif/' + id).then(res => {

})
 
}

//----

const handleDelete =()=> {
  axios.delete('http://localhost:8080/deleteBull/'+bull.numBull).then(res => {
     setShow(false)
 
          })
          title ="Succés"
          color="success"
          message ="Bulletin supprimer avec succés"
          icon ="nc-icon nc-check-2"
           notify("br"); 
      
 }
 const envoyerBull = (numBull,specialiteMed) => {
  const local = localStorage.getItem("user");
      
  axios.post('http://localhost:8080/addBullMed/'+ numBull + "/" + specialiteMed + "/"+ JSON.parse(local).userName).then(res => {
    console.log(res.data);
  })

  axios.put('http://localhost:8080/updateEtapeBull/'+ numBull ).then(res => {
    console.log(res.data);
  })

  color ="success";
  title ="Succés!";
  message="Bulletin envoyer avec succés"
  icon ="nc-icon nc-simple-remove"
  notify("br"); 
 
}

//medecin
const envoyerMed =(numBull) =>{
      
 axios.put('http://localhost:8080/ajouterCommentaire/'+numBull+ "/" + comment).then(res => {
  })

  axios.put('http://localhost:8080/envoyer/'+ numBull).then(res => {

  })
    
  color ="success";
  title ="Succés!";
  message="Bulletin envoyer avec succés"
  icon ="nc-icon nc-simple-remove"
  notify("br"); 
}

//responsable
const showAutreAvis=(avis)=>{
  if(avis == "autre"){
    setShowAutre(true)
    }else
    setShowAutre(false)
}

const getAllAvis = () => {
  axios.get('http://localhost:8080/getAllAvis').then( res => {
    console.log(res.data)
       setAllAvis(res.data) 
  })
}

 
const ajouterAvis = (numBull)=>{
  let bullMed = {
      commentaireMed
  }

    if(autreAvis != ""){
    axios.put(`http://localhost:8080/ajouterAvis/`+numBull+ '/'+avis+'/'+autreAvis,bullMed).then(res => {
    })
    color ="success";
    title ="Succés!";
    message="Bulletin envoyer avec succés"
    icon ="nc-icon nc-simple-remove"
    notify("br"); 
  }else{
       axios.put(`http://localhost:8080/ajouterAvis/`+ numBull+ '/'+avis,bullMed).then(res => {

      })
     
      color ="success";
      title ="Succés!";
      message="Avis ajoutee et bulletin envoyer au responsable"
      icon ="nc-icon nc-simple-remove"
      notify("br"); 
    }}  



const notificationAlert = React.createRef();
const notify =(place) => {

  var options = {};
  options = {
    place: place,
    message: (
      <div className="text-left " style={{}}>
        <div>
        <b>{title}</b> <br></br>
        {message}
         </div>
      </div>
    ),
    type:  color,
    icon: icon,
    autoDismiss: 7,
  };
 notificationAlert.current.notificationAlert(options);

}
//add Specialitee
const addSpec =()=> {
  console.log(specialiteMed)
  axios.put('http://localhost:8080/addSpec/'+bull.numBull+'/'+specialiteMed).then(res => {

      setShowSelect(false)
      setSpecialiteMed("")
      getBull();   

  })
      
 }

  
 const getAllMed=()=>{
  axios.get(`http://localhost:8080/getMedecins`)
  .then(res => {
    setMedecins(res.data)
  
      }
      )
    }
        return (
         
       <div className="content">
           <NotificationAlert ref={notificationAlert} />
        {(expediteur==null && bull.etape==2 && user.role=="medecin")?


<Form >

<Row className="justify-content-md-center  " >
<Col md={1}> </Col>
<Col md={8} className="border shadow rounded p-4 " style={{backgroundColor:"white"}}>
<Row style={{borderBottom:"1px solid gray"}}>  
<Col md={7} style={{display:"flex"}} >
  <h6 style={{}}>  Etape &nbsp;</h6><Avatar style={{backgroundColor : "pink",fontSize:13,width:"22px",height:"22px",position:"relative",top:"-2px"}} className="text-uppercase shadow text-dark border border-secondary">   {bull.etape}</Avatar>
</Col>
<Col md={5} className="">
  <small className="text-secondary"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  Envoyer le {moment(notif.date).subtract(1,"hours").format("dddd, Do  MMMM YYYY à L ")} </small>
</Col>
</Row>
<Row className="mt-3">  
<Col md={4}>
<p style={{}}>  <b> Numero bulletin:</b> {bull.numBull}  </p>
</Col>

<Col md={4}>
<p style={{}}> <b> Etat du bulletin:</b> {bull.etat} </p>
</Col>
<Col md={4}>
<p style={{}}>  <b> Envoyer par: </b>&nbsp; {bull.expediteur.nom} &nbsp; {bull.expediteur.prenom}</p>
</Col>
</Row>
<Row> 

<Col md={4}>
</Col>
<Col md={4}>

    </Col>
</Row>

<Row>
<Col md={4}>
 <FormControl className={classes.formControl}>
    <InputLabel htmlFor="age-native-helper">Avis</InputLabel>
    <NativeSelect
    value={avis} onChange={(e)=>setAvis(e.target.value)}  
    onClick={()=> {showAutreAvis(avis)}}
      inputProps={{
        name: 'age',
        id: 'age-native-helper',
      }}
    >                      <option aria-label="None" value="" />

        {AllAvis.map( R => 
                  <option value={R.avis} >{R.avis} </option> )}
                  <option value="autre">Autre</option>

 
    </NativeSelect>
    <FormHelperText>Ajouter votre avis ici</FormHelperText>
  </FormControl>

 </Col>

 { showAutre  ? 
<Col md={4} className="mt-2">

<TextField
style={{    width: '160px'}}
  label="Autre avis"
  id="margin-none"
  defaultValue="Autre avis"
  className={classes.textField}
  helperText="Votre avis sera enregistrer !"
  name="autreAvis" required 
  value={autreAvis} 
  onChange={(e) =>setAutreAvis(e.target.value)}
  width="30px"
/>
 </Col>:false}

 <Col md={4}>
   &nbsp;&nbsp;&nbsp;
 <TextField 
     id="outlined-multiline-static"
     label="Votre commentaire ici"
     multiline
     rows={4}
     value={comment}          
     variant="outlined"
     onChange={(event) => setCommentaireMed(event.target.value) }
   />       
     </Col>
<Col md={4}>



</Col>

</Row>

<Row> 
 <Col md={8}> </Col>
 <Col md={4}>
 &nbsp;     &nbsp;   &nbsp;
  &nbsp;
  &nbsp;
  &nbsp;
  &nbsp;
 
 
 <Button  style={{outline: 'none'}}
         onClick={() => ajouterAvis(bull.numBull)}
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<MdSend/>}
        size="small"
      >
         Envoyer 
 </Button>
 </Col>
</Row>     
</Col>
<Col md={1}>  </Col>
</Row>
</Form>
        
        
        
        
        
        :(expediteur!=null && expediteur.role == "validateur" && bull.etape == 1 )  ? 

         <Row className="justify-content-md-center " >
         <Col md={1}> </Col>
         
         <Col md={8} className="border shadow rounded p-4 "style={{backgroundColor:"white"}}>
         
         <Row style={{borderBottom:"1px solid gray"}}>  
         <Col md={7} style={{display:"flex"}}>
           <h6 style={{}}>  Etape &nbsp;</h6><Avatar style={{backgroundColor : "pink",fontSize:13,width:"22px",height:"22px",position:"relative",top:"-2px"}} className="text-uppercase shadow text-dark border border-secondary">   {bull.etape}</Avatar>
         </Col>
         <Col md={5} className="">
      <small className="text-secondary"> &nbsp; &nbsp;&nbsp;Envoyer le {moment(notif.date).subtract(1,"hours").format("dddd, Do  MMMM YYYY à LT ")} </small>
    </Col>
         </Row>
         <Row className="mt-3">  
         <Col md={4}>
         <p style={{}}>  <b> Numero bulletin:</b> {bull.numBull}  </p>
         </Col>
         <Col md={4}>
         <p style={{}}> <b>specialite medecin: </b>
           {bull.specialiteMed =="Aucune" ? 
             
             
             <span className="alertt" onClick={()=>{setShowSelect(true) }}>{bull.specialiteMed}    </span> 
           :  
             <span> {bull.specialiteMed} </span>
             
             }    </p>

       </Col>
         <Col md={4}>
         <p style={{}}> <b> Etat du bulletin:</b> {bull.etat} </p>
         </Col>
         </Row>
         <Row> 
         <Col md={4}>
         <p style={{}}>  <b> Envoyer par: </b>&nbsp; {expediteur.nom} &nbsp; {expediteur.prenom}</p>
         </Col>
        
         <Col md={4}>
         </Col>
         </Row>
         <Row> 
          <Col md={6}> </Col>
          <Col md={6}>
          &nbsp;     &nbsp;   &nbsp;
           &nbsp;
           &nbsp;
           &nbsp;
          <Button  style={{outline: 'none'}}
                 variant="outlined"
                 color="primary"
                 className={classes.button}
                 startIcon={<DeleteIcon />}
                 size="small"
                 onClick={()=>{setShow(true);  }}
               >
                 Supprimer
               </Button> 
          
          <Button  style={{outline: 'none'}}
                 variant="contained"
                 color="primary"
                 className={classes.button}
                 endIcon={<MdSend/>}
                 size="small"
                 onClick={()=> envoyerBull(bull.numBull,bull.specialiteMed)}
               >
                 Envoyer 
               </Button>
          </Col>
         </Row>     
        </Col>
         <Col md={1}>  </Col>
         </Row>

         :(expediteur!=null && expediteur.role == "validateur" && bull.etape != 1 )||(expediteur!=null && expediteur.role == "medecin" && bull.etape != 3)|| ((expediteur!=null && expediteur.role =="responsable" && bull.etape!=2 && user.role=="medecin")||((( expediteur ==null && bull.etape!=2 && user.role=="medecin"))) ) ?

         <Row className="justify-content-md-center " >
         <Col md={1}> </Col>
         <Col md={8} className="border shadow rounded p-4 "style={{backgroundColor:"white"}}>
         Ce bulletin est deja traité
         </Col>
         <Col md={1}>  </Col>
         </Row> 


     : (expediteur!=null && expediteur.role == "medecin" && bull.etape==3)?


     <Row className="justify-content-md-center " >
     <Col md={1}> </Col>
     <Col md={8} className="border shadow rounded p-4 "style={{backgroundColor:"white"}}>
     <Row style={{borderBottom:"1px solid gray"}}>  
     <Col md={7} style={{display:"flex"}} >
  <h6 style={{}}>  Etape &nbsp;</h6><Avatar style={{backgroundColor : "pink",fontSize:13,width:"22px",height:"22px",position:"relative",top:"-2px"}} className="text-uppercase shadow text-dark border border-secondary">   {bull.etape}</Avatar>
</Col>
<Col md={5} className="">
  <small className="text-secondary"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  Envoyer le {moment(notif.date).format("dddd, Do  MMMM YYYY à LT  ")} </small>
</Col>
     </Row>
     <Row className="mt-3">  
     <Col md={4}>
     <p style={{}}>  <b> Numero bulletin:</b> {bull.numBull}  </p>
     </Col>
     <Col md={4}>
     <p style={{}}> <b>specialite medecin: </b>{bull.specialiteMed}    </p>
     </Col>
     <Col md={4}>
     <p style={{}}> <b> Etat du bulletin:</b> {bull.etat} </p>
     </Col>
     </Row>
     <Row> 
     <Col md={4}>
     <p style={{}}>  <b> Envoyer par: </b>&nbsp; {expediteur.nom} &nbsp; {expediteur.prenom}</p>
     </Col>
     <Col md={4}>
     </Col>
     <Col md={4}>
   
         </Col>
     </Row>

<Row>
     <Col md={4}>
     <TextField
          disabled
          id="outlined-multiline-static"
          label="Commentaire medecin"
          multiline
          rows={4}
          defaultValue={bull.commentaireMed}
          variant="outlined"
        />    
      </Col>

      <Col md={4}>
      <TextField
          id="outlined-multiline-static"
          label="Votre commentaire"
          multiline
          rows={4}
          value={comment}          
          variant="outlined"
          onChange={(event) => setComment(event.target.value) }
        />         </Col>
     <Col md={4}>
     </Col>

     </Row>

     <Row> 
      <Col md={9}> </Col>
      <Col md={3}>
      &nbsp;     &nbsp;   &nbsp;
       &nbsp;
       &nbsp;
       &nbsp;

      
      <Button  style={{outline: 'none'}}
              onClick={() => envoyerMed(bull.numBull)}
             variant="contained"
             color="primary"
             className={classes.button}
             endIcon={<MdSend/>}
             size="small"
           >
             Envoyer 
      </Button>
      </Col>
     </Row>     
    </Col>
     <Col md={1}>  </Col>
     </Row>


    : (expediteur!=null && expediteur.role =="responsable" && bull.etape==2 && user.role=="medecin")?


    <Form >

    <Row className="justify-content-md-center " >
    <Col md={1}> </Col>
    <Col md={8} className="border shadow rounded p-4 "style={{backgroundColor:"white"}}>
    <Row style={{borderBottom:"1px solid gray"}}>  
    <Col md={7} style={{display:"flex"}} >
      <h6 style={{}}>  Etape &nbsp;</h6><Avatar style={{backgroundColor : "pink",fontSize:13,width:"22px",height:"22px",position:"relative",top:"-2px"}} className="text-uppercase shadow text-dark border border-secondary">   {bull.etape}</Avatar>
    </Col>
    <Col md={5} className="">
      <small className="text-secondary"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Envoyer le {moment(notif.date).subtract(1,"hours").format("dddd, Do  MMMM YYYY à LT  ")} </small>
    </Col>
    </Row>
    <Row className="mt-3">  
    <Col md={4}>
    <p style={{}}>  <b> Numero bulletin:</b> {bull.numBull}  </p>
    </Col>
  
    <Col md={4}>
    <p style={{}}> <b> Etat du bulletin:</b> {bull.etat} </p>
    </Col>
    <Col md={4}>
    <p style={{}}>  <b> Envoyer par: </b>&nbsp; {expediteur.nom} &nbsp; {expediteur.prenom}</p>
    </Col>
    </Row>
    <Row> 
   
    <Col md={4}>
    </Col>
    <Col md={4}>
  
        </Col>
    </Row>

<Row>
    <Col md={4}>
     <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-helper">Avis</InputLabel>
        <NativeSelect
        value={avis} onChange={(e)=>setAvis(e.target.value)}  
        onClick={()=> {showAutreAvis(avis)}}
          inputProps={{
            name: 'age',
            id: 'age-native-helper',
          }}
        >                      <option aria-label="None" value="" />

            {AllAvis.map( R => 
                      <option value={R.avis} >{R.avis} </option> )}
                      <option value="autre">Autre</option>

     
        </NativeSelect>
        <FormHelperText>Ajouter votre avis ici</FormHelperText>
      </FormControl>
    
     </Col>

     { showAutre  ? 
   <Col md={4} className="mt-2">

  <TextField
  style={{    width: '160px'}}
      label="Autre avis"
      id="margin-none"
      defaultValue="Autre avis"
      className={classes.textField}
      helperText="Votre avis sera enregistrer !"
      name="autreAvis" required 
      value={autreAvis} 
      onChange={(e) =>setAutreAvis(e.target.value)}
      width="30px"
    />
     </Col>:false}

     <Col md={4}>
       &nbsp;&nbsp;&nbsp;
     <TextField 
         id="outlined-multiline-static"
         label="Votre commentaire ici"
         multiline
         rows={4}
         value={comment}          
         variant="outlined"
         onChange={(event) => setCommentaireMed(event.target.value) }
       />       
         </Col>
    <Col md={4}>



    </Col>

    </Row>

    <Row> 
     <Col md={8}> </Col>
     <Col md={4}>
     &nbsp;     &nbsp;   &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
     
     
     <Button  style={{outline: 'none'}}
             onClick={() => ajouterAvis(bull.numBull)}
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<MdSend/>}
            size="small"
          >
             Envoyer 
     </Button>
     </Col>
    </Row>     
   </Col>
    <Col md={1}>  </Col>
    </Row>
    </Form>

       :(( expediteur!=null && expediteur.role =="responsable" && bull.etape==4 && user.role=="validateur")) ?
       
       
    <Row className="justify-content-md-center " >
    <Col md={1}> </Col>
    <Col md={8} className="border shadow rounded p-4 "style={{backgroundColor:"white"}}>
    <Row style={{borderBottom:"1px solid gray"}}>  
    <Col md={7} style={{display:"flex"}} >
      <h6 style={{}}>  Etape &nbsp;</h6><Avatar style={{backgroundColor : "pink",fontSize:13,width:"22px",height:"22px",position:"relative",top:"-2px"}} className="text-uppercase shadow text-dark border border-secondary">   {bull.etape}</Avatar>
    </Col>
    <Col md={5} className="">
      <small className="text-secondary"> &nbsp; &nbsp;   Envoyer le {moment(notif.date).subtract(1,"hours").format("dddd, Do  MMMM YYYY à LT  ")} </small>
    </Col>
    </Row>
    <Row className="mt-3">  
    <Col md={4}>
    <p style={{}}>  <b> Numero bulletin:</b> {bull.numBull}  </p>
    </Col>
  
    <Col md={4}>
    <p style={{}}> <b> Etat du bulletin:</b> {bull.etat} </p>
    </Col>
    <Col md={4}>
    <p style={{}}>  <b> Envoyer par: </b>&nbsp; {expediteur.nom} &nbsp; {expediteur.prenom}</p>
    </Col>
    </Row>
    <Row> 
   
    <Col md={4}>
    <p style={{}}>  <b> Commentaire medecin</b>&nbsp; {bull.commentaireMed} </p>

    </Col>
    <Col md={4}>
    <p style={{}}>  <b> Commentaire responsable</b>&nbsp; {bull.commentaireResp} </p>

        </Col>
    </Row>

   <Row>
    <Col md={4}>

     </Col>

     { showAutre  ? 
   <Col md={4} className="mt-2">

     </Col>:false}

     <Col md={4}>
       &nbsp;&nbsp;&nbsp;
      
         </Col>
    <Col md={4}>



    </Col>

    </Row>
  
   </Col>
    <Col md={1}>  </Col>
    </Row>
  
       
       :false}
         




    <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>CONFIRMER </Modal.Title>
        </Modal.Header>
        <Modal.Body  >

        <h5>  < FiAlertCircle size={55} color="orange"/>    &nbsp; Est-vous sur de supprimer cet bulletin ?</h5> 
        </Modal.Body>
         <Modal.Footer>
          <Button style={{backgroundColor: "orange"}} className="text-light border border-muted" onClick={handleDelete}>
         <b>  oui, supprimer-le !</b> 
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal
        show={showSelect}
        onHide={() => setShowSelect(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Sélectionner le  spécialité du médecin pour le bulletin N° {bull.numBull} </Modal.Title>
        </Modal.Header>
        <Modal.Body  >

        <Form.Group as={Col} controlId="formGridState">
         <Form.Label> &nbsp;Specialité medecin</Form.Label>
         <Form.Control as="select"  required name="specialiteMed" value={specialiteMed} onChange={e => setSpecialiteMed(e.target.value)} style={{height:45}}>
                    <option>Choisir...</option>

                      {medecins.map( R => 
                      <option value={R.specialite} > {R.specialite}    (Docteur&nbsp;{R.userName}) </option>)}

         </Form.Control>
         </Form.Group> 

        </Modal.Body>
         <Modal.Footer>
          <Button style={{backgroundColor: "orange"}} className="text-light border border-muted" onClick={addSpec}>
         <b> CONFIRMER</b> 
          </Button>
        </Modal.Footer>
      </Modal>

         
     </div>
        )
    
}
