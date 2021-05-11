
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
import backgroundImage from "img5.jpg";
import moment from 'moment';
import 'moment/locale/fr';
import { IoLogoBitbucket } from "react-icons/io";
import{AiFillAlert}from"react-icons/ai";


var ps;
export default function Notification(props) {
 
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [color, setColor] = useState("transparent")
  const [user,setUser] = useState([]);
  const [notifications,setNotifications] = useState([]);
  const [notificationsNonLu,setNotificationsNonLu] = useState([]);
  const [notificationsNonVu,setNotificationsNonVu] = useState([]);
  const [expediteurNotif,setExpediteurNotif] = useState([]);
  const [number,setNumber] = useState("");
  const [showHideNotif,setShowHideNotif] = useState(true);
  const history = useHistory()
 const [notifNonlu,setNotifNonlu] = useState()

 moment.locale('fr');



     const  toggle = () =>  {
        if (isOpen) {
          setColor("transparent") 
       
        } else {
          setColor("dark") 

        }
        setIsOpen(!isOpen)
     
        console.log("isOpen: " +isOpen)
    
      }
    
    
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
            { ( e.recepteur == JSON.parse(local).userName  )? 
             notifications.push(e)
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

            })

      }
    
    const  getBull = (id) => {
        history.push('/user/soloBulletin/'+id);
        window.location.reload(false);

      }
      

    const  pushToNotif = ()=>{
       history.push('/user/notifications');

      }
    const lu = () =>{
      notificationsNonLu.map(n => 
        <>
        { axios.put(' http://localhost:8080/updateNotif/' + n.id)}
        </>
        )
        window.location.reload(false);

   
      }

        return (
    
     <Dropdown nav isOpen={dropdownOpen} toggle={(e) => dropdownToggle(e)}   >
          <DropdownToggle caret nav >
            <i className="nc-icon nc-bell-55" />
            <p>
              <span className="d-lg-none d-md-block">Some Actions</span>
            </p>
          </DropdownToggle>
          {(number > 0)  ?     
           <small className="number text-light" > {number}  </small>  
        : false
        } 
         
          <DropdownMenu right    >
            
            <div style={{ backgroundImage: `url(${backgroundImage})`,backgroundColor:'blue',opacity:"0.8",backgroundRepeat:"no-repeat",paddingTop:14,borderTopLeftRadius:5,borderTopRightRadius:5,paddingBottom:"10px",position:"relative",top:"-8px" }}> 
         <span class=" text-uppercase text-white py-2 mb-3" style={{borderBottom: "1px solid #E2E2E2",paddingRight:"154px",opacity:"none"}}><b>  &nbsp;&nbsp; Notifications </b>    </span>
     {notifNonlu > 0 ? <div><div style={{fontSize:14, paddingLeft: 8,color:"rgb(81, 137, 241)",paddingTop:'10px',color:"white"}} className="my-1 "> &nbsp;  Vous avez <b>{notifNonlu} </b> notification non lu encore <br></br> &nbsp; <Link class="text-white" onClick={lu}> Marquer tout comme lu</Link><br></br> </div>  </div> :false } 
        
       </div>
                {notifications.length == 0 ?  <div className="text-center small"> No notification avaible  </div>
                 : 

                (<div className="scrollbar" id="style-7"> 
                               {notifications.slice().reverse().slice(0,6).map( R => 
                
                                 <div key={R.id} >
                {R.expediteurNotif!=null ?





           

                 <DropdownItem className="mb-2 px-2 py-1  " onClick={()=> getBull(R.id)}  style={{width:280}} > 
                 <Row  width="100px" >  
                 <Col md={1} className=" font-weight-bold text-uppercase" style={{ }}>  
                 <Avatar style={{backgroundColor:R.expediteurNotif.couleur,width:26,height:26, fontSize:13}} className="shadow">    { R.expediteurNotif.nom.substr(0, 1)+R.expediteurNotif.prenom.substr(0, 1) }  </Avatar>
                 </Col>
                 &nbsp;
                  <Col md={10} className="pb-2  "  style={{borderBottom: "1px solid #E2E2E2"}}>   
                 <Row className="font-weight-bold text-uppercase">
                 <Col md={10}> {R.expediteurNotif.nom} {R.expediteurNotif.prenom}</Col>
                 <Col md={2} className="" > 
                  { R.etat == false ?
                   <FaCircle className="" size={10} color="rgb(81, 137, 241)"/> 
                   :<FaCircle className=" text-light" size={10} /> }
                   
                   </Col>
                  </Row>
                
                  {(R.suivisBull != null && R.expediteurNotif.role == "validateur") ? <div>  Nouveau bulletin  numero  <b> {R.suivisBull.numBull}</b>  a   <br></br> valider recu du validateur </div>  
                : (R.suivisBull == null && R.expediteurNotif.role == "medecin") ? <div>  Nouveau bulletin  numero  <b> {R.suivisBullMed.numBull}</b>  a   <br></br> revalider recu du medecin </div>  
                : (R.suivisBullMed != null && R.expediteurNotif.role == "responsable" && user.role=="validateur") ? <div> Bulletin  numero  <b> {R.suivisBullMed.numBull}</b>   est valider </div>  
                : (R.suivisBullMed != null && R.expediteurNotif.role == "responsable" && user.role=="medecin") ? <div> Nouveau bulletin  numero  <b> {R.suivisBullMed.numBull}</b><br></br> pour  donner ton avis  </div>  

                : false}

                { (R.etat == false && moment(R.date).fromNow() == "il y a quelques secondes" ) ?   <small  style={{paddingLeft:"50px",color:"rgb(81, 137, 241)"}}>  Envoyer   {moment(R.date).fromNow() } </small>   

                
               :R.etat == false ?  <small  style={{paddingLeft:"96px",color:"rgb(81, 137, 241)"}}>  envoyer   {moment(R.date).fromNow() } </small>     : 
                 <small className=" text-secondary " style={{paddingLeft:"96px"}}>  Envoyer   {moment(R.date).fromNow() } </small>     }
                </Col>   
                 </Row>
                </DropdownItem>
                

                
                :
                <DropdownItem className="mb-2 px-2 py-1  " onClick={()=> getBull(R.id)}  style={{width:280}} > 
                <Row  width="100px" >  
                <Col md={1} className=" font-weight-bold text-uppercase" style={{ }}>  
                
                <AiFillAlert size="25px" className="text-danger"/>
                </Col>
                &nbsp;
                 <Col md={10} className="pb-2  "  style={{borderBottom: "1px solid #E2E2E2"}}>   
                <Row className="font-weight-bold text-uppercase">
                <Col md={10} className="text-danger"> Rappel</Col>
                <Col md={2} className="" > 
                 { R.etat == false ?
                  <FaCircle className="" size={10} color="rgb(81, 137, 241)"/> 
                  :<FaCircle className=" text-light" size={10} /> }
                  
                  </Col>
                 </Row>
            
               <div>  bulletin numero <b> {R.suivisBullMed.numBull}</b><br></br> est encore en attente de votre avis  </div>  

            

               { (R.etat == false && moment(R.date).fromNow() == "il y a quelques secondes" ) ?   <small  style={{paddingLeft:"50px",color:"rgb(81, 137, 241)"}}>  Envoyer   {moment(R.date).fromNow() } </small>   

               
              :R.etat == false ?  <small  style={{paddingLeft:"96px",color:"rgb(81, 137, 241)"}}>  envoyer   {moment(R.date).fromNow() } </small>     : 
                <small className=" text-secondary " style={{paddingLeft:"96px"}}>  Envoyer   {moment(R.date).fromNow() } </small>     }
               </Col>   
                </Row>
                 </DropdownItem> }

                </div>


          )}</div>)
          }   
             {notifications.length > 3 ?   
         <div  style={{backgroundColor:"#f1efef",paddingBottom:5,position:"relative",bottom:-8,borderBottomLeftRadius:5,borderBottomRightRadius:5}}>   &nbsp; &nbsp; <Link  onClick={()=> pushToNotif()}  style={{color:"#1565c0"}}class=" pl-4 pt-5">Afficher tout</Link></div>    
         : false}

          </DropdownMenu>
     
      </Dropdown>
   
        )
   
}
