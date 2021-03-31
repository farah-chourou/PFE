
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
    id:""

    
    

   }
this.handlePush =this.handlePush.bind(this);
this.handleDelete =this.handleDelete.bind(this);


}




componentDidMount(){
 
 this.getValidateurs();
 this.getMedecins();

  }


  handleShow (v) {
    this.setState({
        show : true,
        id:v.id
    }) }

handleClose () {
      this.setState({
          show : false,
      });}

handleDelete =()=> {
 

    axios.delete('http://localhost:8080/deleteUser/'+this.state.id).then(res => {
      console.log(res.data);
       
      if(res.data == "Not_OK" ) {
        this.setState({
          color: "danger",
          title:"Erreur !",
          message:"Impossible de supprimer cet utilisateur",
          icon:"nc-icon nc-simple-remove",
          show : false,

        })
        this.notify("br") ;
      
      }else {
        this.setState({
          color: "success",
          title:"Succé",
          message:"utilisateur supprimer avec succé",
          icon:"nc-icon nc-check-2"
        })
        this.notify("br") ;
          this.setState({
            validateurs: this.state.validateurs.filter( user => user.id !== this.state.id) ,// condtion de filtrage
            show : false,

          })  }

      })
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




   
notificationAlert = React.createRef();
notify(place) {


  var options = {};
  options = {
    place: place,
    message: (
      <div className="text-left " style={{}}>
        <div>
        <b>{this.state.title}</b> <br></br>
        {this.state.message}
         </div>
      </div>
    ),
    type: this.state.color,
    icon: this.state.icon,
    autoDismiss: 7,
  };
  this.notificationAlert.current.notificationAlert(options);
}




  render() {
    return (
      <>
               <NotificationAlert ref={this.notificationAlert} />

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
                             
                                <div className="d-inline-block mr-3"> <MdDeleteSweep size={25} onClick={()=> this.handleShow(v)}/>  </div>   
   

                                
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
                             
                                   <div className="d-inline-block mr-3"> <MdDeleteSweep size={25} onClick={()=> this.handleShow(v)}/>  </div>   
   
      
                               
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










        <Modal
        show={this.state.show}
        onHide={() =>this.handleClose()}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>CONFIRMER </Modal.Title>
        </Modal.Header>
        <Modal.Body  >

        <h5>< FiAlertCircle size={55} color="orange"/>    &nbsp; Est-vous sur de supprimer cet utilisateur ?</h5> 
        </Modal.Body>
         <Modal.Footer>
          <Button style={{backgroundColor: "orange"}} className="text-light border border-muted" onClick={() => this.handleDelete()}>
         <b>  oui, supprimer-le !</b> 
          </Button>
        </Modal.Footer>
      </Modal>






      </>
    );
  }
}

export default Tables;
