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
import {  Modal,Form} from "react-bootstrap"
import  { useState, useEffect } from 'react';
import axios from "axios";
import {Card,CardHeader,CardBody,CardTitle,Row,Col,} from "reactstrap";
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
//pagination
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));
//tabs
const useStyles = makeStyles((theme) => ({

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
  button: {
    margin: theme.spacing(1),
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







function createData(numBull, date, specialite) {
  return {numBull, date, specialite};
}

export default function UsersList() {
  const theme = useTheme();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [value, setValue] = React.useState(0);

  const [show,setShow] =useState(false);
  const [bulletinsValid,setBulletinsValid] =useState([])
  const [numberBull,setNumberBull] = useState(0)
  const [user,setUser] = useState([])
  const [recepteur,setRecepteur] = useState("")
  const [specialiteMed, setSpecialiteMed]= useState("")
  const [error,setError] =useState("")
  const [responsables,setResponsables]= useState([])
  const [numBull,setNumBull]= useState()
  const [medecins,setMedecins] =useState([])
  const [color,setColor] =useState("")
  const [title,setTitle] =useState("")
  const [message,setMessage] =useState("")

  


//tabs

useEffect(() => {
  const local = localStorage.getItem("user");
  setUser(JSON.parse(local)) 
 // getAllBull();
  GetAllResponsable();
  getAllMed();
  getAllBullUser();
}, [])




const getAllBullUser =() =>{
  const local = localStorage.getItem("user");
  axios.get('http://localhost:8080/getAllBullUser/'+JSON.parse(local).id,).then( res => {
  setBulletinsValid(res.data)
  console.log(res.data)
})
}


var rows =[];
bulletinsValid.map((d)=> {
rows.push(createData(d.numBull,d.date, d.specialiteMed))

})

const GetAllResponsable=()=>{

  axios.get(`http://localhost:8080/getResponsables`)
  .then(res => {
 setResponsables(res.data)
  })}

const getAllMed=()=>{
    axios.get(`http://localhost:8080/getMedecins`)
    .then(res => {
      setMedecins(res.data)
    
        }
        )
      }

   
const   AddBull = () => {
     let suivisBulletein ={
         specialiteMed:specialiteMed,
         numBull: numBull}
         console.log(suivisBulletein)
         
     axios.post('http://localhost:8080/addBull/' +user.id + '/'+ recepteur , suivisBulletein).then(res  => { 

     console.log(res.data) ;
     if(res.data.message =="Bull already exist !"){
         setError("bulletin deja exist !")
     } else{
      getAllBullUser();
             notify("br");
       setShow(false);
  
bulletinsValid.map((d)=> {
rows.push(createData(d.numBull,d.date, d.specialiteMed))

}) 
 } }  ) }
  const   handleSubmit= (e)=>{
    e.preventDefault();
    AddBull();

  }  
const notificationAlert = React.createRef();
const notify =(place) => {

  var options = {};
  options = {
    place: place,
    message: (
      <div className="text-left " style={{}}>
        <div>
        <b>Succés!</b> <br></br>
       Bulletin ajouter avec succés
         </div>
      </div>
    ),
    type:  "success",
    icon: "nc-icon nc-check-2",
    autoDismiss: 7,
  };
 notificationAlert.current.notificationAlert(options);

}


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
   <NotificationAlert ref={notificationAlert} />

    <Row>
  <Col md={1}>  </Col>
  <Col md="10">
    <Card >
      <CardHeader className="bg-light">
        <Row>
          <Col md={9}>
          <CardTitle tag="h4">Liste des bulletins deja envoyer</CardTitle>
           <p className="card-category">
           </p> 
           </Col>

           <Col md={3}>  
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<AddCircleOutlineIcon  fontSize="large"/>}
        onClick={() =>setShow(true)}
      >

        AJOUTER BULLETIN
      </Button>
   
           </Col>
        
         </Row>
        


      </CardHeader>
      <CardBody>
   
    


<TableContainer> 
      <Table className={classes.table} aria-label="custom pagination table">

      <TableHead>
          <TableRow>
            <StyledTableCell >  <b> Numero bulletin </b> </StyledTableCell>
            <StyledTableCell  ><b>Date d'envoi </b></StyledTableCell>
            <StyledTableCell ><b>Specialité du medecin </b></StyledTableCell>

          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <StyledTableRow  key={row.numBull}>
              <StyledTableCell style={{ width: 160 }}  >
                {row.numBull}
              </StyledTableCell>
              <StyledTableCell style={{ width: 160 }} >
                {row.date}
              </StyledTableCell>
              <StyledTableCell style={{ width: 160 }} >
                {row.specialite}
              </StyledTableCell>
              
            </StyledTableRow>
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






    
          <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Ajouter un nouveau bulletin <br></br> </Modal.Title>

        </Modal.Header>

        <Form  onSubmit={handleSubmit}>

        <Modal.Body  >
 
           

                <Form.Row >
                  <Form.Group as={Col} >
                    <Form.Label>Numero Bulletin</Form.Label>
                    <Form.Control className="bg-white" type="number" required placeholder="Enter numero of bulletin" name="numBull" value={numBull} onChange={e => setNumBull(e.target.value)}/>
                  </Form.Group>
                {error}
                </Form.Row>
                <div>{error} </div>
                <Form.Row >
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Specialité medecin</Form.Label>
                    <Form.Control as="select"  required name="specialiteMed" value={specialiteMed} onChange={e => setSpecialiteMed(e.target.value)}>
                    <option>Choose...</option>

                      {medecins.map( R => 
                      <option value={R.specialite} > {R.specialite}    ( Docteur &nbsp;{R.userName}) </option> )}
                
                    </Form.Control>
                  </Form.Group> 


              
                </Form.Row>

                
                
                <Form.Row >
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>envoyer a :</Form.Label>
                    <Form.Control as="select" name="recepteur" required value={recepteur} onChange={e => setRecepteur(e.target.value)}>
                    <option>Choose...</option>

                      {responsables.map( R => 
                      <option value={R.userName} > responsable  ({R.userName}) </option> )}
                
                    </Form.Control>
                  </Form.Group> 
                </Form.Row>
                
           
                
  
               
          
            
      
        </Modal.Body>
        <Modal.Footer>
        <Button style={{backgroundColor: "gray"}} className="text-light border border-muted" onClick={() => setShow(false)}>
         <b>  Anuuler</b> 
          </Button>
        <Button className="btn-fill pull-right"type="submit"  required variant="info"   color="primary" >  Ajouter & envoyer  </Button>
       
        </Modal.Footer>  </Form>
      </Modal>



    
    </div>
  );
}