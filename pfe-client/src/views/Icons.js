
import React from "react";

import  { useState, useEffect } from 'react';
import axios from "axios";
import {Card,CardHeader,CardBody,CardFooter,CardTitle,FormGroup,Form,Input,Row,Col,} from "reactstrap";
import moment from 'moment';
import 'moment/locale/fr';
import PhoneIcon from '@material-ui/icons/Phone';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  input: {
    height: 30,
    width:190,
    color : '#3d5afe',


  },
  
}));

export default function Icons() {
  const [user,setUser] =useState([]);
  const[edit,setEdit]=useState(false)
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [editNom,setEditNom]=useState(false)
  const [editPrenom,setEditPrenom]=useState(false)
  const [editAdresse,setEditAdresse]=useState(false)
  const [editTel,setEditTel]=useState(false)
  const [EditPassword,setEditPassword]=useState(false)
  const local = localStorage.getItem("user");
  
  const [Nom, setNom] = useState()
  const [Prenom, setPrenom] = useState()
  const [Tel, setTel] = useState()
  const [Adresse, setAdresse] = useState()
  const [Password,setPassword] = useState()
  const [PassActuel,setPassActuel] = useState()
  const[verifier,setVerifier]=useState()
  const [Email, setEmail] = useState()

  const [ConfirmPass, setConfirmPass] = useState("")
  const [NewPass, setNewPass] = useState("")

  useEffect(() => {
    const local = localStorage.getItem("user");
    setUser(JSON.parse(local)) 
    getUser();
  }, [])

  const getUser =()=>{
    axios.get("http://localhost:8080/getUser/"+ JSON.parse(local).id).then(res => {
      setNom(res.data.nom)
      setPrenom(res.data.prenom)
      setAdresse(res.data.adresse)
      setTel(res.data.tel)
      setEmail(res.data.email)
      setPassword(res.data.password)
    })
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const enregistrer =()=>{
    let newUser ={
      nom:Nom,
      prenom:Prenom,
    //  email:email,
      tel:Tel,
      adresse:Adresse,
   //   role:this.state.role,
  //      specialite:this.state.specialite, 
     }
     const local = localStorage.getItem("user");

    axios.put(`http://localhost:8080/updateProfileUser/`+ JSON.parse(local).userName,newUser).then(res => {
   
    })
  }
const check =()=>{
if(PassActuel== Password){
  setVerifier(true)
}
}
    return (
      <>
        <div className="content">
          <Row>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                  <img
                    alt="..."
                    src={require("assets/img/fond.png")}
                  />
                </div>
                <CardBody>
                  <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={require("assets/img/profile2.png")}
                      />
                      <h5 className="title ">{Nom}&nbsp;{Prenom}</h5>
                    </a>
                    <p className="description">{user.email}</p>
                  </div>
                  <p className="description text-center">
                    <b>Membre depuis</b> <br></br>
                    {moment(user.membreDepuis).format("dddd, Do  MMMM YYYY  ")}
                    
                  </p>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="button-container">
                    <Row>
                      <Col >
                        <h5>
                    <small>    <PhoneIcon fontSize="small"style={{position:"relative",top:-2}}/>  Telephone: <span className="text-secondary"> {Tel} </span> </small>
                        </h5>
                      </Col>
                     
                    </Row>
                  </div>
                </CardFooter>
              </Card>
             </Col>
            <Col md="8">
              <Card className="card-user">
              <AppBar position="static"style={{  zIndex: 0}}>
                 <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                   <Tab label="Informations générales" {...a11yProps(0)} style={{outline:"none"}}/>
                   <Tab label="paramétres du compte" {...a11yProps(1)} style={{outline:"none"}} />
                 </Tabs>
               </AppBar>
               <TabPanel value={value} index={0}>
               
                  <Form onSubmit={enregistrer}>
                    
                      <Col className="pr-1" className="mb-2">
                       <Row className="border-bottom pb-2"> 
                         <Col md={5}className="text-dark pt-2">  <b>Nom du compagnie: </b></Col>
                          <Col md={5} className="text-secondary pt-2">         CODWAY          </Col>
                          <Col md={2}>  
                          </Col>
                         </Row>
                       </Col>

                       <Col className="pr-1 mb-1" >
                       <Row className="border-bottom "> 
                          <Col md={5}className="text-dark pt-2">  <b>Nom d'utilisateur: </b></Col>
                          <Col md={5} className="text-secondary pt-2">         {user.userName}         </Col>
                          <Col md={2}>  
                          <IconButton aria-label="delete" disabled  style={{outline: 'none',position:"relative",top:-3}}> <EditIcon  />        </IconButton> 
                          </Col>
                       </Row>
                       </Col>
                       <Col className="pr-1 mb-1" >
                       <Row className="border-bottom "> 
                          <Col md={5}className="text-dark pt-2">  <b>Nom  </b></Col>
                          <Col md={5} className="text-secondary pt-2">             {editNom==false ?  Nom : 
                              <TextField
                              label="Modifier votre nom"
                              id="outlined-size-small"
                              value={Nom}
                              variant="outlined"
                              size="small"
                              InputProps={{
                                className: classes.input}}
                                onChange={(event)=>setNom(event.target.value)}

                            />
                          }     </Col>
                          <Col md={2}>  
                          <IconButton aria-label="delete" onClick={()=>setEditNom(!editNom)}  style={{outline: 'none',position:"relative",top:-3}}> <EditIcon color="secondary" />        </IconButton> 
                          </Col>
                       </Row>
                       </Col>
                       <Col className="pr-1 mb-1" >
                       <Row className="border-bottom "> 
                          <Col md={5}className="text-dark pt-2">  <b>Prénom: </b></Col>
                          <Col md={5} className="text-secondary pt-2">        
                           {editPrenom==false ?  Prenom :
                            <TextField
                            label="Modifier votre prénom"
                            id="outlined-size-small"
                            value={Prenom}
                            variant="outlined"
                            size="small"
                            InputProps={{
                              className: classes.input}}
                              onChange={(event)=>setPrenom(event.target.value)}
                          />
                           
                           }      
                            </Col>
                          <Col md={2}>  
                          <IconButton aria-label="delete" onClick={()=>setEditPrenom(!editPrenom)}  style={{outline: 'none',position:"relative",top:-3}}> <EditIcon color="secondary" />        </IconButton> 
                          </Col>
                       </Row>
                       </Col>
                       <Col className="pr-1 mb-1" >
                       <Row className="border-bottom "> 
                          <Col md={5}className="text-dark pt-2">  <b>Adresse</b></Col>
                          <Col md={5} className="text-secondary pt-2">   
                           {editAdresse==false ?  Adresse
                            : <TextField
                            label="Modifier votre adresse"
                            id="outlined-size-small"
                            defaultValue={Adresse}
                            variant="outlined"
                            size="small"
                            InputProps={{
                              className: classes.input}}
                              onChange={(event)=>setAdresse(event.target.value)}

                          />  }     

                           </Col>
                          <Col md={2}>  
                          <IconButton aria-label="delete"onClick={()=>setEditAdresse(!editAdresse)}   style={{outline: 'none',position:"relative",top:-3}}> <EditIcon color="secondary" />        </IconButton> 
                          </Col>
                       </Row>{console.log(Adresse)}
                       </Col>
                       <Col className="pr-1 mb-1" >
                       <Row className="border-bottom "> 
                          <Col md={5}className="text-dark pt-2">  <b>N° téléphone </b></Col>

                          <Col md={5} className="text-secondary pt-2">    
                              {editTel==false ?  Tel
                              :<TextField
                              label="Modifier votre adresse"
                              id="outlined-size-small"
                              defaultValue={Tel}
                              variant="outlined"
                              size="small"
                              InputProps={{
                                className: classes.input}}
                                onChange={(event)=>setTel(event.target.value)}

                            />   }   
                          </Col>
                          <Col md={2}>  
                          <IconButton aria-label="delete" onClick={()=>setEditTel(!editTel)}  style={{outline: 'none',position:"relative",top:-3}}> <EditIcon color="secondary" />        </IconButton> 
                          </Col>
                       </Row>
                       </Col>
                       <Col className="pr-1 mt-3" >
                       <Row className=" "> 
                       <Col> 
                       <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        style={{outline:"none"}}
                        type="submit"
                      >
                        Enregistrer
                      </Button>
                      </Col> 
                       </Row>
                       </Col>
                  
                  </Form>
                  </TabPanel>


                  
               <TabPanel value={value} index={1}>
                 
               <Form>
                    
                    
                     <Col className="pr-1 mb-1" >
                     <Row className=" "> 
                        <Col md={5}className="text-dark pt-2">  <b>Modifier mot de passe</b></Col>
                        <Col md={5} className="text-secondary pt-2">           </Col>
                        <Col md={2}>  
                        <IconButton aria-label="delete" onClick={()=>setEditPassword(!EditPassword)}  style={{outline: 'none',position:"relative",top:-3}}> <EditIcon color="secondary" />        </IconButton> 
                        </Col>
                        <Col> 
                        <Row>
                           <Col md={6} className="d-flex flex-column">  
                           <div class="p-3">  Entrer votre mot de passe actuel </div>
                           {verifier == true ?
                           <>
                           <div className="p-3">    Nouveau mot de passe</div>
                           <div className="p-3">Confirmer mot de passe</div>
                           </>
                          :
                          <> <div className="p-3 text-secondary ">    Nouveau mot de passe</div>
                          <div className="p-3 text-secondary">Confirmer mot de passe</div>
                          </>
                          }
                         </Col>

                           <Col md={6}> 
                           <div class="p-3"> 
                          <TextField
                              label="Modifier votre adresse"
                              id="outlined-size-small"
                              value={PassActuel}
                              variant="outlined"
                              size="small"
                              InputProps={{
                                className: classes.input}}
                                onChange={(event)=>{setPassActuel(event.target.value);check()}}
                                type="password"
                            /> 
                        
                           </div>
                           {PassActuel == Password ?
                          <>
                           <div class="p-3"> 
                           <TextField
                              label="Modifier votre adresse"
                              id="outlined-size-small"
                              defaultValue={NewPass}
                              variant="outlined"
                              size="small"
                              InputProps={{
                                className: classes.input}}
                                onChange={(event)=>setNewPass(event.target.value)}
                                type="password"

                            /> 
                           </div>

                           <div class="p-3"> 
                           <TextField
                              label="Modifier votre adresse"
                              id="outlined-size-small"
                              defaultValue={ConfirmPass}
                              variant="outlined"
                              size="small"
                              InputProps={{
                                className: classes.input}}
                                onChange={(event)=>setConfirmPass(event.target.value)}
                                type="password"

                            /> 
                           </div></>
                           :
                           <>
                           <div class="p-3"> 
                           <TextField disabled
                              label="Modifier votre adresse"
                              id="outlined-size-small"
                              defaultValue={Tel}
                              variant="outlined"
                              size="small"
                              InputProps={{
                                className: classes.input}}
                                onChange={(event)=>setTel(event.target.value)}
                                type="password"

                            /> 
                           </div>

                           <div class="p-3"> 
                           <TextField disabled
                              label="Modifier votre adresse"
                              id="outlined-size-small"
                              defaultValue={Tel}
                              variant="outlined"
                              size="small"
                              InputProps={{
                                className: classes.input}}
                                onChange={(event)=>setTel(event.target.value)}
                                type="password"

                            /> 
                           </div></>}
                            </Col>

                       
                        
                 
                        </Row>

                          </Col>
                        </Row>
                            

                         
                        </Col>
                     
                     
                     <Col className="pr-1 mt-3" >
                     <Row className=" "> 
                     <Col> 
                     <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.button}
                      startIcon={<SaveIcon />}
                      style={{outline:"none"}}
                    >
                      Enregistrer
                    </Button>
                    </Col> 
                     </Row>
                     </Col>
                
                </Form>
               </TabPanel>
              
               
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }


