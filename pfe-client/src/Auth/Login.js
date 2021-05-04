import React from "react";
import axios from "axios";
import { Route , withRouter} from 'react-router-dom';
import moment from 'moment';

import  {Button ,Form,Col,InputGroup,Group,Container,Row}  from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "components/Navbars/DemoNavbar";

 class Login extends React.Component {
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
      userName:'',
      error:'',
      isLogin:false

   }

   this.handleChange=this.handleChange.bind(this);
   this.handleSubmit=this.handleSubmit.bind(this);
}




handleSubmit=(e)=> {
  e.preventDefault();
 

 this.login();
  
    }

    getAllBullMed =() =>{
  /*    axios.get('http://localhost:8080/getAllBullMedEtape2/'+ this.state.userName).then(res => {
         res.data.map(e => 
            <div key={e.numBull}>  
           { moment(e.date).isBetween(  moment().subtract(1, 'days'), moment()) == false? 
      
      
            axios.post('http://localhost:8080/rappelMed/'+ this.state.userName+"/"+e.numBull).then(res => {
            
            })
      
               :false}</div>
      )
      
        })*/
      }

  login =()=>{

      let user = {

          password:this.state.password,
          userName:this.state.userName,
  
      }
    

      axios.post(`http://localhost:8080/login`,user).then(result  => {  

  
       console.log(result.data)
  if(result.data.message == "User not exist !"){
      this.error();

  
  }else {
    this.getAllBullMed();

     localStorage.setItem("user", JSON.stringify(result.data));
     if(result.data.role == "medecin"){ 
      this.props.history.push('/user');}
      if(result.data.role== "responsable"){ 
         this.props.history.push('/user/dashboard');}
      if(result.data.role == "validateur"){ 
        this.props.history.push('/user');}   
     
        axios.put('http://localhost:8080/connecte/'+this.state.userName)

     this.setState({
      isLogin:true
  }
)  } }  )
  }

  

handleChange = (event) => {
  const value =event.target.value;
  this.setState({
     
      [event.target.name]:value
  })
}






error(){
     this.setState({     
         error: "nom ou password inexistant",    

      })}
       
 

  render() {
    return (

   <Container > 
     <Row className="justify-content-center mt-5"> 
       <Col md={4} className="mt-5 border p-3 shadow-lg p-3  bg-lignt rounded"> 
       <h1 className="text-center">  Login </h1> <br></br>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formGridAddress1">
    <Form.Label>Username</Form.Label>
    <Form.Control placeholder="Enter usrename"  name="userName" value={this.state.userName} onChange={this.handleChange} />
  </Form.Group>
  <Form.Group controlId="formGridAddress1">
    <Form.Label>password</Form.Label>
    <Form.Control placeholder="Enter password" name="password" value={this.state.password}  type="password" onChange={this.handleChange} />
  </Form.Group> <div> {this.state.error} </div>

  <Button variant="primary" type="submit">  LogIn</Button>
  
  
  </Form>
  </Col>
  </Row>
  </Container>
        
     
    );
  }
}
export default  withRouter(Login);
