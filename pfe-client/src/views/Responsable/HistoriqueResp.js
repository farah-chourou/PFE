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
import Tooltip from '@material-ui/core/Tooltip';
import { MdDeleteSweep } from 'react-icons/md';
import NotificationAlert from "react-notification-alert";
import  { useState, useEffect } from 'react';
import axios from "axios";
import {Card,CardHeader,CardBody,CardTitle,Row,Col,} from "reactstrap";
import {MdSend} from 'react-icons/md';
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined';
import HistoriqueBullMed from "./HistoriqueBullMed"
import {FiAlertCircle} from 'react-icons/fi';
import { RiRestaurantLine } from 'react-icons/ri';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Chip from '@material-ui/core/Chip';
import moment from 'moment';
import 'moment/locale/fr';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import backgroundImage from "fond8.png";

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
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


  iconButton: {
    padding: 10,
    
  },
  divider: {
    height: 28,
    margin: 4,
  },
  input: {
    height: 30,
    color : '#3d5afe',
    borderWidth: '1px',
    borderColor: 'green !important'
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






function createData(numBull, date, expediteur,specialite,etat,recepteur,commentaireMed,commentaireResp) {
  return { numBull, date ,expediteur,specialite,etat,recepteur, history: [
    { commentaireMed, commentaireResp , numBull },
   
  ],};
}


export default function CustomPaginationActionsTable() {
  const theme = useTheme();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [value, setValue] = React.useState(0);
  

  
  const [user,setUser] =useState([]);
  const [bulletinsResp,setBulletinsResp] = useState([]);
  const [bulletinsMed,setBulletinsMed] = useState([]);
  const [numberBullMed,setNumberBullValid] = useState([]);

  const [EnAttente,setEnAttente]=useState([]);
  const [Accepter, setAccepter] = useState([]);
  const [Rejeter, setRejeter] = useState([]);
  const [Visite, setVisite] = useState([]);
 
  const[annee,setAnnee]=useState(moment().format("YYYY"))
  const [bullAnnee,setBullAnnee]=useState([])
  const [bull,setBull]=useState([])

//tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  }; 

useEffect(() => {
  const local = localStorage.getItem("user");
  setUser(JSON.parse(local)) 

   getAllBullResp();
   getAllBullMed();
   
  axios.get('http://localhost:8080/getAllBullDashbord/'+JSON.parse(local).userName ).then(result => {
    result.data.map(e => 
      <div key={e.numBull}>
      {((e.etape==2|| e.etape==4))?
          (    setBull(prevState => [...prevState, e]))
         
      :false}
      </div>
      ); 
  })
}, [])




const getAllBullResp =() =>{
  axios.get('http://localhost:8080/getAllBull').then(res => {
 
    const local = localStorage.getItem("user");
    setUser(JSON.parse(local)) 

    res.data.map(k => 
      <div >
       {(k.recepteur.userName == JSON.parse(local).userName && k.etape == 2) ?  
      ( bulletinsResp.push(k),
      setNumberBullValid(
        bulletinsResp.length
      )
      )  
      : false}
      </div>
    )
 }
 )
}

var rows =[];
bulletinsResp.map((d)=> {
rows.push(createData(d.numBull,d.date, d.expediteur.userName, d.specialiteMed,d.etat))

})

const getAllBullMed =() =>{
  const local = localStorage.getItem("user");
  setUser(JSON.parse(local)) 
 

  axios.get('http://localhost:8080/getAllBullDashbord/'+JSON.parse(local).userName ).then(result => {
    result.data.map(e => 
      <div key={e.numBull}>
      {((e.etape==2|| e.etape==4)&&moment(e.date).format("YYYY") == annee)?
          (    setBulletinsMed(prevState => [...prevState, e]))
         
      :false}
      </div>
      ); 
  })
  
  axios.get('http://localhost:8080/getAllBullDashbord/'+JSON.parse(local).userName ).then(result => {
    result.data.map(e => 
      <div key={e.numBull}>
      {(e.etat == "Accepté"&& e.etape==4)?
          (    setAccepter(prevState => [...prevState, e]))
      :(e.etat =="Rejeté"&& e.etape==4)?
      (    setRejeter(prevState => [...prevState, e]))
      :(e.etat == "Contre visite"&& e.etape==4)?
      (    setVisite(prevState => [...prevState, e]))
      :(e.etat == "En attente"&& e.etape==2)?
      (    setEnAttente(prevState => [...prevState, e]))

      :false
      }</div>
      )
  })


}






// filter 
const  [searched,setSearched] = useState("")
 
const [dropdownOpen, setOpen] = useState(false);
const [filter,setFilter]=useState("Nom d'utilisateur")




const rejeter =()=>{

  Rejeter.map(b=>
    setBulletinsMed(Rejeter.filter(bull => moment(bull.date).format("YYYY") == annee)))
}
const accepter =()=>{
  
  Accepter.map(b=>
    setBulletinsMed(Accepter.filter(bull => moment(bull.date).format("YYYY") == annee)))
}
const visite =()=>{
  Visite.map(b=>
    setBulletinsMed(Visite.filter(bull => moment(bull.date).format("YYYY") == annee)))
}
const enAttente =()=>{
  EnAttente.map(b=>
    setBulletinsMed(EnAttente.filter(bull => moment(bull.date).format("YYYY") == annee)))
}

const changeSubstract=()=>{
 console.log(annee)

 bull.map(b=>
  setBulletinsMed(bull.filter(bull => moment(bull.date).format("YYYY") == annee-1)))
  console.log(annee)

}
const changeAdd=()=>{
 if (annee != moment().format("YYYY")) {
 ( setAnnee((annee+1)) ) 
}


  bull.map(b=>
    setBulletinsMed(bull.filter(bull => moment(bull.date).format("YYYY") == annee+1)))
  
}


//pagination
var rowsMedecin =[];
bulletinsMed.map((d)=> {
rowsMedecin.push(createData(d.numBull,d.date, d.expediteur.userName, d.specialiteMed,d.etat,d.recepteur,d.commentaireMed,d.commentaireResp))

}) 


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

  rowsMedecin.filter((row) => {
  return row.numBull.toString().includes(searched);
  }));
  
  return (
    <div className="content" component={Paper}>
{console.log(Rejeter)}
  <Row>
  <Col md="12">
    <Card >
      <CardHeader className="bg-light" style={{ backgroundImage: `linear-gradient(#fffbfbb0, #fffbfbb0),url(${backgroundImage})`,backgroundSize:"100%",paddingBottom:17}}>
        <Row>
          <Col md={12}>
          <CardTitle tag="h4">Bulletin Récemment Envoyé</CardTitle>


          <ButtonGroup  size="small" aria-label=" small  outlined primary button group" >
        <Button style={{outline:"none"}} onClick={enAttente}>En attente</Button>
        <Button style={{outline:"none"}} onClick={accepter} >Accepté</Button>
        <Button style={{outline:"none"}} onClick={rejeter}> Rejeté</Button>
        <Button style={{outline:"none"}}onClick={visite}>Contre visite</Button>

      </ButtonGroup>
&nbsp;&nbsp;
&nbsp;
      <ButtonGroup  size="small" aria-label=" small  outlined primary button group" style={{position:"relative" , bottom:-6}}>
        <Button style={{outline:"none"}} onClick={()=>{changeAdd()}}><ArrowLeftIcon fontSize="small"/></Button>
        <Button style={{outline:"none"}} >{annee}</Button>
        <Button style={{outline:"none"}} onClick={()=>{  setAnnee(annee-1);changeSubstract();}}> <ArrowRightIcon fontSize="small"/></Button>

      </ButtonGroup>
      
      &nbsp;&nbsp;&nbsp;      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;

       
      <ButtonGroup color="primary" size="small" aria-label=" small   primary button group" style={{position:"relative",bottom:-8,width:180 }}>
      <TextField id="standard-search" label="Rechercher par N° bulletin" type="search" 
       InputLabelProps={{className:classes.cssLabel}}
       InputProps={{
              className: classes.input,
              startAdornment: (
                <InputAdornment position="start">
                <SearchIcon  aria-label="toggle password visibility" />           
                </InputAdornment>
              ),
            }} 
         
            value={searched}
            onChange={ e =>setSearched(e.target.value)}
            />
      

      </ButtonGroup>

           </Col>

           
        
         </Row>


      </CardHeader>
      <CardBody>
   <TableContainer style={{ overflow: "hidden"}} >
     <Row> 
       <Col md={3}></Col>
     <Col md={9} className=" align-self-end ">



      </Col></Row>
      <Table className={classes.table} aria-label="custom pagination table">
  
      <TableHead>
          <TableRow  >
          <TableCell> <b> </b></TableCell>

          <TableCell> <b>Numero bulletins  </b></TableCell>
            <TableCell > <b> Date d'envoie </b></TableCell>
            <TableCell > <b> Specialité medecin</b></TableCell>
            <TableCell ><b> Envoyer par</b> </TableCell>
            <TableCell ><b >  Etat</b> </TableCell>

          
          </TableRow>
        </TableHead>
        <TableBody>
     
          {(rowsPerPage > 0
            ? requestSearch.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : requestSearch
          ).map((row) => (
            <HistoriqueBullMed key={row.numBull} row={row} bullMed={getAllBullMed} allBull={bulletinsMed} />

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
              onChangePage={handleChangePageMedecin}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
    
      </Table>

    </TableContainer>
    </CardBody>
              </Card>
            </Col>
            

          </Row>







    
    </div>
  );
}