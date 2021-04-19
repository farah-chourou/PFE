import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import  { useState, useEffect } from 'react';
import axios from "axios";
import {Card,Col,Row,Button} from "react-bootstrap";
import {OverlayTrigger,Tooltip} from 'react-bootstrap'
import Popover from '@material-ui/core/Popover';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Pie from './Responsable/Dashbord/Pie.js';
import BarChart from './Responsable/Dashbord/BarChart.js';
import UserBehavior from './Responsable/Dashbord/UserBehavior.js';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  aa: {
    display: 'flex',
    alignItems: 'center',
    width: 200,
    height:'35px'
   }

}));

function getSteps() {
  return ["l'Ajoute du bulletin de la part du validateur", 'validation du responsable ', 'Ajouter avis medecin','Revalidation du responsable' ,'consulter Etat'];
}



export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [user,setUser] = useState([])
  const [bulletinsEtape1,setBulletinsEtape1] = useState([])
  const [bulletins,setBulletins] = useState([])
  const [bull,setBull] = useState([])
  const [numberBull,setNumberBull] = useState([])

  const [anchorEl, setAnchorEl] = React.useState(null);
  const  [searched,setSearched] = useState("")
  
  const[accepter,setAccepter] =useState([])
  const[numAccepter,setNumAccepter] =useState([])

  const[rejeter,setRejeter] = useState([])
  const[numRejeter,setNumRejeter] = useState([])

  const [visite,setVisite] = useState([])
  const [numVisite,setNumVisite] = useState([])

  const [autre,setAutre] = useState([])
  const [numAutre,setNumAutre] = useState([])


  const state = {
    labels: ['Accepté', 'Rejeter', 'Contre visite',
             'Autre'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4'
        ],
        hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
        ],
        data: [numAccepter, numRejeter, numVisite, numAutre]
      }
    ]
  }
  


  const handlePopoverOpen = (event,etape) => {
    if (etape == 2){
      setActiveStep(2)
    }else if (etape== 3){
      setActiveStep(3)
    }else if (etape== 4){
      setActiveStep(4)
    }else if (etape == 1 ){
      setActiveStep(1)
    }
    setAnchorEl(event.currentTarget);
  
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  useEffect(() => {
    const local = localStorage.getItem("user");
    setUser(JSON.parse(local)) 
    getAllBull();
    getEtatBull();
  }, [])

  const getAllBull = () => {
    const local = localStorage.getItem("user");

    axios.get('http://localhost:8080/getAllBullDashbord/'+JSON.parse(local).userName).then( res => {

      res.data.map(e => 
        bulletins.push(e),
      )
  } )
    axios.get('http://localhost:8080/getAlBullEtape1Byrecep/'+ JSON.parse(local).userName).then( result => {
        result.data.map(e => 
         ( bulletins.push(e),setNumberBull(bulletins.lenght))
        )

    
    } 
    
    )


}  


  

const requestSearch =
  bulletins.filter(r => { 

    return r.numBull.toString().includes(searched);
  })

 const getEtatBull = () =>{
  const local = localStorage.getItem("user");

  axios.get('http://localhost:8080/getAllBullRespMedEtape4/'+JSON.parse(local).userName).then( res => {
    res.data.map(e => 
      <div key={e.numBull}>
      {e.avis.avis == "Accepter" ? (accepter.push(e),setNumAccepter(accepter.length)): 
       e.avis.avis == "Rejeter" ?  ( rejeter.push(e),setNumRejeter(rejeter.length)):
       e.avis.avis == "Contre visite" ? (visite.push(e),setNumVisite(visite.length)):
       (autre.push(e),setNumAutre(autre.length))

    }</div>
    )
}

)

 }


  return (
    <div className="content">
      <UserBehavior/>

  <Card border="info" style={{ width: '20rem' }}  >
    <Card.Header style={{color:"white",fontSize:"17px"}} className="bg-info text-uppercase">
      <b> Consulter les etapes des bulletins</b>
    <br></br>
 
    <Paper  className={classes.aa} style={{marginLeft:"90px",marginBottom:"20px"}}>
      <IconButton className={classes.iconButton} aria-label="menu">
      </IconButton>
      <InputBase className={classes.input} placeholder="Rechercher ici ..."  value={searched} onChange={ e =>setSearched(e.target.value)}/>
      <IconButton  className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>

    
    </Card.Header>
    <Card.Body className="scrollbar2" id="style-7">
      <Card.Text >
   
         {requestSearch.map(b => (
          <div key={b.numBull} style={{ marginBottom:"4px",paddingBottom:"3px"}}>

      <Typography  aria-owns={open ? 'mouse-over-popover' : undefined} aria-haspopup="true" onMouseEnter={(event)=>handlePopoverOpen(event,b.etape)} onMouseLeave={handlePopoverClose}>

    <Button  variant="outline-info" style={{width:"250px",border:"none"}}>  <b>#{b.numBull}  </b>   </Button>
     </Typography>
      <Popover id="mouse-over-popover" className={classes.popover} classes={{   paper: classes.paper, }} open={open} anchorEl={anchorEl} anchorOrigin={{   vertical: 'top',   horizontal: 'right', }} transformOrigin={{   vertical: 'top',   horizontal: 'left', }} onClose={handlePopoverClose} disableRestoreFocus >
        <Typography>
  
        <Stepper activeStep={activeStep} alternativeLabel style={{ width:"450px"}}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper> 
      
        </Typography>
      </Popover>
    
          
          </div>
         )
     
        
          
     
     
          )}

       

      </Card.Text>
    </Card.Body>
  </Card>
<Row> <Col md={8}> 
<Pie />

</Col></Row>
<BarChart />
    </div>
  );
}