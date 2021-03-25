
import React from "react";
 
import {Link} from "react-router-dom";
import {Card,CardHeader,CardBody,CardTitle,Table,Row,Col,} from "reactstrap";
import axios from "axios";
import AddBulletin from "./AddBulletin";
import {Tabs, Tab, Button} from "react-bootstrap"
import { MdDeleteSweep } from 'react-icons/md';
import {IoIosAddCircle} from 'react-icons/io';
import{MdModeEdit} from 'react-icons/md';
import {FaUserEdit} from 'react-icons/fa';
class Tables extends React.Component {

  constructor(props) {
    super(props);
    const intialState =   this.state = {

    user:[],
    validateurs:[],
    medecins:[],
    number:0,
    

   }
this.deleteUser = this.deleteUser.bind(this);
this.handlePush =this.handlePush.bind(this);

}

componentDidMount(){
  const local = localStorage.getItem("user");
  console.log(JSON.parse(local));
  this.setState({
    user: JSON.parse(local),
  })
 this.getValidateurs();
 this.getMedecins();
  }


getValidateurs =()=>{
  axios.get('http://localhost:8080/getValidateurs').then( res => {
    this.setState({ validateurs: res.data})
    
  })
}


deleteUser = (id) =>{
  axios.delete('http://localhost:8080/deleteUser/'+id).then(res => {
    this.setState({
      validateurs: this.state.validateurs.filter( user => user.id !== id) ,// condtion de filtrage
      medecins: this.state.medecins.filter( user => user.id !== id) ,
    })
})}

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
                     &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; 
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
                               <td>  
                                 <h4 className="text-center"> 
                                 <FaUserEdit className="iconuser" />   &nbsp;
                                 <MdDeleteSweep className="iconuser" onClick={()=> this.deleteUser(v.id)}/>
   

                                 </h4> 
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
                               <td  > 
                                  <h3 className="text-center">
                                    <MdDeleteSweep onClick={()=> this.deleteUser(v.id)}/>
                                    <MdModeEdit/>           
                               
                                  </h3> 
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
