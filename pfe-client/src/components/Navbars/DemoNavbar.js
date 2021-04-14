
import React from "react";
import { Link } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, InputGroup, InputGroupText, InputGroupAddon, Input,} from "reactstrap";
import routes from "routes.js";
import axios from "axios";
import Notification from './Notification.js';
import "assets/css/style.css";
import {AiOutlineAlignLeft} from "react-icons/ai";
import {FaUserCircle} from "react-icons/fa";
import {RiLogoutBoxRLine} from "react-icons/ri";
class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      color: "transparent",
      user:[],
      notifications:[],
    };

    this.toggle = this.toggle.bind(this);
    this.dropdownToggle = this.dropdownToggle.bind(this);
    this.getBull =this.getBull.bind(this);
    this.sidebarToggle = React.createRef();
    this.logout = this.logout.bind(this)

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
    });
    console.log("drop: " + this.state.dropdownOpen)


  }

  getBrand() {
    let brandName = <AiOutlineAlignLeft/>;
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  }

  openSidebar() {
    document.documentElement.classList.toggle("nav-open");
    this.sidebarToggle.current.classList.toggle("toggled");
  }
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  updateColor() {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: "dark",
      });
    } else {                                                      
      this.setState({
        color: "transparent",
      });
    }
  }


  componentDidMount() {
    window.addEventListener("resize", this.updateColor.bind(this));
    const local = localStorage.getItem("user");
    console.log(JSON.parse(local));
    this.setState({
      user: JSON.parse(local),
    })
 
  }


  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      this.sidebarToggle.current.classList.toggle("toggled");
    }
  }




  getBull = (id) => {
    this.props.history.push('/user/bulletin'+id)

  }
  logout = () => {
    sessionStorage.removeItem('user');

  }

  render() {
    return (
      <Navbar style={{backgroundColor:"blue",boxShadow:"5px 5px 7px #79797994 " }}
        color={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "dark"
            : this.state.color
        }
        expand="lg"
        className={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute fixed-top"
            : "navbar-absolute fixed-top " +
              (this.state.color === "transparent" ? "navbar-transparent " : "")
        }>
        <Container fluid >
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button type="button" ref={this.sidebarToggle} className="navbar-toggler" onClick={() => this.openSidebar()}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="/">{this.getBrand()}</NavbarBrand>
          </div>


          <NavbarToggler onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>

          <Collapse isOpen={this.state.isOpen} navbar className="justify-content-end">

          {/*  <form>
              <InputGroup className="no-border">
                <Input placeholder="Search..." />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
          </form>*/}

            <Nav navbar>

         
             &nbsp;
             {/* Notification */}
             <Notification />
      

              <NavItem>
              <Dropdown nav isOpen={this.state.dropdownOpen} toggle={(e) => this.dropdownToggle(e)} >

                <DropdownToggle caret nav >
                  <p> <span> <FaUserCircle size={25}className="profile" />  &nbsp; {this.state.user.userName} &nbsp;</span>
                    <span className="d-lg-none d-md-block">Some Actions</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right  >  
             
                      <DropdownItem  >  
                      &nbsp;      <span className="font-weight-bold">{this.state.user.nom}&nbsp;{this.state.user.prenom} </span>   <br></br>
                      &nbsp;    <small> entrer a votre profile</small>                    

                      </DropdownItem>
                      <hr></hr>
                      <DropdownItem  >  
                     <RiLogoutBoxRLine size={22}/> <Link to="/login" onClick={this.logout()}>  se deconnecter</Link> 
                  
                      </DropdownItem>
                </DropdownMenu>
                </Dropdown>
               
              </NavItem>


            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
