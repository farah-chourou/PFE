import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

import {FiAlertCircle} from 'react-icons/fi';
import { MdDeleteSweep } from 'react-icons/md';
import NotificationAlert from "react-notification-alert";
import { Button, Modal,Form, DropdownButton} from "react-bootstrap"
import  { useState, useEffect } from 'react';
import axios from "axios";
import {Card,CardHeader,CardBody,CardTitle,Row,Col,} from "reactstrap";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Chip from '@material-ui/core/Chip';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ClearIcon from '@material-ui/icons/Clear';

import backgroundImage from "fond8.png";

//pagination
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));
//tabs
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 1000,

  },
  table: {
    minWidth: 500,
  },
 
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  aa: {
    padding: '1px 2px',
    display: 'flex',
    alignItems: 'center',
    width: 300,
   /* "&:hover": {
      border: "1px solid blue",
      color: "blue"
    },*/
  },

  input: {
    height: 30,
    width:300,
    color : '#3d5afe',
    borderWidth: '1px',
    borderColor: 'green !important',
    flex: 1,
  },
  
  iconButton: {
    padding: 10,
    
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

//animation
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
//tabs
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


//pagination
function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root} >
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};







function createData(userName, Email, specialite,telephone,id,couleur,nom,prenom) {
  return { userName, Email  ,specialite,telephone,id,couleur,nom,prenom};
}

export default function UsersList() {
  const theme = useTheme();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [value, setValue] = React.useState(0);
  const [validateurs,setValidateurs] = useState([]);
  const [medecins,setMedecins] = useState([]);
  const  [searched,setSearched] = useState("")
  const [show,setShow] =useState(false);
  const [id,setId] = useState("");
  var color ="";
  var title=""
  var message="";
  var icon ="";
  const [dropdownOpen, setOpen] = useState(false);
const [filter,setFilter]=useState("Nom d'utilisateur")

//tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  }; 

useEffect(() => {
 getValidateurs();
 getMedecins();
  
}, [])

const getValidateurs =()=>{
  axios.get('http://localhost:8080/getValidateurs').then( res => {
    setValidateurs(res.data)})
}
const getMedecins =()=>{
  axios.get('http://localhost:8080/getMedecins').then( res => {
    setMedecins(res.data)})
}

var rows =[];
validateurs.map((d)=> {
rows.push(createData(d.userName,d.email, "",d.tel , d.id,d.couleur,d.nom,d.prenom))

})

var rowsMedecin =[];
medecins.map((d)=> {
rowsMedecin.push(createData(d.userName,d.email,d.specialite ,d.tel, d.id,d.couleur,d.nom,d.prenom))


}) 

const handleDelete =()=> {

 axios.delete('http://localhost:8080/deleteUser/'+id).then(res => {
 if(res.data == "Not_OK" ) {
 color ="danger";
 title ="Erreur!";
 message="Impossible de supprimer cet utilisateur"
 icon ="nc-icon nc-simple-remove"
 notify("br"); 

 setShow(false);
  }else {
    title ="Succés"
    color="success"
    message ="utilisateur supprimer avec succés"
    icon ="nc-icon nc-check-2"
    notify("br"); 

    setShow(false)
    setValidateurs(validateurs.filter(user => user.id !== id))
    setMedecins(medecins.filter(user => user.id !== id))

        } })
}


const notificationAlert = React.createRef();
const notify =(place) => {

  var options = {};
  options = {
    place: place,
    message: (
      <div className="text-left " style={{}}>
        <div>
        <b>{title}</b> <br></br>
        {message}
         </div>
      </div>
    ),
    type:  color,
    icon: icon,
    autoDismiss: 7,
  };
 notificationAlert.current.notificationAlert(options);

}


const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const emptyRowsMedecin = rowsPerPage - Math.min(rowsPerPage, rowsMedecin.length - page * rowsPerPage);
const handleChangePageMedecin = (event, newPage) => {
  setPage(newPage);
};


const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

var requestSearch =(

  filter=="Email" ?
  rows.filter((row) => {
   return row.Email.toLowerCase().includes(searched.toLowerCase());
})
:filter=="Nom d'utilisateur" ?
rows.filter((row) => {
 return row.userName.toLowerCase().includes(searched.toLowerCase());
})
:rows.filter((row) => {
  return row.userName.toLowerCase().includes(searched.toLowerCase());
 }));


 var requestSearchMed =(

  filter=="Email" ?
  rowsMedecin.filter((row) => {
   return row.Email.toLowerCase().includes(searched.toLowerCase());
})
:filter=="Nom d'utilisateur" ?
rowsMedecin.filter((row) => {
 return row.userName.toLowerCase().includes(searched.toLowerCase());
})
:rowsMedecin.filter((row) => {
  return row.userName.toLowerCase().includes(searched.toLowerCase());
 }));


  return (
    <div className="content" component={Paper}>
  <NotificationAlert ref={notificationAlert} />
  <Row>
  
  <Col md="12">
  <Card style={{borderRadius:"10px",boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px",border:"0.2px solid #69696970"}}>
      <CardHeader style={ { backgroundImage: `linear-gradient(#fffbfbb0, #fffbfbb0),url(${backgroundImage})`,backgroundSize:"100%",paddingBottom:30}}>
        <Row >
          <Col md={9}>
          <CardTitle tag="h4" style={{marginLeft:5,color:"black"}}>  Les Utilisateurs De La  Platforme</CardTitle>
           <p className="card-category">
           </p> 
           
     
&nbsp;

  {/*filter*/}
      <ButtonGroup color="primary" size="small" aria-label=" small   primary button group" style={{position:"relative",bottom:-8,width:180 }}>
      <TextField id="standard-search" label="Rechercher ici " 
       InputLabelProps={{className:classes.cssLabel}} style={{width:500}}
       InputProps={{
              className: classes.input,
                            startAdornment: (
                <InputAdornment position="start">

                 <ButtonDropdown isOpen={dropdownOpen} toggle={ () => setOpen(!dropdownOpen)} >
                   <DropdownToggle split color="white" style={{outline:"none",fontSize:14,backgroundColor:"none"}} />
                   <DropdownMenu>
                       <>
                     <DropdownItem header>FILTRER PAR</DropdownItem>
                     <DropdownItem onClick={()=>{setFilter("Nom d'utilisateur")}}>Nom d'utilisateur</DropdownItem>
                     <DropdownItem onClick={()=>{setFilter("Email")}}>Email</DropdownItem>
                     </>
                   </DropdownMenu>
                 </ButtonDropdown>


      {(filter !=null && searched == "" )?
                    <Chip
                    variant="outlined"
                      size="small"
                      label={filter}
                      onDelete={()=>setFilter(null)}
        />
      :    <Chip
      variant="outlined"
        size="small"
        label={filter}
        onDelete={()=>setFilter(null)}
        color="primary"
/> 
      }
                        
                </InputAdornment>
              ),            endAdornment: ( 
              <>
                {searched == "" ?
                <IconButton  className={classes.iconButton} style={{outline:"none"}}  >
                  <SearchIcon  aria-label="toggle password visibility"   />
                </IconButton>
                :   
                <IconButton  className={classes.iconButton} style={{outline:"none"}}>
                <ClearIcon onClick={()=>setSearched("")} color="primary"/>
              </IconButton>}
              </>
            )

            }} 
         
            value={searched}
            onChange={ e =>setSearched(e.target.value)}
            />
      

      </ButtonGroup>

     


           </Col>
       <Col md={1}></Col>
           <Col md={2}>  
           <div className="d-inline-block  " style={{marginLeft:2,position:"relative",top:-12}}>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; 
           <AddUser validateurs={getValidateurs} medecins={getMedecins}  /></div>  
           
           </Col>
         </Row>
      </CardHeader>
      <CardBody style={{position:"relative",top:-15}}>

   <TableContainer >
      <AppBar position="static" color="white" >
        <Tabs /* TabColorProps={{style: {background:'white'}}} TabIndicatorProps={{style: {background:'white'}}} */ value={value}    onChange={handleChange}   indicatorColor="primary"    textColor="primary"  color="default"   aria-label="full width tabs example">
          <Tab label="Medecins" {...a11yProps(0)}  style={{outline: 'none'}} />
          <Tab label="Validateurs" {...a11yProps(1)}  style={{outline: 'none'}}/>
        </Tabs>
      </AppBar>
      <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex} >
     
     
        <TabPanel value={value} index={0} dir={theme.direction}>
        <>

      <Table className={classes.table} aria-label="custom pagination table">

      <TableHead>
          <TableRow  >
           <TableCell> <b> &nbsp; &nbsp;# </b></TableCell>
            <TableCell> <b>Nom  </b></TableCell>
            <TableCell> <b>Prénom  </b></TableCell>
            <TableCell > <b> Email </b></TableCell>
            <TableCell > <b> Spécialité medecin</b></TableCell>
            <TableCell > <b> Numero télephone</b></TableCell>
    
            <TableCell ><b> Autre</b> </TableCell>
          
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? requestSearchMed.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : requestSearchMed
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
              <Avatar style={{backgroundColor : row.couleur,fontSize:17}} className="text-uppercase shadow">    { row.nom.substr(0, 1) +row.prenom.substr(0, 1) }</Avatar>

              </TableCell>
              <TableCell component="th" scope="row">
                {row.nom}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.prenom}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.Email}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.specialite}
              </TableCell>
           
              <TableCell component="th" scope="row">
                {row.telephone}
              </TableCell>
              <TableCell component="th" scope="row">
              <div className="d-inline-block ">
                   <div className="d-inline-block mr-3">    <EditUser id={row.id} validateurs={getValidateurs} medecins={getMedecins}  /> </div> </div>   
                <div className="d-inline-block "> 
                <Tooltip title="Supprimer">
                     <IconButton aria-label="delete">
                  
                     <MdDeleteSweep  style={{color:"#2b2b2b",outline:"none"}} onClick={()=>{ setShow(true) ;setId(row.id) }}/>
                     </IconButton>
                   </Tooltip>
          
                   </div>  
         </TableCell>
            </TableRow>
          ))}

          {emptyRowsMedecin > 0 && (
            <TableRow style={{ height: 53 * emptyRowsMedecin }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
    
        <TableRow   >
            <TablePagination 
         
              rowsPerPageOptions={[5, 10, 25, { label: 'Tous', value: -1 }]}
              colSpan={7}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePageMedecin}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
      </Table>
    </>





        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>

{/*tab1*/}
   <>



 <Table className={classes.table} aria-label="custom pagination table">


 <TableHead >
     <TableRow  >
      <TableCell> <b> &nbsp; &nbsp;# </b></TableCell>
       <TableCell > <b>Nom  </b></TableCell>
       <TableCell > <b>Prénom  </b></TableCell>
       <TableCell > <b> Email </b></TableCell>
       <TableCell > <b> Numero télephone</b></TableCell>
       <TableCell ><b> Autre</b> </TableCell>
     
     </TableRow>
   </TableHead>

   <TableBody>
  {console.log(searched)}
     {(rowsPerPage > 0
       ? requestSearch.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
       : requestSearch
     ).map((row) => (
       <TableRow key={row.id} hover>
         <TableCell component="th" scope="row" >
        
           <Avatar style={{backgroundColor : row.couleur,fontSize:17}} className="text-uppercase shadow">    { row.nom.substr(0, 1) +row.prenom.substr(0, 1) }</Avatar>
      
         </TableCell>
         <TableCell style={{ width: 165 }}>
         { row.nom}
         </TableCell>
         <TableCell style={{ width: 165 }}>
         { row.prenom}
         </TableCell>
         <TableCell style={{ width: 165 }} >
           {row.Email}
         </TableCell>
         <TableCell component="th" scope="row">
           {row.telephone}
         </TableCell>
         <TableCell component="th" scope="row">
         <div className="d-inline-block ">
              <div className="d-inline-block mr-3">    <EditUser id={row.id} validateurs={getValidateurs} medecins={getMedecins}  /> </div> </div>   
           <div className="d-inline-block "> 
           <Tooltip title="Supprimer">
                <IconButton aria-label="delete"  style={{outline: 'none'}}>
             
                <MdDeleteSweep  style={{color:"2b2b2b"}} onClick={()=>{ setShow(true) ;setId(row.id) }}/>
                </IconButton>
              </Tooltip>
     
              </div>  
    </TableCell>
       </TableRow>
     ))}

     {emptyRows > 0 && (
       <TableRow style={{ height: 53 * emptyRows }}>
         <TableCell colSpan={6} />
       </TableRow>
     )}
   </TableBody>

   <TableRow   >
       <TablePagination 
    
         rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
         colSpan={7}
         count={rows.length}
         rowsPerPage={rowsPerPage}
         page={page}
         SelectProps={{
           inputProps: { 'aria-label': 'rows per page' },
           native: true,
         }}
         onChangePage={handleChangePage}
         onChangeRowsPerPage={handleChangeRowsPerPage}
         ActionsComponent={TablePaginationActions}
       />
     </TableRow>

 </Table>
</>


   </TabPanel>
      </SwipeableViews>
    </TableContainer>
    </CardBody>
              </Card>
            </Col>
            

          </Row>






    

    <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>CONFIRMER </Modal.Title>
        </Modal.Header>
        <Modal.Body  >

        <h5>  < FiAlertCircle size={55} color="orange"/>  &nbsp; Est-vous sur de supprimer cet utilisateur ?</h5> 
        </Modal.Body>
         <Modal.Footer>
          <Button style={{backgroundColor: "orange"}} className="text-light border border-muted" onClick={handleDelete}>
         <b>  oui, supprimer-le !</b> 
          </Button>
        </Modal.Footer>
      </Modal>



    
    </div>
  );
}