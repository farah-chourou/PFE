

import React from "react";
import { Line,  } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardFooter, CardTitle, Row, Col} from "reactstrap";
import Pie from "./Responsable/Dashbord/Pie.js"
import BarChart from "./Responsable/Dashbord/BarChart.js"
import Step from "./Responsable/Dashbord/Stepper.js"
import UserBehavior from "./Responsable/Dashbord/UserBehavior.js"
import  { useState, useEffect,useRef } from 'react';
import axios from "axios";
import moment from 'moment';

export default function Dashbord()  {

const [bullAjouter,setBullAjouter]=useState([])
const [ bullValider,setBullValider]=useState([])
const [ bullEnAttente,setBullEnAttente]=useState([])

useEffect(() => {
  BullAjouter();
  BullVallider();
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




 
    return (
      <div className=" " style={{padding:"30px" , paddingTop:"100px", backgroundColor:"#f8f8f8"}} >
        <div className="content " >
          <Row > 
            <Col lg="4" md="6" sm="6">
              <Card className="card-stats"style={{borderRadius:"10px",boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-globe text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category" >Nombre Des bulletins ajouter ce jour</p>
                        <CardTitle tag="p">{bullAjouter.length}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Update Now
                  </div>
                </CardFooter>
              </Card>
            </Col>



            <Col lg="4" md="6" sm="6">
              <Card className="card-stats" style={{borderRadius:"10px",boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-money-coins text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Nombre des bulletins validé</p>
                        <CardTitle tag="p">{bullValider.length}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
    
                    <i className="far fa-calendar" /> Last day
                  </div>
                </CardFooter>
              </Card>
            </Col>
        


            <Col lg="4" md="6" sm="6">
              <Card className="card-stats" style={{borderRadius:"10px",boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-favourite-28 text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Nombre des bulletin en attente</p>
                        <CardTitle tag="p">+45K</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Update now
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>

          
          <Row>
            <Col md="4" >
              <Card style={{borderRadius:"10px",boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                <CardHeader>
                  <CardTitle tag="h5">Etats des bulletins Totale </CardTitle>
                  <span className="card-category"></span>

                </CardHeader>
                <CardBody style={{height:"372px"}} className="d-flex align-items-center"> 
                <Pie/> 
                
                 
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-history" /> Updated 3 minutes ago
                  </div>
                </CardFooter>
              </Card>
            </Col>

            <Col md="8">
              <Card  style={{borderRadius:"10px",boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                <CardHeader>
                  <CardTitle tag="h5">Etats des bulletins par semaine 
                     </CardTitle>
                     <span className="card-category"> (pour chaque mois) </span>
                </CardHeader>
                <CardBody style={{height:"352px"}}> 
                <BarChart/>  
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-history" /> Updated 3 minutes ago
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md="4">
         
                <Step/>
                
            </Col>
            <Col md="8">
              <Card className="card-chart"  style={{borderRadius:"10px",boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                <CardHeader>
                  <CardTitle tag="h5"> Utilisateurs du platform </CardTitle>
                  <p className="card-category"> avec perfermonce du travail </p>
                </CardHeader>
                <CardBody>
                 <UserBehavior/>
                </CardBody>
                <CardFooter>
                  <div className="chart-legend">
                    <i className="fa fa-circle text-danger" /> &nbsp;Le plus perfermant de cette semaine {" "}
                  </div>
                  <hr />
                  <div className="card-stats">
                    <i className="fa fa-check" /> Data information certified
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        

        </div>
      </div>
    );
  
}


