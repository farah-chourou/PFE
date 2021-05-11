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
import { Button, Modal,Form} from "react-bootstrap"
import  { useState, useEffect } from 'react';
import axios from "axios";
import {Card,CardHeader,CardBody,CardTitle,Row,Col,} from "reactstrap";
import {MdSend} from 'react-icons/md';
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined';
import BullRecuMed from "./BullRecuMed"
import {FiAlertCircle} from 'react-icons/fi';
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
  
  const [show,setShow] =useState(false);
  const [numBull,setNumBull] = useState();
  var color ="";
  var title=""
  var message="";
  var icon ="";
  
  const [user,setUser] =useState([]);
  const [bulletinsResp,setBulletinsResp] = useState([]);
  const [bulletinsMed,setBulletinsMed] = useState([]);
  const [numberBullValid,setNumberBullValid] =useState(0);
  const [numberBullMed,setNumberBullMed] =useState(0);


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
   setNumberBullMed(
    bulletinsMed.length
  
  )
 
}, [])




const getAllBullResp =() =>{
  axios.get('http://localhost:8080/getAllBull').then(res => {
 
    const local = localStorage.getItem("user");
    setUser(JSON.parse(local)) 

    res.data.map(k => 
      <div >
       {(k.recepteur.userName == JSON.parse(local).userName && k.etape == 1) ?  
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
  axios.get('http://localhost:8080/getAllBullRespMedEtape3/'+JSON.parse(local).userName ).then(res => {

    setBulletinsMed(res.data)
 
  
  
  })

}

var rowsMedecin =[];
bulletinsMed.map((d)=> {
rowsMedecin.push(createData(d.numBull,d.date, d.expediteur.userName, d.specialiteMed,d.etat,d.recepteur,d.commentaireMed,d.commentaireResp))

}) 

const handleDelete =()=> {
 axios.delete('http://localhost:8080/deleteBull/'+numBull).then(res => {
    setShow(false)
    setBulletinsResp(bulletinsResp.filter(user => user.numBull !== numBull))

         })
         title ="Succés"
         color="success"
         message ="Bulletin supprimer avec succés"
         icon ="nc-icon nc-check-2"
          notify("br"); 
     
}

const envoyerBull = (numBull,specialiteMed) => {

  axios.post('http://localhost:8080/addBullMed/'+ numBull + "/" + specialiteMed + "/"+ user.userName).then(res => {
    console.log(res.data);
  })

  axios.put('http://localhost:8080/updateEtapeBull/'+ numBull ).then(res => {
    console.log(res.data);
  })

  setBulletinsResp(bulletinsResp.filter( bulletins => bulletins.numBull !== numBull))
onNotif();
}

const onFilter=(numBull)=>{
  setBulletinsMed(bulletinsMed.filter( bulletins => bulletins.numBull !== numBull))

}

const onNotif = ()=>{
  color ="success";
  title ="Succés!";
  message="Bulletin envoyer avec succés"
  icon ="nc-icon nc-simple-remove"
  notify("br"); 
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

  return (
    <div className="content" component={Paper}>
  <NotificationAlert ref={notificationAlert} />

  <Row>
  {console.log(user.userName)}
  <Col md="12">
    <Card >
      <CardHeader className="bg-light" style={{backgroundImage: `linear-gradient(#fffbfbb0, #fffbfbb0),url(${backgroundImage})`,backgroundSize:"100%",paddingBottom:15}}>
        <Row>
          <Col md={9}>
          <CardTitle tag="h4"> Bulletin  Dernièrement Récu</CardTitle>
           <p className="card-category"style={{color:"#545455"}}>
             vous avez <b> {numberBullValid}</b>  bulletins recu des validateurs et <b> {bulletinsMed.length}</b>  bulletins  recu des medecins 
           </p> 
           </Col>

           <Col md={3}>  
           </Col>
        
         </Row>
        {console.log(numberBullMed)}


      </CardHeader>
      <CardBody style={{position:"relative",top:-15}}>
   <TableContainer >
      <AppBar position="static" color="">
        <Tabs
          value={value}
          onChange={handleChange}
          
          indicatorColor="primary"
          textColor="primary"
          
        //  variant="fullWidth"
          aria-label="full width tabs example"
          
        >
          <Tab label="Bulettins recu des validateurs" {...a11yProps(0)}   style={{outline: 'none'}}/>
          <Tab label="Bulettins recu des medecins" {...a11yProps(1)} style={{outline: 'none'}} />

        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
       

     {/*tab1*/}
     <TabPanel value={value} index={0} dir={theme.direction}>
        <>
      <Table className={classes.table} aria-label="custom pagination table">

      <TableHead>
          <TableRow  >
            
            <TableCell> <b>Numero bulletins  </b></TableCell>
            <TableCell > <b> Date d'envoie </b></TableCell>
            <TableCell > <b> Specialité medecin</b></TableCell>
            <TableCell ><b> Expéditeur</b> </TableCell>
            <TableCell ><b >  Etat</b> </TableCell>
            <TableCell ><b>  Autre</b> </TableCell>

          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.numBull}>
            
              <TableCell component="th" scope="row" >
             
              { row.numBull}
           
              </TableCell>
              <TableCell component="th" scope="row">
              {row.date}
           
              </TableCell>
             
              <TableCell component="th" scope="row">
                {row.specialite}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.expediteur}
              </TableCell>
              <TableCell component="th" scope="row" >
              <span className="etatAttente  p-1 px-2 "> {row.etat} </span>   
              </TableCell>
              <TableCell component="th" scope="row">
              <div className="d-inline-block "> 
                <Tooltip title="Supprimer">
                     <IconButton aria-label="delete" style={{outline: 'none'}}>
                  
                     <MdDeleteSweep style={{color:"black", border:"none",outline:"none"}} size={25} onClick={()=>{setShow(true); setNumBull(row.numBull) }} />
                     </IconButton>
                   </Tooltip>
                   <Tooltip title="Envoyer">
                     <IconButton aria-label="delete" style={{outline: 'none'}}>
                  
                     <MdSend  size={20} className="envoyerIcon" onClick={()=>{ envoyerBull(row.numBull,row.specialite);setNumberBullValid(numberBullValid - 1)}}/>                       </IconButton>
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
    
          <TableRow  >
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
 {/*tab2*/}
        
     
        <TabPanel value={value} index={1} dir={theme.direction}>
        <>

      <Table className={classes.table} aria-label="custom pagination table">

      <TableHead>
          <TableRow  >
          <TableCell> <b> </b></TableCell>

          <TableCell> <b>Numero bulletins  </b></TableCell>
            <TableCell > <b> Date d'envoie </b></TableCell>
            <TableCell > <b> Specialité medecin</b></TableCell>
            <TableCell ><b> Expéditeur</b> </TableCell>
            <TableCell ><b >  Etat</b> </TableCell>
            <TableCell ><b>  Envoyer</b> </TableCell>

          
          </TableRow>
        </TableHead>
        <TableBody>
     
          {console.log(rowsMedecin)}
          {(rowsPerPage > 0
            ? rowsMedecin.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rowsMedecin
          ).map((row) => (
            <BullRecuMed key={row.numBull} row={row} onFilter={onFilter} onNotif={onNotif} />

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

        <h5>  < FiAlertCircle size={55} color="orange"/>    &nbsp; Est-vous sur de supprimer cet utilisateur ?</h5> 
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