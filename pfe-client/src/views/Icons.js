import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import  { useState, useEffect } from 'react';
import axios from "axios";
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
  const [bulletinsEtape2,setBulletinsEtape2] = useState([])
  const [bulletinsEtape3,setBulletinsEtape3] = useState([])
  const [bulletinsEtape4,setBulletinsEtape4] = useState([])


  useEffect(() => {
    const local = localStorage.getItem("user");
    setUser(JSON.parse(local)) 
    getAllBull();
  }, [])

  const getAllBull = () => {
    const local = localStorage.getItem("user");

    axios.get('http://localhost:8080/getAllBullEtape1').then( res => {
        const local = localStorage.getItem("user");

        console.log(res.data)
        setBulletinsEtape1(res.data)
    
    
    }  )

    axios.get('http://localhost:8080/getAlBullMedEtape2/'+JSON.parse(local).userName).then( resu => {
      const local = localStorage.getItem("user");

      console.log(resu.data)
      setBulletinsEtape2(resu.data)
  
  
  }  )

  axios.get('http://localhost:8080/getAllBullRespMedEtape3/' +JSON.parse(local).userName).then( res => {
    const local = localStorage.getItem("user");

    console.log(res.data)
    setBulletinsEtape3(res.data)


}  )
   
axios.get('http://localhost:8080/getAllBullRespMedEtape4/'+JSON.parse(local).userName).then( res => {
  const local = localStorage.getItem("user");

  console.log(res.data)
  setBulletinsEtape4(res.data)


}  )
       
  
  }  


  


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };


  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root} className="content">
        {console.log(bulletinsEtape1)}
        {console.log(bulletinsEtape2)}
        {console.log(bulletinsEtape3)}
        {console.log(bulletinsEtape4)}

{bulletinsEtape1.map((e) => ( 
<div key={e.numBull}> 
 {e.numBull}
 
   <Stepper activeStep={0} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      </div>
))}
{bulletinsEtape2.map((e) => ( 
<div key={e.numBull}> 
 {e.numBull}
 
   <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      </div>
))}

       <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <div>
            
              <Button variant="contained" color="primary" onClick={handleNext}>
                c
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}