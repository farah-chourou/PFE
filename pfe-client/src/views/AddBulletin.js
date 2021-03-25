
import React from "react";
import { Badge,Button,Card,Form,Navbar,Nav,Container, Row,Col,} from "react-bootstrap";
import axios from "axios";

class AddBulletin extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
         user :[],
         responsables:[],
         numBull:'',
         specialiteMed:'',
         recepteur:'',
         avis:'',
         error:''
    }

    this.handleSubmit =this.handleSubmit.bind(this);
    this.handleChange =this.handleChange.bind(this);

}
componentDidMount(){
this.GetAllResponsable();
const local = localStorage.getItem("user");
console.log(JSON.parse(local));
this.setState({
  user: JSON.parse(local),
})

}



handleSubmit = (event) => {
event.preventDefault();
this.AddBull();

}

AddBull = () => {
   let suivisBulletein ={
    specialiteMed:this.state.specialiteMed,
    numBull: this.state.numBull}
   
    console.log(suivisBulletein)

axios.post('http://localhost:8080/addBull/' +this.state.user.id + '/'+ this.state.recepteur , suivisBulletein).then(res  => { 
console.log(res);
console.log(res.data) ;
if(res.data.message =="Bull already exist !"){
    this.error();
}})
}


GetAllResponsable=()=>{
axios.get(`http://localhost:8080/getResponsables`)
.then(res => {
this.setState({     
    responsables: res.data 
})
})}

handleChange = (event) => {
const value =event.target.value;
this.setState({  [event.target.name]:value})
}


error(){
this.setState({     
    error: "Bull Exist !"   

 })
}

  render() {
    return (
        <>
        <Container fluid className="content">
          <Row className="justify-content-md-center mt-5">
            <Col  md={{ span: 8, offset: 2 }}>
              
              <Card>
              
                <Card.Header>
                  <Card.Title as="h4">Add Bulletin</Card.Title>
                </Card.Header>
  
                <Card.Body>
                <Form className="m-4" onSubmit={this.handleSubmit}>

                <Form.Row >
                  <Form.Group as={Col} >
                    <Form.Label>Num Bulletin</Form.Label>
                    <Form.Control className="bg-white" type="number" required placeholder="Enter numero of bulletin" name="numBull" value={this.state.numBull} onChange={this.handleChange}/>
                  </Form.Group>

                </Form.Row>
                <div>{this.state.error} </div>
                <Form.Row >
                <Form.Group as={Col}>
                  <Form.Label>specialty of doctor</Form.Label>
                  <Form.Control type="text" placeholder="Enter username"name="specialiteMed" value={this.state.specialiteMed} onChange={this.handleChange} />
                </Form.Group>
                </Form.Row>

                
                
                <Form.Row >
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Sent to:</Form.Label>
                    <Form.Control as="select" name="recepteur" required value={this.state.recepteur} onChange={this.handleChange}>
                    <option>Choose...</option>

                      {this.state.responsables.map( R => 
                      <option value={R.userName} > responsable  ({R.userName}) </option> )}
                
                    </Form.Control>
                  </Form.Group> 
                </Form.Row>
                
                
                <Button variant="primary" type="submit">  Register</Button>
                
                </Form>
                </Card.Body>
              </Card>
            </Col>
            
          
            
                <hr></hr>
            
          
          </Row>
        </Container>
      </>
    );
  }
}

export default AddBulletin;
