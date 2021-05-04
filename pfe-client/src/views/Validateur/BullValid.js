import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme,withStyles } from '@material-ui/core/styles';
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
import {  Modal,Form,Card} from "react-bootstrap"
import  { useState, useEffect } from 'react';
import axios from "axios";
import {CardHeader,CardBody,CardTitle,Row,Col,} from "reactstrap";
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import 'moment/locale/fr';
import logo from "logo.png";

//pagination
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



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




const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));




function createData(numBull, date, specialite,etat,commentaireResp,commentaireMed,recepteur, expediteur) {
  return {numBull, date, specialite,etat,commentaireResp,commentaireMed,recepteur, expediteur};
}

export default function UsersList() {
  const theme = useTheme();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [value, setValue] = React.useState(0);
  const [user,setUser] = useState([])
  const [expanded, setExpanded] = React.useState(false);
  const [num, setNum] = React.useState("");
  const [bulletins,setBulletins] =useState([])
  moment.locale('fr');





//tabs

useEffect(() => {
  const local = localStorage.getItem("user");
  setUser(JSON.parse(local)) 
  getBullMedecin();

}, [])



const getBullMedecin = ()=>{
  const local = localStorage.getItem("user");

  axios.get('http://localhost:8080/getBullfromNotif/'+ JSON.parse(local).userName ).then( res => {
  
 setBulletins(res.data)
    

}).catch((err)=>console.log(err));


}

var rows =[]
bulletins.map((d)=> {
rows.push(createData(d.suivisBullMed.numBull,d.suivisBullMed.date, d.suivisBullMed.specialiteMed, d.suivisBullMed.etat,d.suivisBullMed.commentaireResp,d.suivisBullMed.commentaireMed ,
                     d.suivisBullMed.recepteur,d.suivisBullMed.expediteur.userName))

})


   
const handleChange = (panel) => (event, isExpanded) => {
  setExpanded(isExpanded ? panel : false);
};


const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};



  return (
    <div className="content"  component={Paper}>

    <Row>
  <Col md={1}>  </Col>
  <Col md="10">
    <Card >
      <CardHeader className="bg-light">
        <Row>
          <Col md={9}>
          <CardTitle tag="h4">Listes des bullletins validées</CardTitle>
           <p className="card-category">
           </p> 
           </Col>

   
        
         </Row>
        


      </CardHeader>
      <CardBody>
   
    



<TableContainer> 
      <Table className={classes.table} aria-label="custom pagination table">

    

        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            
            <TableRow  key={row.numBull}>
           
   
              <TableCell style={{ width: 150 ,fontSize:"16px"}} alignt="center">
             Bulletin numero  <b> {row.numBull}</b> 
              </TableCell> 

              <TableCell style={{ width: 500 }} >
              <Accordion  onChange={handleChange('panel1')}>
        <AccordionSummary
        className="bg-light"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading }  > <span className="text-primary "> &nbsp;&nbsp;&nbsp;&nbsp; <b> Etat:</b>  {row.etat} </span>   </Typography>
          <Typography className={classes.secondaryHeading}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rembourssement accepter</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
       
          <Row >
          <Row className="mx-3 " style={{borderBottom:"1px dotted grey"}}>
             <Col md={4} className="text-center">  <br></br> <img src={logo} alt="MUTUAL-BY-CODWAY-logo" width="150px"  style={{ /* border:"0.5px solid #c7c7c7 " , borderRadius:"20px"*/}} /> </Col>
             <Col md={6} className="ml-4" > 
             <div class="d-flex flex-column">
               <div class="p-1"><b>Medecin:</b> Docteur {row.recepteur } saadi</div>
               <div class="p-1"><b>Spécialité:</b>  {row.specialite}</div>
               <div class="p-1"><b>Date d'envoie:</b> {moment(row.date).format("dddd, Do  MMMM YYYY  , h:mm:ss a")}</div>
             </div>
              </Col>
            

           </Row>


          <Row  className="mx-3 mt-3" > 
          <Col md={12} ><b>Avis medical:</b>  {row.etat} </Col>
          </Row>

          <Row  className=" mx-3"> 
          <Col md={12} ><b>Commentaire du medecin:</b> <br></br>
 
          <Card>
            <Card.Body>{row.commentaireMed}</Card.Body>
          </Card>    
          </Col>
    
          <Col md={12} ><b>Commenatire du responsable:</b><br></br>
          <Card>
            <Card.Body> {row.commentaireResp==null? "Pas de commentaire" : row.commentaireResp}</Card.Body>
          </Card>            
             </Col>

          </Row>

          <Row  className="m1-3 mx-3"> 
       <small style={{paddingLeft:"480px"}}>  Envoyer par {row.expediteur} </small> 

          </Row>

          </Row>





          </Typography>
        </AccordionDetails>
      </Accordion>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <StyledTableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
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
        </TableFooter>
    </Table>
        </TableContainer> 


    </CardBody>
              </Card>
            </Col>
            

          </Row>





    
    </div>
  );
}