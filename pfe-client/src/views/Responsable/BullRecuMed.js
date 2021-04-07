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

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });
  
export default function BullRecuMed(props) {
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
    notify("br"); 
    color ="success";
    title ="Succés!";
    message="Bulletin envoyer avec succés"
    icon ="nc-icon nc-simple-remove"
    
    axios.put('http://localhost:8080/ajouterCommentaire/'+row.numBull+ "/" + comment).then(res => {
           })

      
   }

    const  handleChange = (event) => {
    const value =event.target.value;
    setComment(value) 
   }

   const envoyer =() =>{
     
   color ="success";
   title ="Succés!";
   message="Bulletin envoyer avec succés"
   icon ="nc-icon nc-simple-remove"
   notify("br"); 
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
    return (
      <> <NotificationAlert ref={notificationAlert} />
      <React.Fragment>
 

<TableRow  className={classes.root}>
           <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
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
                {row.recepteur}
              </TableCell>
              <TableCell component="th" scope="row" >
              <span className="etat shadow p-1"> {row.etat} </span>   
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                <IconButton aria-label="delete" className={classes.margin} onClick={() => envoyer()}>
                      <MdSend  size={20} className="envoyerIcon" />
                </IconButton>       
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
                          <Form.Control  as="textarea" defaultValue={historyRow.commentaireMed} disabled placeholder="Company" type="text" ></Form.Control>
                        </Form.Group>
                          
                           </Col> 

                        <Col md={5}>
                        <Form.Group>
                          <label>Ajouter votre commenatire ici</label>
                          <Form.Control name="comment" value={comment} defaultValue={historyRow.commentaireResp} onChange={handleChange} as="textarea"  placeholder="" type="text" ></Form.Control>
                        </Form.Group>
                          
                           </Col> 
                           <Col md={10}> 
                       </Col>
                           <Col md={2}> 
                      &nbsp;&nbsp;  
                         <Button
                           variant="outlined" 
                          
                           size="small"
                           className={classes.button}
                           startIcon={<SaveIcon />}
                           type="submit" 
                           onClick={updateBull}
                         >
                           Save
                         </Button></Col> 
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
  
  BullRecuMed.propTypes = {
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