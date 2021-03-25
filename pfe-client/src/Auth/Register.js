import React from "react";

import axios from "axios";
import  {Button ,Form,Col,InputGroup}  from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route , withRouter} from 'react-router-dom';

 export class Register extends React.Component {
  constructor(props) {
    super(props);
    const intialState =   this.state = {

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
      passwordError:''

   }

   this.handleChange=this.handleChange.bind(this);
   this.handleSubmit=this.handleSubmit.bind(this);
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
}

  axios.post(`http://localhost:8080/register/` +this.state.confirmPassword,user).then(result  => {  
      
    console.log(result);      
    console.log(result.data.message);

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

     localStorage.setItem("user", JSON.stringify(result.data));

     if(this.state.role == "medecin"){ 
     this.props.history.push('/homeMedecin');}
     if(this.state.role == "responsable"){ 
        this.props.history.push('/homeResponsable');}
     if(this.state.role == "validateur"){ 
       this.props.history.push('/homeValidateur');}   

      }
})  
}

handleChange = (event) => {
  const value =event.target.value;
  this.setState({
     
      [event.target.name]:value
  })
}


errorName(){
     this.setState({     
         nameError: "user Exist",
      })}
  

errorNameAndEmail(){
     this.setState({     
         nameError: "user Exist",        emailError: "email Already Exist"

      })}
       
 
errorEmail(){
  this.setState({     
      emailError: "email Already Exist"
   })
}

errorPassword(){
  this.setState({     
      passwordError: "pasword mich kifkif"
   })
}


  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
      <div className="header mt-4">Register</div>
      <div className="content">
      <Form className="m-4" onSubmit={this.handleSubmit}>

  <Form.Row >
    <Form.Group as={Col} >
      <Form.Label>Name</Form.Label>
      <Form.Control className="bg-white" type="text" required placeholder="Enter name" name="nom" value={this.state.nom} onChange={this.handleChange}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>LastName</Form.Label>
      <Form.Control type="text" placeholder="Enter lastName" required name="prenom" value={this.state.prenom} onChange={this.handleChange}/>
    </Form.Group>
  </Form.Row>
  <div> {this.state.nameError} </div>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Username</Form.Label>
    <Form.Control type="text" placeholder="Enter username"name="userName" required value={this.state.userName} onChange={this.handleChange} />
  </Form.Group>
  <div> {this.state.emailError} </div>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter email" name="email" required value={this.state.email} onChange={this.handleChange}/>
    </Form.Group>


  </Form.Row>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control type="text" placeholder="Enter adress"name="adresse"  required value={this.state.adresse} onChange={this.handleChange} />
  </Form.Group>


  <Form.Row >
  <Form.Group controlId="formGridAddress2">
    <Form.Label>Phone Number</Form.Label>
    <Form.Control type="number" placeholder="Enter your number..." name="tel"  required value={this.state.tel} onChange={this.handleChange}/>
  </Form.Group>

  
  <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Role</Form.Label>
      <Form.Control as="select" defaultValue="Choose..." name="role" required value={this.state.role} onChange={this.handleChange}>
        <option>Choose...</option>
        <option value="medecin"> Medecin</option>
   <option value="validateur"> validateur</option>
   <option value="responsable"> responsable</option>

      </Form.Control>
    </Form.Group>

  </Form.Row>
  
 

  <div> {this.state.passwordError} </div>
  <Form.Row >
    <Form.Group as={Col} >
      <Form.Label>Password</Form.Label>
      <Form.Control placeholder="Enter name" type="password"  required name="password" value={this.state.password}  onChange={this.handleChange} />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>confirmPassword
      </Form.Label>
      <Form.Control placeholder="Password" type="password"  required name="confirmPassword" value={this.state.confirmPassword}  onChange={this.handleChange}/>
    </Form.Group>
  </Form.Row>



  <Button variant="primary" type="submit">  Register</Button>

</Form></div>
        
        </div>
    );
  }
}

export default withRouter(Register);
