
import React,{Component} from "react";
import {  withRouter, Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from "reactstrap";
import {Toast,Row,Col} from "react-bootstrap";
import axios from "axios";
import "assets/css/style.css";
import { Redirect } from 'react-router-dom';
import {FaCircle} from "react-icons/fa";
import PerfectScrollbar from 'perfect-scrollbar';
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import Avatar from '@material-ui/core/Avatar';
import  { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import moment from 'moment';
import 'moment/locale/fr';

import{AiFillAlert}from"react-icons/ai";



var ps;
export default function Notifications(props) {
 
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [color, setColor] = useState("transparent")
  const [user,setUser] = useState([]);
  const [notificationsLu,setNotificationsLu] = useState([]);
  const [notificationsNonLu,setNotificationsNonLu] = useState([]);
  const [notificationsNonVu,setNotificationsNonVu] = useState([]);
  const [notifications,setNotifications] = useState([])
  const [expediteurNotif,setExpediteurNotif] = useState([]);
  const [number,setNumber] = useState("");
  const [showHideNotif,setShowHideNotif] = useState(true);
  const history = useHistory()
  const [notifNonlu,setNotifNonlu] = useState()
  const [notif,setNotif]=useState([])


  
 moment.locale('fr');
    
    
   const   dropdownToggle =(e) => {

        notificationsNonLu.map(n => 
          <>
          {axios.put('http://localhost:8080/updateVuNotif/'+ n.id)}
          </>
          )
    setDropdownOpen(!dropdownOpen)
    setNumber(0)
       
        console.log("drop: " + dropdownOpen)
    
    
      }
   

      useEffect(() => {
        const local = localStorage.getItem("user");
        setUser(JSON.parse(local))      
        getNotification() 
 
       }, [])
 
    
      
   
    
   const  getNotification =() =>{
    const local = localStorage.getItem("user");

        axios.get('http://localhost:8080/getNotif').then(res => {
          console.log(res.data);
          res.data.map(e => 
            <div key={e.id}>
            { ( e.recepteur == JSON.parse(local).userName   && e.etat == true  )? 

             notificationsLu.push(e)
            
          
          
            :false  }

            </div>
            )
            res.data.map(e => 
              <div key={e.id}>
              { ( e.recepteur == JSON.parse(local).userName  && e.etat == false )? 
      
             ( notificationsNonLu.push(e),
             setNotifNonlu(notificationsNonLu.length))
            
              :false  }
      
              </div>
              )


              res.data.map(e => 
                <div key={e.id}>
                { ( e.recepteur ==  JSON.parse(local).userName  && e.vu== false)? 
        
                (notificationsNonVu.push(e),
                setNumber(notificationsNonVu.length))
              
              
                :false  }
        
                </div>
                )
                res.data.map(e => 
                  <div key={e.id}>
                  { ( e.recepteur == JSON.parse(local).userName     )? 
      
                 notifications.push(e)
                  
                
                
                  :false  }
      
                  </div>
                  )
            setNotif(notifications)
            })
       
      }
    
    const  getBull = (id) => {
        history.push('/user/soloBulletin/'+id);
        window.location.reload(false);

      }
      


    const lu = () =>{
      notificationsNonLu.map(n => 
        <>
        { axios.put(' http://localhost:8080/updateNotif/' + n.id)}
        </>
        )
        window.location.reload(false);

   
      }
      
    const Nonlu = () =>{
      
     setNotif(notificationsNonLu)

   
      }


          
    const afficherTout = () =>{
      
      setNotif(notifications)
 
    
       }
        return (
    

          <Row  className="justify-content-md-center mb-5" style={{marginTop: 100 }} >
           
            <Col md={6}> {console.log(notifications)}
          
            <span> 
         <div class=" text-uppercase  mb-3" style={{borderBottom: "1px solid #E2E2E2",fontSize:"20px" }}><b> Notifications </b>    </div>
     {notifNonlu > 0 ? <div><div style={{fontSize:14,color:"red"}} className="my-1 ">   Vous avez <b>{notifNonlu} </b> notification non lu encore <br></br> &nbsp; <br></br> </div>  </div> :false } 
        
       </span>
       <Row  style={{fontSize:14, marginBottom: "25px"}} > 
                <Col md={4}> <Link class="text-primary" onClick={Nonlu}> Filtrer par non lu</Link>  </Col>
                <Col md={5}> <Link class="text-primary" onClick={lu}> Marquer tout comme lu</Link>  </Col>
                <Col md={3}><Link class="text-primary" onClick={afficherTout}>Afficher tout</Link>  </Col>

                 </Row>
                {notif.length == 0 ?  <div className="text-center small"> Pas de notification non lu  </div>
                 : 


               notif.slice().reverse().map( R => 

                 <div key={R.id} >
                 {R.expediteurNotif == null ?
                 
                 <Row   className="mb-3 p py-1  " onClick={()=> getBull(R.id)}  style={{border:"1px solid #E2E2E2",borderRadius: "5px" , backgroundColor:"white",boxShadow:"5px 5px 5px gray"}}>  
                 
                 <Col md={1} className=" font-weight-bold text-uppercase">  
                 <AiFillAlert size="25px" className="text-danger"/>

                 </Col>
                 &nbsp;
                  <Col md={10} className=" pb-2 "  >   
                 <Row className="font-weight-bold text-uppercase">
                 { R.etat == false ?
                   <FaCircle className="" size={10} color="rgb(81, 137, 241)"/> 
                   :<FaCircle className=" text-light" size={10} /> }
                  </Row>
                
                  <div>  bulletin numero <b> {R.suivisBullMed.numBull}</b><br></br> est encore en attente de votre avis  </div>  

                 <small className=" text-secondary " style={{paddingLeft:"290px",position:"relative",left:50}}>  envoyer   {moment(R.date).fromNow() } </small>     
                </Col>   
                 </Row>

              : 
                 <Row  width="90px"  className="mb-2 p py-2  " onClick={()=> getBull(R.id)}  style={{border:"1px solid #E2E2E2",borderRadius: "5px" , backgroundColor:"#f5f5f5",boxShadow:"5px 5px 5px gray"}}>  
                 
                 <Col md={1} className=" font-weight-bold text-uppercase">  

                 <Avatar style={{backgroundColor:R.expediteurNotif.couleur,width:31,height:31, fontSize:15}} className="shadow">    { R.expediteurNotif.nom.substr(0, 1)+R.expediteurNotif.prenom.substr(0, 1) }  </Avatar>
                 </Col>
                 &nbsp;
                  <Col md={10} className=" pb-2 "  >   
                 <Row className="font-weight-bold text-uppercase">
                 <Col md={10}> {R.expediteurNotif.nom} {R.expediteurNotif.prenom}</Col>
                 <Col md={2} className="" > 
                  { R.etat == false ?
                   <FaCircle style={{position:"relative",left:80}} className="" size={10} color="rgb(81, 137, 241)"/> 
                   :<FaCircle style={{position:"relative",left:80}} className=" text-light" size={10} /> }
                   
                   </Col>
                  </Row>
                
                  {(R.suivisBull != null && R.expediteurNotif.role == "validateur") ? <div>  Nouveau bulletin  numero  <b> {R.suivisBull.numBull}</b>  a valider recu du validateur </div>  
                : (R.suivisBull == null && R.expediteurNotif.role == "medecin") ? <div>  Nouveau bulletin  numero  <b> {R.suivisBullMed.numBull}</b>  a  revalider recu du medecin </div>  
                : (R.suivisBullMed != null && R.expediteurNotif.role == "responsable" && user.role=="validateur") ? <div> Bulletin  numero  <b> {R.suivisBullMed.numBull}</b>   est valider </div>  
                : (R.suivisBullMed != null && R.expediteurNotif.role == "responsable" && user.role=="medecin") ? <div> Nouveau bulletin  numero  <b> {R.suivisBullMed.numBull}</b> pour  donner ton avis  </div>  

                : false}
                 <small className=" text-secondary " style={{paddingLeft:"290px",position:"relative",left:50}}>  envoyer   {moment(R.date).fromNow() } </small>     
                </Col> 
                 </Row>
           
                
          }
                
                
             

                </div>


          )
          }   
      
      </Col>
          </Row>
     

   
        )
   
}
