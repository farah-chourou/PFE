
import React,{Component} from "react";
import {  withRouter, Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from "reactstrap";
import {Toast,Row,Col} from "react-bootstrap";
import axios from "axios";
import "assets/css/style.css";
import { Redirect } from 'react-router-dom';
import {FaCircle} from "react-icons/fa";
import PerfectScrollbar from 'perfect-scrollbar';
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

var ps;
 class Notification extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isOpen: false,
          dropdownOpen: false,
          color: "transparent",
          user:[],
          notifications:[],
          notificationsNonLu:[],

          expediteurNotif:[],
          number:"",
          showHideNotif: true,


        };
    
        this.toggle = this.toggle.bind(this);
        this.dropdownToggle = this.dropdownToggle.bind(this);
        this.getBull =this.getBull.bind(this);
        this.sidebarToggle = React.createRef();
    
      }
    
     

      toggle() {
        if (this.state.isOpen) {
          this.setState({
            color: "transparent",
          });
        } else {
          this.setState({
            color: "dark",
          });
        }
    
        this.setState({
          isOpen: !this.state.isOpen,
        });
        console.log("isOpen: " +this.state.isOpen)
    
      }
    
    
      dropdownToggle(e) {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen,
          number: 0
        });
        console.log("drop: " + this.state.dropdownOpen)
    
    
      }
   
 
    
      componentDidMount() {
        const local = localStorage.getItem("user");
        console.log(JSON.parse(local));

     //   const ps = new PerfectScrollbar('#container');

        this.setState({
          user: JSON.parse(local),


        })
        this.getNotification();


      }
    
   
    
     getNotification =() =>{
        axios.get('http://localhost:8080/getNotif').then(res => {
          console.log(res.data);
          res.data.map(e => 
            <div key={e.id}>
            { ( e.recepteur == this.state.user.userName  )? 

            ( this.state.notifications.push(e),
            
            this.setState({
            }) )
          
            :false  }

            </div>
            )
            res.data.map(e => 
              <div key={e.id}>
              { ( e.recepteur == this.state.user.userName && e.etat == false )? 
      
              ( this.state.notificationsNonLu.push(e),
              this.setState({
                number: this.state.notificationsNonLu.length
              }) )
            
              :false  }
      
              </div>
              )

            })


      }
    
      getBull = (id) => {
        this.props.history.push('/user/bulletin'+id);
        window.location.reload(false);

      }
      

      pushToNotif = ()=>{
        this.props.history.push('/user/notifications');

      }
 
    render() {
        return (
    
     <Dropdown nav isOpen={this.state.dropdownOpen} toggle={(e) => this.dropdownToggle(e)}  >

          <DropdownToggle caret nav >
            <i className="nc-icon nc-bell-55" />
            <p>
              <span className="d-lg-none d-md-block">Some Actions</span>
            </p>
          </DropdownToggle>
          {(this.state.number > 0)  ?     
           <small className="number text-light" > {this.state.number}  </small>  
        : false
        } 
         
          <DropdownMenu right  >
         <div class="text-center">Notifications   <hr></hr></div>
     
        

                {this.state.notifications.length == 0 ?  <div className="text-center small"> No notification avaible  </div>
                 : 


                 this.state.notifications.reverse().slice(0,4).map( R => 

                 <div key={R.id}>

                <Row >  
                  <Col md={1} className="text-center " > 
                  { R.etat == false ?
                   <FaCircle className="ml-3" size={12} color="rgb(81, 137, 241)"/> 
                   :<FaCircle className="ml-3 text-light" size={12} /> }
                   
                   </Col>
                  <Col md={10}>   
                 <DropdownItem  className="border border-muted " onClick={()=> this.getBull(R.id)} > 
                <div className="font-weight-bold text-uppercase"> {R.expediteurNotif.userName} </div>
                 <div> {R.message}  </div> 
                 <small className=" text-secondary">  envoyer le  {R.date} </small>   
                </DropdownItem> </Col> </Row>

                </div>


          )}   
             {this.state.notifications.length > 3 ?   
         <div>  &nbsp; &nbsp; <Link   onClick={()=> this.pushToNotif()}  class=" text-primary pl-4 pt-5">Afficher tout</Link></div>    
         : false}

          </DropdownMenu>
          
      </Dropdown>
   
        )
    }
}
export default  withRouter(Notification) ;