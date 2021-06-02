import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined';
import {Form, Row,Col,} from "react-bootstrap";
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import  { useState, useEffect } from 'react';
import {MdSend} from 'react-icons/md';
import NotificationAlert from "react-notification-alert";
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });
  
export default function HistoriqueBullMed(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const [comment,setComment] = useState()

    const [rowsMedecin,setRowsMedecin]=useState(props.rowsMedecin)
    var color ="";
    var title=""
    var message="";
    var icon ="";

    const [allBullMed,setAllBullMed]=useState(props.allBullMed) 

   const bullMedecin = () => {
      props.bullMed()
  }
   const updateBull =() =>{

    
    axios.put('http://localhost:8080/ajouterCommentaire/'+row.numBull+ "/" + comment).then(res => {
           })

      
   }

    const  handleChange = (event) => {
    const value =event.target.value;
    setComment(value) 
   }

   const envoyer =() =>{
     

   axios.put('http://localhost:8080/envoyer/'+ row.numBull).then(res => {

   })
   
  // bullMedecin();

   //setAllBullMed( allBullMed.filter( bulletins => bulletins.numBull !==row.numBull))
   }



   const notificationAlert = React.createRef();
   const notify =(place) => {
   
     var options = {};
     options = {
       place: place,
       message: (
         <div className="text-left " style={{}}>
           <div>
           <b>"succeee"</b> <br></br>
     ffffffff
            </div>
         </div>
       ),
       type:  "success",
       icon: "nc-icon nc-simple-remove",
       autoDismiss: 7,
     };
    notificationAlert.current.notificationAlert(options);
   
   }
    return (
      <> <NotificationAlert ref={notificationAlert} />
      <React.Fragment>
 

<TableRow  className={classes.root}>
           <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}style={{outline:"none"}}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon style={{outline:"none"}} />}
            </IconButton>
          </TableCell>
              <TableCell component="th" scope="row" >
             
              { row.numBull}
           
              </TableCell>
              <TableCell component="th" scope="row">
              { moment(row.date).format('L')}
           
              </TableCell>
             
              <TableCell component="th" scope="row">
                {row.specialite}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.recepteur}
              </TableCell>
              <TableCell component="th" scope="row" >
                {row.etat=="Accepté"? 
                <span className="etatAccepter shadow p-1 px-2 "> {row.etat} </span>   
                :row.etat=="Rejeté"?
                <span className="etatRejeter shadow p-1 px-2 "> {row.etat} </span>   
                 :row.etat=="Contre visite"?
                 <span className="etatVisite shadow p-1 px-2 "> {row.etat} </span>   
                 :row.etat=="En attente"?
                 <span className="etatAttente shadow p-1 px-2 "> {row.etat} </span>   
                :                <span className="etatAutre shadow p-1 px-2 "> {row.etat} </span>   

              } 
              </TableCell>
          
               </TableRow>
       


        <TableRow >
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography  gutterBottom component="div">
              <b>                    &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                 Commentaires  <br></br></b> 
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                  
                      
                    
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.numBull}>

   

                     <Row>      
                   &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                        <Col md={6}>
                        <Form.Group>
                          <label>Commentaire Medecin</label>
                          {historyRow.commentaireMed == null ? 
                          <Form.Control  as="textarea" defaultValue="Aucun commentaire trouver" disabled type="text" ></Form.Control>
 
                         : <Form.Control  as="textarea" defaultValue={historyRow.commentaireMed} disabled type="text" ></Form.Control>}
                        </Form.Group>
                          
                           </Col> 

                        <Col md={5}>
                        <Form.Group>
                          <label>Votre commentaire</label>
                          {historyRow.commentaireResp == null ? 
                           <Form.Control name="comment" value={comment} defaultValue="Aucun commentaire trouver" disabled  as="textarea"  type="text" ></Form.Control> 
 
                         : <Form.Control name="comment" value={comment} defaultValue={historyRow.commentaireResp} disabled  as="textarea"  type="text" ></Form.Control> }
                        </Form.Group>
                          
                           </Col> 
                       
                      
                      </Row>
                  
                        
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment></>
    );
  }
  
  HistoriqueBullMed.propTypes = {
    row: PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbs: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
    }).isRequired,
  };