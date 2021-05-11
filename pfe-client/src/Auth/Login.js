import React from "react";
import axios from "axios";
import { Route , withRouter} from 'react-router-dom';
import moment from 'moment';
import Button from '@material-ui/core/Button';

import  { Form,Col,InputGroup,Group,Container,Row}  from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "components/Navbars/DemoNavbar";
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import logo from "logoo.png";
import backgroundImage from "login.jpg";

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
         error: "Nom ou password n'existe pas !",    

      })}
       
 

  render() {
    return (
      <div style={{paddingBottom:103 , paddingTop:103,backgroundImage: `linear-gradient(rgba(233, 233, 235, 0.993), rgba(238, 235, 235, 0.993))`}} > 
   <Container  > 
     <Row className="justify-content-center " style={{}}>

       <Col md={3} className="shadow border shadow-lg" style={{backgroundImage: `linear-gradient(#252424e8, #252424e8),url(${backgroundImage})`,backgroundSize:"200%", borderTopLeftRadius:10,borderBottomLeftRadius:10}}>
       <Row className="justify-content-center"> 
       <Col md={12} className="  bg-lignt text-light" > 

              <h3 className="text-center  text-uppercase " style={{paddingTop:90}} >  <span style={{borderBottom:"1px solid white"}}>Bienvenue  </span>  </h3> 
       <br></br>
       
       <div className=" text-center px-5 pb-2"> 
       <small >
       "Mutulal by Codway vous shouaite un bon travail "
         </small>
        </div>
       
       
        <h3 className=" text-center" style={{paddingTop:95}}> <img src={logo} alt="MUTUAL-BY-CODWAY-logo"height={63} /> </h3> 
  
         </Col>
         </Row>


       </Col>
       <Col md={5} >
       
       <Row className="justify-content-center "> 
       <Col md={12} className=" border shadow-lg   bg-light " style={{borderTopRightRadius:10,borderBottomRightRadius:10,padding:50,paddingTop:90}}> 
       <h3 className="text-center text-uppercase"> <b>Login </b>  </h3> <br></br>
        <Form onSubmit={this.handleSubmit}>

       {this.state.error==""?
       <>
        <TextField  fullWidth style={{marginBottom:40}}
        size="large"
        id="input-with-icon-textfield"
        label="Nom d'utilisateur"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        name="userName" value={this.state.userName} onChange={this.handleChange}
      />
      <br></br> 
    <TextField 
          fullWidth
          style={{marginBottom:40}}
        size="large"
        id="input-with-icon-textfield"
        label="Mot de passe"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
        name="password" value={this.state.password}  type="password" onChange={this.handleChange}       /></>
        : <> <TextField  fullWidth style={{marginBottom:40}}
        error
        size="large"
        id="input-with-icon-textfield"
        label="Nom d'utilisateur"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        name="userName" value={this.state.userName} onChange={this.handleChange}
      />
      <br></br> 
    <TextField 
    error
          fullWidth
          style={{marginBottom:40}}
        size="large"
        id="input-with-icon-textfield"
        label="Mot de passe"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
        name="password" value={this.state.password}  type="password" onChange={this.handleChange}       /> 
       <b style={{color:"#f44336",position:"relative",top:-20}}>{this.state.error} </b> 
        
        </>}
      
<br></br>
<Row><Col md={3} > </Col> <Col> 
<Button variant="contained" size="medium" color="primary" type="submit"  style={{outline:"none",borderRadius:30,paddingRight:50,paddingLeft:50}}>
          Login
 </Button>

</Col></Row>

  </Form>
  </Col>
  </Row>

       </Col>
     </Row>
    
  </Container>
     </div>
    );
  }
}
export default  withRouter(Login);
