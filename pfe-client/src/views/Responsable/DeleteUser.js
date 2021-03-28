import React, { Component } from 'react'
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import { MdDeleteSweep } from 'react-icons/md';
import {Tabs, Tab, Button, Modal,Form} from "react-bootstrap";
import {Card,CardHeader,CardBody,CardTitle,Table,Row,Col,} from "reactstrap";
import {FiAlertCircle} from 'react-icons/fi';
import Tables from "../Tables";
export default class DeleteUser extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             id:props.id,
             show:false,
             medecins:[],
            validateurs:[],
             color:"",
             title:"",
             message:"",
             icon:"",
        }
        this.handleClose=this.handleClose.bind(this);
    }



    componentDidMount(){

      this.getValidateurs();
      this.getMedecins();

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
           

    handleShow () {
        this.setState({
            show : true,
        }) }
    
    handleClose () {
          this.setState({
              show : false,
          });}

    handleDelete () {
        this.setState({
            show : false,
        });

        axios.delete('http://localhost:8080/deleteUser/'+this.state.id).then(res => {
          console.log(res.data);
          
          if(res.data == "Not_OK" ) {
            this.setState({
              color: "danger",
              title:"Erreur !",
              message:"Impossible de supprimer cet utilisateur",
              icon:"nc-icon nc-simple-remove"
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
            let id = this.state.id
              this.setState({
                validateurs: this.state.validateurs.filter( user => user.id !== this.state.id) ,// condtion de filtrage
                medecins: this.state.medecins.filter( user => user.id !== this.state.id) 
              })  }

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

            <> {console.log(this.state.validateurs)}

               <NotificationAlert ref={this.notificationAlert} />
            <h4> <MdDeleteSweep className="" onClick={()=> this.handleShow()}/>  </h4>   
               
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
        )
    }
}
