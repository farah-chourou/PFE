import React, { Component } from 'react'
import { Card, CardHeader, CardBody, Row, Col ,Table} from "reactstrap";
import {Tabs, Tab, Button,InputGroup,FormControl,Form,Modal} from "react-bootstrap";
import NotificationAlert from "react-notification-alert";
import { MdDeleteSweep } from 'react-icons/md';
import {MdSend} from 'react-icons/md';
import axios from "axios";
import {BsPlusSquareFill} from "react-icons/bs"
export default class BullMed extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user:[],
            bulletinsMed:[],
            allAvis:[],
            numBull:"",
            avis:"",
            autreAvis:"",
            commentaireMed:"",
            numberBull:"",
            showAutre:false

             
        }
        this.handleChange=this.handleChange.bind(this);
        this.show =this.show.bind(this);

    }
    


    componentDidMount() {
        const local = localStorage.getItem("user");
        this.setState({
          user: JSON.parse(local),
        })
        this.getAllBullMed();
        this.getAllAvis();
        this.getBull();
      }
      handleSubmit=(e)=> {
        e.preventDefault();
        this.ajouterAvis();
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
   

      
      getAllAvis = () => {
        axios.get('http://localhost:8080/getAllAvis').then( res => {
          console.log(res.data)
              this.setState({  
              allAvis:res.data
              });
        })
      }


      getBull = (numBull) => {
        axios.get('http://localhost:8080/getBullMed/'+numBull).then( res => {
         console.log(res.data);
         let bull = res.data;
              this.setState({  
              numBull:res.numBull,
              date:res.date,
              });
        })
      }



      handleShow (b) {
        console.log(b.numBull)
        this.setState({
            show: true,
            numBull:b.numBull,
            date:b.date,
            expediteur: b.expediteur.userName,

            
        });

      }
      
      
      handleClose () {
        this.setState({
            show:false
      
        });
      }
      
      handleChange = (event) => {
        const value =event.target.value;
        this.setState({
        
            [event.target.name]:value
        })
    }


    show=(avis)=>{
      if(avis == "autre"){
        this.setState({
          showAutre:true,

        }) }else this.setState({
          showAutre:false,

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


  ajouterAvis = ()=>{
    let bullMed = {
        commentaireMed:this.state.commentaireMed,
    }
      if(this.state.autreAvis != ""){
      axios.put(`http://localhost:8080/ajouterAvis/`+ this.state.numBull+ '/'+this.state.avis+'/'+this.state.autreAvis,bullMed).then(res => {
      })}else{
        axios.put(`http://localhost:8080/ajouterAvis/`+ this.state.numBull+ '/'+this.state.avis,bullMed).then(res => {
        })
      }
}

    render() {
        return (
            <> 
              <NotificationAlert ref={this.notificationAlert} />


         <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                
                  <h5 className="title">Listes des bulletins</h5>
                  <p className="category">
                    Created using Montserrat Font Family
                  </p>
                </CardHeader>
                <CardBody>
                <Table responsive>
                  <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example" >
                    <Tab eventKey="home" title="Toute la liste" >
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
                          
                             <Button onClick={() =>this.handleShow(b)}>   <BsPlusSquareFill  size={20} className="text-lignt" /> &nbsp;AVIS </Button>    
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
               
        <Modal
        show={this.state.show}
        onHide={() =>this.handleClose()}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Ajouter votre avis <br></br> <small> Buuletin numero <b> {this.state.numBull}</b></small> </Modal.Title>

        </Modal.Header>
        <Form  onSubmit={this.handleSubmit}>

        <Modal.Body  >

            
                 
                    <Row>
                      <Col  className="pl-2" md={9}> 
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Avis</Form.Label>
                    <Form.Control as="select" name="avis"defaultValue="Choose..." className="p-2" required value={this.state.avis} onChange={this.handleChange}  onClick={()=> {this.show(this.state.avis)}}>
                    <option>Choisir...</option>

                      {this.state.allAvis.map( R => 
                      <option value={R.avis} >{R.avis} </option> )}
                      <option value="autre">Autre</option>

                    </Form.Control>
                  </Form.Group> 
                  </Col>
                  <Col md={3}> </Col>
                    </Row>
              { this.state.showAutre  ? 
  
                <Row > 
                    <Col className="ml-2" md={9}>
                        <Form.Group>
                           <label htmlFor="exampleInputEmail1">
                           Autre avis
                           </label>
                          <Form.Control type="text"  name="autreAvis" required value={this.state.autreAvis} onChange={this.handleChange}/>
                          <small> votre avis sera enregistrer !</small>
                        </Form.Group>

                      </Col>
                      <Col md={3}> </Col>

                    </Row>


               :false}
           
                  <Row > 
                    <Col className="ml-2" md={9}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Commentaire</Form.Label>
                      <Form.Control as="textarea" rows={3} name="commentaireMed" required value={this.state.commentaireMed} onChange={this.handleChange}/>
                    </Form.Group>
                      </Col>
                      <Col md={3}> </Col>

                    </Row>



        </Modal.Body>
        <Modal.Footer>
        <Button style={{backgroundColor: "gray"}} className="text-light border border-muted" onClick={() => this.handleClose()}>
         <b>  Anuuler</b> 
          </Button>
        <Button className="btn-fill pull-right"type="submit"  required variant="info"   color="primary" onClick={() => this.handleClose()} >  Ajouter & envoyer  </Button>
       
        </Modal.Footer>  </Form>
      </Modal>

                
            </>
        )
    }
}
