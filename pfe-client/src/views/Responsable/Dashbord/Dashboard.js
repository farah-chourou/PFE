

import React from "react";
import { Line,  } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardFooter, CardTitle, Row, Col} from "reactstrap";
import { Image} from "react-bootstrap";

import Pie from "./Pie.js"
import BarChart from "./BarChart.js"
import Step from "./Stepper.js"
import UserBehavior from "./UserBehavior.js"
import  { useState, useEffect,useRef } from 'react';
import axios from "axios";
import moment from 'moment';
import CountUp from 'react-countup';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import {HiUserGroup} from 'react-icons/hi'

import PausePresentationIcon from '@material-ui/icons/PausePresentation';
import 'moment/locale/fr';

import backgroundImage from "perfermant1.png";

export default function Dashbord()  {

const [bullAjouter,setBullAjouter]=useState([])
const [ bullValider,setBullValider]=useState([])
const [ bullEnAttente,setBullEnAttente]=useState([])
const [UserConnect,setUserConnect]=useState([])
const [perfermantMed,setPerfermantMed]=useState([])
const [perfermantValid, setPerfermantValid] = useState([])
useEffect(() => {
  BullAjouter();
  BullVallider();
  BullEnAttente();
  userConnect();
  getPerfermantMed();
}, [])
  const BullAjouter = () =>{
  
    axios.get('http://localhost:8080/getAllBull').then( res => {

      res.data.map(e => 
        <div key={e.numBull}>
      {moment(e.date).isBetween(  moment().subtract(1, 'days'), moment()) == true?    (    setBullAjouter(prevState => [...prevState, e]))
      :false
      }</div>
      )
  }
  
  )
  
   }

   const BullVallider = () =>{
  
    axios.get('http://localhost:8080/getBullValiderEtape4').then( res => {
      console.log(res.data)

      res.data.map(e => 
        <div key={e.numBull}>
      {moment(e.date).format('L') == moment().format('L')? 
         (    setBullValider(prevState => [...prevState, e]))
      :false
      }</div>
      )
  }
  
  )
  
   }

// en attente

const BullEnAttente = () =>{
  const local = localStorage.getItem("user");

  axios.get('http://localhost:8080/getAllBullEtape1').then( res => {

    res.data.map(e => 
      <div key={e.numBull}>
    {(e.recepteur.userName ==JSON.parse(local).userName &&moment(e.date).isBetween(  moment().subtract(1, 'days'), moment()) == true) ? 
       (    setBullEnAttente(prevState => [...prevState, e]))
    :false
    }</div>
    )})
  
    axios.get('http://localhost:8080/getAllBullDashbord/' +JSON.parse(local).userName ).then( res => {

      res.data.map(e => 
        <div key={e.numBull}>
      {(e.etape != 4 &&moment(e.date).isBetween(  moment().subtract(1, 'days'), moment()) == true) ? 
         (    setBullEnAttente(prevState => [...prevState, e]))
      :false
      }</div>
      )})
  
  }

  const userConnect =()=>{
    axios.get('http://localhost:8080/getAllUsersConected' ).then( res => {
     setUserConnect(res.data)
     })
  }
  const getPerfermantMed =()=>{
    axios.get('http://localhost:8080/getPerfermantMed').then( res => {
      setPerfermantMed(res.data)
   })

   axios.get('http://localhost:8080/getPerfermantValid').then( res => {
    setPerfermantValid(res.data)
 })
  }

 
    return (
      <div className=" " style={{padding:"30px" , paddingTop:"85px", backgroundColor:"#f8f8f8"}} >
        <div className="content " >
          <Row > 
            <Col lg="3" md="6" sm="6">
              <Card className="card-stat"style={{borderLeft:"10px solid #FCA820",borderRadius:"10px",boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                <CardBody style={{}}>
                 
                  <Row>
                    
                    <Col md="3" xs="5" >
                      <DoneIcon style={{fontSize:36,color:"#FCA820"}}/>
                    </Col>
                    <Col md="9" xs="7">
                        <p className="card-category " style={{fontSize:15}}>Bulletins ajouter  </p>
                        <CardTitle tag="p" >     <CountUp end={bullAjouter.length} />    </CardTitle>
              
                      </Col>
                  </Row>
                </CardBody>
                
              </Card>
            </Col>



            <Col lg="3" md="6" sm="6">
              <Card className="card-stats" style={{borderRadius:"10px",borderLeft:"10px solid #185fad",boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                <CardBody>
                  <Row>
                    <Col md="3" xs="5">
                   <DoneAllIcon style={{fontSize:35,color:"#185fad"}}/>
                    </Col>
                    <Col md="9" xs="7">
                        <p className="card-category ">Bulletins terminer</p>
                        <CardTitle tag="p" ><CountUp end={bullValider.length} /></CardTitle>
                        <p />
                    </Col>
                  </Row>
                </CardBody>
         
              </Card>
            </Col>
        

            <Col lg="3" md="6" sm="6">
              <Card className="card-stats" style={{borderLeft:"10px solid #d64161",borderRadius:"10px",boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                <CardBody>
                  <Row>
                    <Col md="2" xs="5">
                   <PausePresentationIcon style={{color:"#d64161"}}/>
                    </Col>
                    <Col md="10" xs="7">
                        <p className="card-category">Bulletins en attente</p>
                        <CardTitle tag="p"><CountUp end={bullEnAttente.length}/> </CardTitle>
                        <p />
                    </Col>
                  </Row>
                </CardBody>
         
              </Card>
            </Col>

            <Col lg="3" md="6" sm="6">
              <Card className="card-stats" style={{borderLeft:"10px solid #95caf8",borderRadius:"10px",boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                <CardBody >
                  <Row>
                    <Col md="2" xs="5">
                   <HiUserGroup size={25} style={{color:"#95caf8"}}/>
                    </Col>
                    <Col md="10" xs="7">
                        <p className="card-category" style={{fontSize:14}}>Utilisateurs disponibles</p>
                       <CountUp end={UserConnect.length}/> 
                        <p />
                    </Col>
                  </Row>
                </CardBody>
         
              </Card>
            </Col>

          </Row>

          
          <Row>
       
          <Col md="3">
               <Step/>
            </Col>
            <Col md="9">
              <Card  style={{borderRadius:"10px",boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px",height:400}}>
              <Row>
              <Col md={8}>
                <CardHeader>
                  <CardTitle tag="h5">Etats des bulletins 
                     </CardTitle>
                     <span className="card-category"> par semaine pour le mois {moment().format(" MMMM  ")}   </span>
                </CardHeader>
                <CardBody style={{height:"352px"}}> 
               
                 <br></br>             

                  <BarChart/>  
                  </CardBody>

                  </Col>

                  <Col md={4}>
                  <CardHeader>
                  <CardTitle tag="h5">
                     </CardTitle><br></br><br></br>
                     <span className="card-category"> totale pour le mois {moment().format(" MMMM  ")}  </span>
                </CardHeader>
                <CardBody style={{height:"352px"}}className="pt-5"> 
               
                 <br></br>                 


                <Pie/>   
                  </CardBody>

                 </Col>
                </Row>
               
               

           
              </Card>
            </Col>

            



          </Row>

          <Row>
            <Col md="3" className="d-flex flex-column">
         
            <Card  className="card-chart"  style={{height:187,backgroundSize:"97%",backgroundColor:"#0d3d70a6",backgroundImage: `url(${backgroundImage})`,borderRadius:"10px",boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                <CardHeader className="text-center text-light">
                  {perfermantMed.sex == "homme"? 
             <Image  className="border border-light "   src={require("assets/img/profile4.png")}roundedCircle width={50} />
             : <Image  className="border border-light "   src={require("assets/img/profile1.png")}roundedCircle width={50} />
    }
               <br></br> <b > Dr {perfermantMed.nom}       {perfermantMed.prenom} </b> 
               <br></br> <small> Spécialité : {perfermantMed.specialite}</small>
                 <br></br>
                <small className="py-2"> Le Medecin Le Plus Perfermant Pour <b>Cette Semaine </b> </small> 
                </CardHeader>
            
               
              </Card>        
              <Card  className="card-chart"  style={{height:187,backgroundSize:"97%",backgroundColor:"#8f898ab0",backgroundImage: `url(${backgroundImage})`,borderRadius:"10px",boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                <CardHeader className="text-center text-light">
                  {perfermantValid.sex=="homme"?
                <Image  className="border border-light "   src={require("assets/img/profile3.png")}roundedCircle width={50} />
                :    <Image  className="border border-light "   src={require("assets/img/profile2.png")}roundedCircle width={50} />
  }
               <br></br> <b > {perfermantValid.nom}       {perfermantValid.prenom} </b> 
               <br></br> 
                 <br></br>
                <small className="py-2"> Le Validateur Le Plus Perfermant Pour <b>Cette Semaine </b> </small> 
                </CardHeader>
            
               
              </Card>       
                
            </Col>
            <Col md="9">
              <Card className="card-chart"  style={{borderRadius:"10px",boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                <CardHeader>
                  <CardTitle tag="h5"> Utilisateurs de la  platform </CardTitle>
                  <p className="card-category"> avec perfermonce du travail </p>
                </CardHeader>
                <CardBody>
                 <UserBehavior/>
                </CardBody>
                <CardFooter>
              
                  
                </CardFooter>
              </Card>
            </Col>
          </Row>
        

        </div>
      </div>
    );
  
}


