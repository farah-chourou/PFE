import React, { Component } from 'react';
import {FaUserEdit} from "react-icons/fa";
import {Tabs, Tab, Modal,Form} from "react-bootstrap";
import {Card,CardHeader,CardBody,CardTitle,Table,Row,Col,} from "reactstrap";
import {IoIosAddCircle} from 'react-icons/io';
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
export default class EditUser extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            nom:'',
            prenom:'',
            email:'',
            tel:'',
            adresse:'',
            role:'',
            password:'',
            confirmPassword:'',
            userName:'',
            nameError:'',
            emailError:'',
            passwordError:'',
            showSpec:false,
            specialite:'',
            sex:''
             
        }
        this.handleChange=this.handleChange.bind(this);
        this.show =this.show.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);

 
    }

    validateurs = () => {
        this.props.validateurs()
    }
    medecins = () => {
        this.props.medecins()
    }
      handleSubmit=(e)=> {
            e.preventDefault();
            this.AddUser();
        }
    
      
        

        AddUser=()=>{
            let user = {
              nom: this.state.nom,
              prenom:this.state.prenom,
              email: this.state.email,
              tel: this.state.tel,
              adresse:this.state.adresse,
              password:this.state.password,
              userName:this.state.userName,
              role:this.state.role,
              specialite:this.state.specialite,
              sex:this.state.sex
          }

          
            axios.post(`http://localhost:8080/register/` +this.state.confirmPassword,user).then(result  => {  
                
              console.log(result);      
          
              if(this.state.password != this.state.confirmPassword){
                this.errorPassword();
              }
          
             if(result.data.message == "Email and Username is already taken!"){
          
               this.errorNameAndEmail();
             }else
              if (result.data.message ==  "Email is already taken!"){
                this.errorEmail();
              }else
              if(result.data.message == "Username is already taken!"){
                this.errorName();
              }else
              if(result.data.message =="Password not confirm"){
                this.errorPassword();
              }else { 
              this.setState({showUpdate :false})
               this.notify("br") ;
               this.handleReset();
               this.validateurs();
               this.medecins();
               axios.post(`http://localhost:8080/mailSend` ,user).then(result  => {  
              })

                }
          })  
          }
          
          handleReset = () => {
            this.setState({
              nom:'',
              prenom:'',
              email:'',
              tel:'',
              adresse:'',
              role:'',
              password:'',
              confirmPassword:'',
              userName:'',
              specialite:'',
              sex:''
          
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



      errorName(){
        this.setState({     
            nameError: "Ce nom d'utilisateur est déjà utilisé !",
         })}
     
   
   errorNameAndEmail(){
        this.setState({     
            nameError: "Ce nom d'utilisateur est déjà utilisé !",  
            emailError: "Cet email est déja utilisé ! "
   
         })}
          
    
   errorEmail(){
     this.setState({     
         emailError: "Cet email est déja utilisé !"
      })
   }
   
   errorPassword(){
     this.setState({     
         passwordError: "Les mots de passe ne sont pas identiques ! "
      })
   }
    


   notificationAlert = React.createRef();
   notify(place) {
     var color = Math.floor(Math.random() * 5 + 1);
     var type;
     switch (color) {
       case 1:
         type = "primary";
         break;
       case 2:
         type = "success";
         break;
      
     }
     var options = {};
     options = {
       place: place,
       message: (
         <div>
           <div>
           <b>Succé</b> <br></br>
           Utilisateur ajouter avec succé
           </div>
         </div>
       ),
       type: type,
       icon: "nc-icon nc-check-2",
       autoDismiss: 7,
     };
     this.notificationAlert.current.notificationAlert(options);
   }

    render() {
        return (
            <div>          
  <NotificationAlert ref={this.notificationAlert} />
  <Button
      style={{outline:"none"}}
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutlineIcon  fontSize="large"/>}
        onClick={()=>this.handleShowUpdate()}
      >

        AJOUTER
      </Button>
   

      



                   
      <Modal
        show={this.state.showUpdate}
        onHide={() =>this.handleCloseUpdate()}
        backdrop="static"
        keyboard={false} 
      >
        <Modal.Header closeButton>
          <Modal.Title> <GroupAddIcon fontSize="large"/> Nouveau utilisateur </Modal.Title>
        </Modal.Header>
        <Form  onSubmit={this.handleSubmit}>

        <Modal.Body  >

                    
                      <Row>
                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>Nom d'utilisateur</label>
                          <Form.Control placeholder="Entrer nom d'utilisateur.."type="text" name="userName" required value={this.state.userName} onChange={this.handleChange}
                                  isInvalid={ !!this.state.nameError}
                                  />
                                                <Form.Control.Feedback type='invalid'>
                                                 {this.state.nameError}
                                                </Form.Control.Feedback>
                                              </Form.Group>
          

                      </Col>
                      <Col className="pl-1" md="6">
                        <Form.Group>
                          <label htmlFor="exampleInputEmail1">
                            Adresse email
                          </label>
                          <Form.Control placeholder="Email"type="email" name="email" required value={this.state.email} onChange={this.handleChange}
                           isInvalid={ !!this.state.emailError}  />
                          <Form.Control.Feedback type='invalid'>
                                                 {this.state.emailError}
                              </Form.Control.Feedback>
                       
                        </Form.Group>

                      </Col>
                    </Row>
  
                    <Row>
                      <Col className="pr-1" md="4">
                        <Form.Group>
                          <label>Nom</label>
                          <Form.Control placeholder="Votre nom"type="text" name="nom" required value={this.state.nom} onChange={this.handleChange}/>
                        </Form.Group>
                      </Col>
                      <Col className="px-1" md="4">
                        <Form.Group>
                          <label>Prénom</label>
                          <Form.Control  placeholder="votre prénom"  type="text" required name="prenom" value={this.state.prenom} onChange={this.handleChange}/>
                        </Form.Group>
                      </Col>

                      <Col className="pl-1" md="4">
                      <Form.Group controlId="formGridState">
                          <Form.Label>Sexe</Form.Label>
                          <Form.Control as="select" defaultValue="Choisir..."name="sex" required value={this.state.sex} onChange={this.handleChange}  >
                            <option value="homme"> Homme</option>
                            <option value="femme"> Femme</option>
                    
                           </Form.Control>
                     </Form.Group>
                      </Col>
                    </Row>
  
  
                    <Row>
                    <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>N° télephone</label>
                          <Form.Control  placeholder="+216" type="text" name="tel"  required value={this.state.tel} onChange={this.handleChange}/>
                        </Form.Group>
                      </Col>
                      <Col className="pl-1" md="6">
                      <Form.Group controlId="formGridState">
                          <Form.Label>Role</Form.Label>
                          <Form.Control as="select" defaultValue="Choose..."name="role" required value={this.state.role} onChange={this.handleChange} onClick={()=> {this.show(this.state.role)}} >
                          <option > Choisir</option>

                            <option value="medecin"> Medecin</option>
                            <option value="validateur"> Validateur</option>
                      

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
                          <label>Addresse</label>
                          <Form.Control placeholder="Votre adresse" type="text" name="adresse"  required value={this.state.adresse} onChange={this.handleChange}/>
                        </Form.Group>
                      </Col>
                    </Row>
                 
                    <Row>

                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>Mot de passe</label>
                          <Form.Control placeholder="Entrer mot de passe"type="password" minLength={5} required name="password" value={this.state.password}  onChange={this.handleChange}/>
                        </Form.Group>
                      </Col>

                      <Col className="pl-1" md="6">
                        <Form.Group>
                          <label>Confirmer mot de passe</label>
                          <Form.Control placeholder="Confirmer le mot de passe.." type="password" required name="confirmPassword" value={this.state.confirmPassword}  onChange={this.handleChange}
                          isInvalid={ !!this.state.passwordError}  />
                          <Form.Control.Feedback type='invalid'>
                                                 {this.state.passwordError}
                              </Form.Control.Feedback>
                       
                        </Form.Group>
                      </Col>
                    </Row>
      
                    <div className="clearfix"></div>
                
         


    
           



        </Modal.Body>
        <Modal.Footer>
        <Button style={{backgroundColor: "gray"}} className="text-light border border-muted" onClick={() => this.handleCloseUpdate()}>
         <b>  Anuler</b> 
          </Button>
          &nbsp;
          <Button
      style={{outline:"none"}}
        variant="contained"
        color="primary"
        type="submit"
      >

        AJOUTER
      </Button>
       
        </Modal.Footer>  </Form>
      </Modal>


            </div>
        )
    }
}
