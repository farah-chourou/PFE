import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import  { useState, useEffect,useRef } from 'react';
import {Table,Popover,Overlay} from "react-bootstrap"
import axios from "axios";
import moment from 'moment';
import UsersList from 'views/Medecin/BullMed';
import 'moment/locale/fr';
import { Link } from "react-router-dom";
import {Doughnut} from 'react-chartjs-2';
import Avatar from '@material-ui/core/Avatar';
import CountUp from 'react-countup';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  paper: {
    padding: theme.spacing(1),
  },


}));




export default function UserBehavior() {
  const classes = useStyles();
  const [user,setUser] = useState([])
  const [UsersList,setUsersList] = useState([])
  const [numberUsers,setNumberUsers]=useState()


  moment.locale('fr');

  //popover
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [userName,setUserName] = useState()
  const [bullValide,setBullValide]=useState([])
  const [bullNonValide,setBullNonValide]=useState([])
  const[bullValide2,setBullValide2]= useState([])
  const [role,setRole] = useState([])
  const ref = useRef(null);
  const [bullValidateur,setBullValidateur]=useState([])
  const [perfermantMed,setPerfermantMed] =useState([])
  const [perfermantValid,setPerfermantValid] =useState()
const[num,setNum]=useState()
  const [userBullValide,setUserBullValide]=useState([])
  const [userBullNonValide,setUserBullNonValide]=useState([])
  const[userBullValide2,setUserBullValide2]= useState([])
  const[perfermantBullMed,setPerfermantBullMed]=useState(0)

  const medecin = {
    labels: [
      'En attente',
      'Terminer',
      
    ],
    datasets: [{
     
      data: [bullNonValide.length,bullValide.length+bullValide2.length],
      backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ],
      hoverBackgroundColor: [ 
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ]
    }]
  };
  const validateur = {
    labels: [
      'nombre de bulletin envoyer',
      'Terminer',
      
    ],
    datasets: [{
     
      data: [bullNonValide.length,bullValide.length+bullValide2.length],
      backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ],
      hoverBackgroundColor: [ 
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ]
    }]
  };
  const handleClick = (event,user,role) => {
    setUserName(user);
     getInfo(user,role);
     getInfoValid(user);
    console.log(bullValide)
     setTarget(event.target);
     setShow(!show);

  };


  useEffect(() => {
    const local = localStorage.getItem("user");
    setUser(JSON.parse(local)) 
    getAllUsers();
  //  setBullValide(bullValide)
  //  getPerfermantMed();
  }, [])




 const getPerfermantMed=()=>{
  setPerfermantBullMed(userBullValide.length);
          axios.get('http://localhost:8080/getAllUsers').then( res => {
            res.data.map(e => 
              <div key={e.id}>
              {e.role == "medecin" ? 
      
     /*   axios.get('http://localhost:8080/getAllBullMedEtape2/' + e.userName).then( res => {
          setBullNonValide([])
          res.data.map(e => 
            <div key={e.numBull}>
            {moment(e.date).isBetween(  moment().startOf('week'), moment().endOf('week')) == true? 
                (    setBullNonValide(prevState => [...prevState, e]))
        
            :false}</div>
          )
        })
        ,*/
        axios.get('http://localhost:8080/getBullMedEtape4/' + e.userName).then( result => {
         result.data.map(e => 
            <div key={e.numBull}>  
           { moment(e.date).isBetween( moment().startOf('week'), moment().endOf('week')) == true? 
                (    setUserBullValide(prevState => [...prevState, e],setNum(userBullValide.length))
                )
               :false}</div>
        )
        }
        )
      
        /* 
          ,
          
          axios.get('http://localhost:8080/getBullMedEtape3/' + e.userName).then( result => {
          
          result.data.map(e => 
            <div key={e.numBull}>  
            { moment(e.date).isBetween( moment().startOf('week'), moment().endOf('week')) == true? 
                 (    setUserBullValide2(prevState => [...prevState, e]))
                :false}</div>
          )})
       (  userBullValide.length+userBullValide2.length > perfermantBullMed ?    
          ( setPerfermantBullMed(userBullValide.length+userBullValide2.length),  setPerfermantMed(e.userName))

          :false )
          ,*/
          
          
      
          
          

    : false}

      </div>
    )} 
    )

  }

  const getAllUsers = () =>{
    const local = localStorage.getItem("user");
  
    axios.get('http://localhost:8080/getAllUsers').then( res => {
      res.data.map(e => 
        <div key={e.id}>
        {e.role != "responsable" ? 
      ( UsersList.push(e), setNumberUsers(UsersList.length) ): false}
        </div>
      )}) 
    }



      const getInfo = (u,role) =>{

        const local = localStorage.getItem("user");
        setRole(role)
        axios.get('http://localhost:8080/getAllBullMedEtape2/' + u).then( res => {
          setBullNonValide([])
          res.data.map(e => 
            <div key={e.numBull}>
            {moment(e.date).isBetween(  moment().startOf('week'), moment().endOf('week')) == true? 
                (    setBullNonValide(prevState => [...prevState, e]))

            :false}</div>
          )
      })

      axios.get('http://localhost:8080/getBullMedEtape4/' + u).then( result => {
         setBullValide([]);
         result.data.map(e => 
            <div key={e.numBull}>  
           { moment(e.date).isBetween( moment().startOf('week'), moment().endOf('week')) == true? 
                (    setBullValide(prevState => [...prevState, e]))
               :false}</div>
  )
})
     

      axios.get('http://localhost:8080/getBullMedEtape3/' + u).then( result => {
        setBullValide2([]);

        result.data.map(e => 
          <div key={e.numBull}>  
          { moment(e.date).isBetween( moment().startOf('week'), moment().endOf('week')) == true? 
               (    setBullValide2(prevState => [...prevState, e]))
              :false}</div>
        )
  
    })

    }
//validateur

const getInfoValid = (u) =>{
  setBullValidateur([]);

  const local = localStorage.getItem("user");
  axios.get('http://localhost:8080/getAllBullEtape1' ).then( res => {
    res.data.map(e => 
      <div key={e.numBull}>
      {(moment(e.date).isBetween( moment().startOf('week'), moment().endOf('week')) == true && e.expediteur.userName ==u) ? 
          (    setBullValidateur(prevState => [...prevState, e]))

      :false}</div>
      ) }) 
    
    
      axios.get('http://localhost:8080/getAllBullEtape2' ).then( res => {
    res.data.map(e => 
      <div key={e.numBull}>
      {(moment(e.date).isBetween( moment().startOf('week'), moment().endOf('week')) == true && e.expediteur.userName ==u) ? 
          (    setBullValidateur(prevState => [...prevState, e]))

      :false}</div>
      ) }) 
    
    
    
    }




  return (
    <div className="table-wrapper-scroll-y my-custom-scrollbar "  ref={ref}style={{zIndex: 5,}}>
{console.log(perfermantMed)}
<Table  hover className="bg-white  ">
  <thead>
    <tr style={{color:"#185fad"}}> 
      <th scope="col">#</th>
     
        <th >Nom d'utilisateur</th>
        <th >Role</th>

        <th >Status</th>
        <th >Performance</th>

    </tr>
  </thead>
  <tbody>

 { UsersList.map (( u,index) => 
    <tr> 
      <td>  <Avatar style={{backgroundColor : u.couleur,fontSize:13,width:"27px",height:"27px"}} className="text-uppercase shadow">    { u.nom.substr(0, 1) +u.prenom.substr(0, 1) }</Avatar></td>
   
        <td>{u.userName}</td>

        <td>{u.role} </td>

        {u.connecte == true ?
        <td > <span className="bg-success border text-light p-1 px-2 shadow  rounded "> En ligne </span></td> :
        (u.lastconnect == null && u.connecte == null) ? 
        <td>Hors ligne </td> :
        (u.lastconnect == "" && u.connecte == false) ? 
        <td>Hors ligne </td> :
        <td>Hors ligne  <small>(il y'a {moment(u.lastConnect).fromNow()}) </small>  </td>
        }
        <td> 
         <Button size="small" variant="outlined"  color="primary" style={{outline:"none"}} onClick={(event) =>{   ; handleClick(event,u.userName,u.role)}}>
          Cliquer ici 
        </Button>
        </td>
     
    </tr>)}

  </tbody>
</Table>





{role == "medecin" ?
<Overlay
        show={show}
        target={target}
        placement="bottom"
        containerPadding={50}
      >
        <Popover id="popover-contained">
          <Popover.Title as="h3">Perfermonce du travail dans cette semmaine</Popover.Title>
          <Popover.Content>
           
            <Doughnut data={medecin} />
      <p className="pl-4">    {bullNonValide.length!=0 ?
        <small> Les bulletins encore en attente</small>

          :false
          }
      {bullNonValide.map(b =>
      <span key={b.numBull}>

   <small>  <li className="text-secondary">  {b.numBull} </li> </small>     
        
         </span>
        )}</p>
          </Popover.Content>
        </Popover>
      </Overlay> :
      
      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref.current}

        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Title as="h3">Perfermonce du travail dans cette semmaine</Popover.Title>
          <Popover.Content>
           nombre de  bulletin ajouter  &nbsp;
        <b>  <CountUp end={bullValidateur.length} /></b> 
          </Popover.Content>
        </Popover>
      </Overlay>
      
      }
    </div>
  );
}