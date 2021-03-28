
import React from "react";
import { Card, CardHeader, CardBody, Row, Col ,Table} from "reactstrap";
import {Tabs, Tab, Button,InputGroup,FormControl,Form} from "react-bootstrap";
import NotificationAlert from "react-notification-alert";

import {Link} from "react-router-dom";
import { MdDeleteSweep } from 'react-icons/md';
import {MdSend} from 'react-icons/md';
import axios from "axios"

class AllBull extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
   
      user:[],
      bulletinsResp:[],
      bulletinsMed:[],

      numberBull:"",
      number: 0
    };

    this.deleteBull=this.deleteBull.bind(this);
  }


  componentDidMount() {
    const local = localStorage.getItem("user");
    this.setState({
      user: JSON.parse(local),
    })
    this.getAllBullResp();
    this.getAllBullMed();
  }




  getAllBullResp =() =>{
    axios.get('http://localhost:8080/getAllBull').then(res => {
      console.log(res.data);
      res.data.map(k => 
        <div >
         {(k.recepteur.userName == this.state.user.userName && k.etape == 1) ?  
        ( this.state.bulletinsResp.push(k),
        this.setState({
          numberBull:this.state.bulletinsResp.length
        })
        )  
        : false}
        </div>
    )})
  }

   getAllBullMed =() =>{
     axios.get('http://localhost:8080/getAllBullMed').then(res => {
   console.log(res.data);
      res.data.map(k => 
        <div >
         {(k.recepteur == this.state.user.userName) ?  
        ( this.state.bulletinsMed.push(k),
        this.setState({
          numberBull:this.state.bulletinsMed.length
        })
        )  
        : false}
        </div>
    )

     })
   }


  deleteBull = (numBull) =>{
    axios.delete('http://localhost:8080/deleteBull/'+numBull).then(res => {
      this.setState({
        bulletinsResp: this.state.bulletinsResp.filter( bulletins => bulletins.numBull !== numBull) ,// condtion de filtrage
      })
  })}
  
  envoyerBull = (numBull,specialiteMed) => {
    axios.post('http://localhost:8080/addBullMed/'+ numBull + "/" + specialiteMed + "/"+ this.state.user.userName).then(res => {
      console.log(res.data);
      this.setState({
        bulletinsResp: this.state.bulletinsResp.filter( bulletins => bulletins.numBull !== numBull) ,// condtion de filtrage
      })
      this.notify('br')

    })

    axios.put('http://localhost:8080/updateEtapeBull/'+ numBull ).then(res => {
      console.log(res.data);
    })
  }


  notificationAlert = React.createRef();
  notify(place) {
 
 
    var options = {};
    options = {
      place: place,
      message: (
        <div className="text-left " style={{}}>
          <div>
          <b>Succée</b> <br></br>
          Bulletin envoyé avec succé
           </div>
        </div>
      ),
      type: "success",
      icon: "nc-icon nc-check-2",
      autoDismiss: 7,
    };
    this.notificationAlert.current.notificationAlert(options);
  }


  render() {
    return (
      <>
    <NotificationAlert ref={this.notificationAlert} />

         {console.log(this.state.bulletinsMed)     }      

        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                
                  <h5 className="title">Listes des bulletins a envoyer</h5>
                  <p className="category">
                    Created using Montserrat Font Family
                  </p>
                </CardHeader>
                <CardBody>
                <Table responsive>
                  <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example" >
                    {this.state.user.role == "medecin" ? 
                    <Tab eventKey="home" title="Toutes la liste" >
                    <Table  bordered hover size="sm">
                       <thead>
                         <tr>
                           <th>Numero bulletin</th>
                           <th>Date</th>
                           <th>envoyer par</th>
                           <th>autre</th>
                         </tr>
                       </thead>
                       <tbody >
                       {this.state.bulletinsMed.map(b =>
                               <tr key={b.numBull}>   
                           <td>{b.numBull} </td>
                           <td>{b.date}</td>
                        
                           <td>{b.expediteur.userName}</td>
                           <td>  
                             <h4 className="text-center"> 
                          
                             <MdDeleteSweep  onClick={()=> this.deleteBull(b.numBull)}/> &nbsp;
                               <MdSend  size={20} className="envoyerIcon" onClick={()=> this.envoyerBull(b.numBull,b.specialiteMed)}/>    
                             </h4> 
                           </td>
                         </tr>
                        
                         
                      )} </tbody>
                   </Table>
                   </Tab>
                :
                 
                        <Tab eventKey="home" title="Toutes la liste" >
                        <Table  bordered hover size="sm">
                           <thead>
                             <tr>
                               <th>#</th>
                               <th>Numero bulletin</th>
                               <th>Date</th>
                               <th> specialité medecin</th>
                               <th>envoyer par</th>
                               <th>etat</th>
                               <th>autre</th>
                             </tr>
                           </thead>
                           <tbody >
                           {this.state.bulletinsResp.map(b =>
                             <tr key={b.numBull}>   
                               <td className="px-3 bg-muted"> <input   type="checkbox"/> </td>
                               <td>{b.numBull} </td>
                               <td>{b.date}</td>
                               <td>{b.specialiteMed}</td>
                               <td>{b.expediteur.userName}</td>
                               <td>  <div className="etat shadow"> {b.etat} </div> </td>
                               <td>  {console.log(b.numBull)}
                                 <h4 className="text-center"> 
                              
                                 <MdDeleteSweep  onClick={()=> this.deleteBull(b.numBull)}/> &nbsp;
                                   <MdSend  size={20} className="envoyerIcon" onClick={()=> this.envoyerBull(b.numBull,b.specialiteMed)}/>    
                                 </h4> 
                               </td>
                             </tr>
                            
                             
                          )} </tbody>
                       </Table>
                       </Tab> }
                    
                    

                       <Tab eventKey="profile" title="bulletin" >
                        <Table  bordered hover size="sm">
                           <thead>
                             <tr>
                               <th>Numero bulletin</th>
                               <th>Date</th>
                               <th> specialité medecin</th>
                               <th>envoyer par</th>
                               <th>etat</th>
                               <th>autre</th>
                             </tr>
                           </thead>
                           <tbody >
                           {this.state.bulletinsResp.map(b =>
                             <tr key={b.numBull}>    
                               <td>{b.numBull} </td>
                               <td>{b.date}</td>
                               <td>{b.specialite}</td>
                               <td>{b.expediteur.userName}</td>
                               <td>{b.etat}</td>
                               <td>  
                                 <h4 className="text-center"> 
                                 <MdDeleteSweep className="iconuser" onClick={()=> this.deleteBull(b.numBull,b.specialite)}/>


                                 </h4> 
                               </td>
                             </tr>
                            
                             
                          )} </tbody>
                       </Table>
                       </Tab>

                    </Tabs>
                 </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default AllBull;
