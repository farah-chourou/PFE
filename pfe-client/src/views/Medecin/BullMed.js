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
import {BsPlusSquareFill} from "react-icons/bs"

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







function createData(numBull, date, expediteur) {
  return {numBull, date, expediteur};
}

export default function UsersList() {
  const theme = useTheme();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [value, setValue] = React.useState(0);

  const [show,setShow] =useState(false);
  const [bulletinsMed,setbulletinsMed] =useState([])
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
  const [avis,setAvis] = useState("")
  const [AllAvis,setAllAvis] = useState([])

  const [autreAvis,setAutreAvis] = useState("")

  const[date,setDate] = useState("")
  const [showAutre,setShowAutre]=useState(false)
  const[commentaireMed,setCommentaireMed] = useState("")
//tabs

useEffect(() => {
  const local = localStorage.getItem("user");
  setUser(JSON.parse(local)) 
  getAllBullMed();
  getAllAvis();
  getBull();
}, [])





const getAllBullMed =() =>{
  const local = localStorage.getItem("user");
  axios.get('http://localhost:8080/getAllBullMedEtape2/'+ JSON.parse(local).userName).then(res => {
  console.log(res.data);
    setbulletinsMed(res.data)
  })
}


var rows =[];
bulletinsMed.map((d)=> {
rows.push(createData(d.numBull,d.date, d.expediteur.userName))

})

const getAllAvis = () => {
  axios.get('http://localhost:8080/getAllAvis').then( res => {
    console.log(res.data)
       setAllAvis(res.data) 
  })
}

const getBull = (numBull) => {
  axios.get('http://localhost:8080/getBullMed/'+numBull).then( res => {
   console.log(res.data);
   let bull = res.data; 
        setNumBull(res.numBull)
        setDate(res.date) 
  })
}

const showAutreAvis=(avis)=>{
  if(avis == "autre"){
    setShowAutre(true)
    }else
    setShowAutre(false)
}

 
const ajouterAvis = ()=>{
  let bullMed = {
      commentaireMed
  }

    if(autreAvis != ""){
    axios.put(`http://localhost:8080/ajouterAvis/`+numBull+ '/'+avis+'/'+autreAvis,bullMed).then(res => {
    })
    setShow(false)
    setbulletinsMed(bulletinsMed.filter(bull => bull.numBull !== numBull))

    notify("br");
  }else{
       axios.put(`http://localhost:8080/ajouterAvis/`+ numBull+ '/'+avis,bullMed).then(res => {

      })
      setShow(false)
      setbulletinsMed(bulletinsMed.filter(bull => bull.numBull !== numBull))

      notify("br");
    }
}  



  const   handleSubmit= (e)=>{
    e.preventDefault();
    ajouterAvis()
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
       Avis ajouter avec succés et envoyer au responsable
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

  <Col md={12}>
    <Card >
      <CardHeader className="bg-light">
        <Row>
          <Col md={9}>
          <CardTitle tag="h4">Liste des bulletins deja envoyer</CardTitle>
           <p className="card-category">
           </p> 
           </Col>

           <Col md={3}>  
     
   
           </Col>
        
         </Row>
        


      </CardHeader>
      <CardBody>
   
    


<TableContainer> 
      <Table className={classes.table} aria-label="custom pagination table">

      <TableHead>
          <TableRow>
            <TableCell >  <b> Numero bulletin </b> </TableCell>
            <TableCell  ><b>Date d'envoi </b></TableCell>
            <TableCell ><b>Envoyer par </b></TableCell>
            <TableCell ><b>Autre </b></TableCell>

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
                {row.expediteur}
              </StyledTableCell>
              <StyledTableCell style={{ width: 160 }} >
              <Button onClick={() =>(setShow(true), setNumBull(row.numBull))}>   <BsPlusSquareFill  size={20} className="text-lignt" /> &nbsp;AVIS </Button>   

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
        onHide={() =>setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Ajouter votre avis <br></br> <small> Buuletin numero <b> {numBull}</b></small> </Modal.Title>

        </Modal.Header>
        <Form  onSubmit={handleSubmit}>

        <Modal.Body  >

            
                 
                    <Row>
                      <Col  className="pl-2" md={9}> 
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Avis</Form.Label>
                    <Form.Control as="select" name="avis"defaultValue="Choose..." className="p-2" required value={avis} onChange={(e)=>setAvis(e.target.value)}  onClick={()=> {showAutreAvis(avis)}}>
                    <option>Choisir...</option>

                      {AllAvis.map( R => 
                      <option value={R.avis} >{R.avis} </option> )}
                      <option value="autre">Autre</option>

                    </Form.Control>
                  </Form.Group> 
                  </Col>
                  <Col md={3}> </Col>
                    </Row>
              { showAutre  ? 
  
                <Row > 
                    <Col className="ml-2" md={9}>
                        <Form.Group>
                           <label htmlFor="exampleInputEmail1">
                           Autre avis
                           </label>
                          <Form.Control type="text"  name="autreAvis" required value={autreAvis} onChange={(e) =>setAutreAvis(e.target.value)}/>
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
                      <Form.Control as="textarea" rows={3} name="commentaireMed" required value={commentaireMed} onChange={(e) => setCommentaireMed(e.target.value)}/>
                    </Form.Group>
                      </Col>
                      <Col md={3}> </Col>

                    </Row>



        </Modal.Body>
        <Modal.Footer>
        <Button style={{backgroundColor: "gray"}} className="text-light border border-muted" onClick={() => setShow(false)}>
         <b>  Anuuler</b> 
          </Button>
        <Button className="btn-fill pull-right"type="submit"  required variant="info"   color="primary"  >  Ajouter & envoyer  </Button>
       
        </Modal.Footer>  </Form>
      </Modal>


    
    </div>
  );
}