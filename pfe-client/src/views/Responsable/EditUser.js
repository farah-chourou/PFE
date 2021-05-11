import React, { Component } from 'react';
import {FaUserEdit} from "react-icons/fa";
import {Tabs, Tab, Button, Modal,Form} from "react-bootstrap";
import {Card,CardHeader,CardBody,CardTitle,Table,Row,Col,} from "reactstrap";
import ModalModifyUser from "../Modal/ModalModifyUser";
import axios from "axios";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

export default class EditUser extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            nom:"",
            prenom:"",
            email:"",
            tel:"",
            adresse:"",
            role:"",
            userName:"",
            specialite:"",
            id:props.id,
            showSpec:false,
            showUpdate:false
             
        }
        this.handleChange=this.handleChange.bind(this);
        this.show =this.show.bind(this);
 
    }

    validateurs = () => {
      this.props.validateurs()
  }
  medecins = () => {
      this.props.medecins()
  }

    componentDidMount(){
        this.getUser();
         }
    
      handleSubmit=(e)=> {
            e.preventDefault();
            this.updateUser();
        }
    
        getUser =() =>{
            axios.get("http://localhost:8080/getUser/"+ this.state.id).then(res => {
              let user= res.data;
              this.setState({  
              nom:user.nom,
              prenom:user.prenom,
              email:user.email,
              tel:user.tel,
              adresse:user.adresse,
              role:user.role,
              userName:user.userName,
              specialite:user.specialite, 
              });
            })
          }
        
          handleChange = (event) => {
            const value =event.target.value;
            this.setState({
            
                [event.target.name]:value
            })
        }
    
        show=(role)=>{
            if(role == "medecin"){
              this.setState({
                showSpec:true,
    
              }) }else this.setState({
                showSpec:false,
    
              })
          }
     
        updateUser = ()=>{
            let user = {
                nom:this.state.nom,
                prenom:this.state.prenom,
                email:this.state.email,
                tel:this.state.tel,
                adresse:this.state.adresse,
                role:this.state.role,
                userName:this.state.userName,
                specialite:this.state.specialite, 
            }
        
              axios.put(`http://localhost:8080/updateUserAdmin/`+ this.state.id,user).then(res => {
        
                this.validateurs();
                this.medecins();
              })
        }

    handleShowUpdate () {
        this.setState({
            showUpdate : true,
            
        });
      }
      
      
      handleCloseUpdate () {
        this.setState({
            showUpdate:false
      
        });
      }
    render() {
        return (
            <div>
        

              <Tooltip title="Modifier">
                     <IconButton aria-label="delete"  style={{outline: 'none'}}>
                     <FaUserEdit style={{color:"#2b2b2b"}}lassName="" onClick={()=>this.handleShowUpdate()} />
                     </IconButton>
                   </Tooltip>
          


                   
      <Modal
        show={this.state.showUpdate}
        onHide={() =>this.handleCloseUpdate()}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifier l utilisateur </Modal.Title>
        </Modal.Header>
        <Form  onSubmit={this.handleSubmit}>

        <Modal.Body  >

            
                   <Row>
                      <Col className="pr-1" md="5">
                        <Form.Group>
                          <label>Company </label>
                          <Form.Control defaultValue="CODWAY"disabled placeholder="Company" type="text" ></Form.Control>
                        </Form.Group>
                      </Col>
                      
                      <Col className="px-1" md="3">
                        <Form.Group>
                          <label>Username</label>
                          <Form.Control placeholder="Enter Username.."type="text" disabled name="userName" required value={this.state.userName} onChange={this.handleChange}/>
                        </Form.Group>
                        <div> {this.state.nameError} </div>

                      </Col>
                      <Col className="pl-1" md="4">
                        <Form.Group>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Form.Control placeholder="Email"type="email"  disabled name="email" required value={this.state.email} onChange={this.handleChange}/>
                        </Form.Group>
                        <div> {this.state.emailError} </div>

                      </Col>
                    </Row>
  
                    <Row>
                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>First Name</label>
                          <Form.Control placeholder="Company"type="text" name="nom" required value={this.state.nom} onChange={this.handleChange}/>
                        </Form.Group>
                      </Col>
                      <Col className="pl-1" md="6">
                        <Form.Group>
                          <label>Last Name</label>
                          <Form.Control  placeholder="Last Name"  type="text" required name="prenom" value={this.state.prenom} onChange={this.handleChange}/>
                        </Form.Group>
                      </Col>
                    </Row>
  
  
                    <Row>
                    <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>Phone Number</label>
                          <Form.Control  placeholder="+216" type="text" name="tel"  required value={this.state.tel} onChange={this.handleChange}/>
                        </Form.Group>
                      </Col>
                      <Col className="pl-1" md="6">
                      <Form.Group as={Col} controlId="formGridState">
                          <Form.Label>Role</Form.Label>
                          <Form.Control as="select" defaultValue="Choose..."name="role" required value={this.state.role} onChange={this.handleChange} onClick={()=> {this.show(this.state.role)}} >
                            <option>Choose...</option>
                            <option value="medecin"> Medecin</option>
                            <option value="validateur"> validateur</option>
                      

                           </Form.Control>
                     </Form.Group>
                      </Col>
                    </Row>

                    {this.state.showSpec ? 
                    <Row>
                    <Col className="pr-1" md="12">
                    <Form.Group>
                    <label>Specialite</label>
                    <Form.Control placeholder="specialite" type="text" name="specialite"  required value={this.state.specialite} onChange={this.handleChange}/>
                    </Form.Group>
                      </Col>
                    </Row>
                    :  false }
                   
  
  
                    <Row>
                      <Col md="12">
                        <Form.Group>
                          <label>Address</label>
                          <Form.Control placeholder="Home Address" type="text" name="adresse"  required value={this.state.adresse} onChange={this.handleChange}/>
                        </Form.Group>
                      </Col>
                    </Row>
                 
      
                    <div className="clearfix"></div>
                
         


    
           



        </Modal.Body>
        <Modal.Footer>
        <Button style={{backgroundColor: "gray"}} className="text-light border border-muted" onClick={() => this.handleCloseUpdate()}>
         <b>  Anuuler</b> 
          </Button>
        <Button className="btn-fill pull-right"type="submit" variant="info"   color="primary" onClick={() => this.handleCloseUpdate()} >  Modifier  </Button>
       
        </Modal.Footer>  </Form>
      </Modal>


            </div>
        )
    }
}
