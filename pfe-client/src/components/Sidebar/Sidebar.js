
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Nav } from "reactstrap";
import {Row, Col, Container} from "react-bootstrap";

import PerfectScrollbar from "perfect-scrollbar";

import logo from "logo.png";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    this.sidebar = React.createRef();


  
      this.state = {
           user :[],
           responsables:[],
           numBull:'',
           specialiteMed:'',
           recepteur:'',
           avis:'',
           error:''
      }
  
  
  


  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }

    const local = localStorage.getItem("user");
    console.log(JSON.parse(local));
    this.setState({
      user: JSON.parse(local),

    })

  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    return (
      <div
        className="sidebar"
        data-color={this.props.bgColor}
        data-active-color={this.props.activeColor}
      >
        <div className="logo">
          <a
            href="https://www.creative-tim.com"
            className="simple-text "
          >
            <div className="logo-img w-75" >
         &nbsp;&nbsp;&nbsp;     <img src={logo} alt="react-logo" />
            </div>
          </a>
        
        </div>

        <div className="sidebar-wrapper" ref={this.sidebar}>
      
          <Nav>
         
          <Nav className=" text-light text-uppercase font-weight-bold">
          &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;   Role :   {this.state.user.role}
         </Nav>
            {this.props.routes.map((prop, key) => {
            
      if(this.state.user.role == "responsable"){ 

           if(prop.invisible) return null;
          
          }else if (this.state.user.role =="validateur" || this.state.user.role =="medecin"){
            if(prop.role =="responsable") return null;
          }

           
              return (
                <li
                  className={
                    this.activeRoute(prop.path) +
                    (prop.pro ? " active-pro" : "")
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            })}

  

          </Nav>

      
        </div>
      </div>
    );
  }
}

export default Sidebar;
