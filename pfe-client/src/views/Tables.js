
import React from "react";
import {Link} from "react-router-dom";
import {Card,CardHeader,CardBody,CardTitle,Table,Row,Col,} from "reactstrap";
import axios from "axios";
import AddBulletin from "./AddBulletin";
import {Tabs, Tab, Button, Modal,Form} from "react-bootstrap"
import {IoIosAddCircle} from 'react-icons/io';
import{MdModeEdit} from 'react-icons/md';
import {FaUserEdit} from 'react-icons/fa';
import {FiAlertCircle} from 'react-icons/fi';
import NotificationAlert from "react-notification-alert";
import EditUser from "./Responsable/EditUser";
import DeleteUser from "./Responsable/DeleteUser";
import { MdDeleteSweep } from 'react-icons/md';

class Tables extends React.Component {

  constructor(props) {
    super(props);
    const intialState =   this.state = {

    validateurs:[],
    medecins:[],
    number:0,
    show : false,
    ok:false,
    color:"",
    title:"",
    message:"",
    icon:"",
    showUpdate:"",

    
    

   }
this.handlePush =this.handlePush.bind(this);


}




componentDidMount(){
 
 this.getValidateurs();
 this.getMedecins();

  }




  handleShow () {
    this.setState({
        show : true,
        
    });
}



handleClose () {
    this.setState({
        show : false,
        ok:true

    });
}
getValidateurs =()=>{
  axios.get('http://localhost:8080/getValidateurs').then( res => {
    this.setState({ validateurs: res.data})
    
  })
}






getMedecins =()=>{
  axios.get('http://localhost:8080/getMedecins').then( res => {
    this.setState({ medecins: res.data})
    
  })
}

handlePush =() => {
  this.props.history.push('/user/addUser');

}







  render() {
    return (
      <>

        <div className="content">
          <Row>
  
            <Col md="12">
              <Card >
                <CardHeader className="bg-light">
                  <Row>
                    <Col md={8}>
                    <CardTitle tag="h4">Liste des utilisateurs</CardTitle>
                     <p className="card-category">
                      Here is a subtitle for this table
                     </p> 
                     </Col>

                     <Col md={4}>  
                     &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; 
                    <Button onClick={() => this.handlePush()}> <IoIosAddCircle className="icon" />  Ajouter un utilisateur</Button> 
                     </Col>
                  
                   </Row>
                  


                </CardHeader>
                <CardBody>
                  <Table responsive>
                  <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example" >
                        <Tab eventKey="home" title="Validateurs" >
                        <Table  bordered hover size="sm">
                           <thead>
                             <tr>
                               <th>#</th>
                               <th>Nom d'utilisateur</th>
                               <th>Email</th>
                               <th>Numero télephone</th>
                               <th>Autre</th>

                             </tr>
                           </thead>
                           <tbody >
                           {this.state.validateurs.map(v =>
                       
                             <tr key={v.id}>
                               
                               <td>1</td>
                               <td><Link> {v.userName} </Link> </td>
                               <td>{v.email}</td>
                               <td>{v.tel}</td>
                               <td className="text-center">  
                               
                                <div className="d-inline-block mr-3"><EditUser id={v.id}/> </div> 
                             
                               <div className="d-inline-block">  <DeleteUser id={v.id}/> </div>
   

                                
                               </td>
                             </tr>
                            
                             
                          )} </tbody>
                       </Table>
                       </Tab>

                       <Tab eventKey="profile" title="Medecins">
                       <Table  bordered hover size="sm">
                           <thead>
                             <tr>
                               <th>#</th>
                               <th>Nom d'utilisateur</th>
                               <th>Spécialité medecin</th>
                               <th>Email</th>
                               <th>Phone number</th>
                               <th>Autre</th>

                             </tr>
                           </thead>
                           <tbody >
                           {this.state.medecins.map(v =>
                       
                             <tr key={v.id}>
                               <td>1</td>
                               <td><Link> {v.userName} </Link> </td>
                               <td>{v.specialite}</td>

                               <td>{v.email}</td>
                               <td>{v.tel}</td>
                               <td className="text-center" > 
                                  <div className="d-inline-block mr-3"><EditUser id={v.id}/> </div> 
                                  <div className="d-inline-block">  <DeleteUser id={v.id}/> </div>
                                 
      
                               
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

export default Tables;
