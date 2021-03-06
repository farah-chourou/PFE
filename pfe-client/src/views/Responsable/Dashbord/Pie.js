import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import  { useState, useEffect } from 'react';
import axios from "axios";
import { Line, Pie } from "react-chartjs-2";
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '150%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
 

}));




export default function Piee() {
  const classes = useStyles();
  const [user,setUser] = useState([])


  
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
          '#185fad',
          '#d64161',
          '#feb236',
          '#95caf8',
          '#6800B4'
        ],
        hoverBackgroundColor: [
        '#0E529E',
        '#F51447',
        '#FCA820',
        '#72cee3',
        '#35014F'
        ],
        data: [numAccepter, numRejeter, numVisite, numAutre]
      }
    ]
  }
  


  useEffect(() => {
    const local = localStorage.getItem("user");
    setUser(JSON.parse(local)) ;
 
    getEtatBull();
  }, [])

  


 const getEtatBull = () =>{
  const local = localStorage.getItem("user");

  axios.get('http://localhost:8080/getAllBullRespMedEtape4/'+JSON.parse(local).userName).then( res => {

    const start =  moment().startOf('month').subtract(1,"days");
    const end= moment().endOf('month').add(1,"days");
    res.data.map(e => 
      <div key={e.numBull}>
      {(e.avis.avis == "Accepté"&& moment(e.date).isBetween(  start, end) == true) ? (accepter.push(e),setNumAccepter(accepter.length)): 
       (e.avis.avis == "Rejeté" && moment(e.date).isBetween(  start, end) == true)?  ( rejeter.push(e),setNumRejeter(rejeter.length)):
      ( e.avis.avis == "Contre visite"&& moment(e.date).isBetween(  start, end) == true) ? (visite.push(e),setNumVisite(visite.length)):
      
       ( moment(e.date).isBetween(  start, end) == true) ? (autre.push(e),setNumAutre(autre.length))
       :false

    }</div>
    )
}

)

 }


  return (
    <div >

        <Pie
          data={state}
          options={{
            title:{
              display:false,
              fontSize:20
            },
            legend:{
              display:false,
              position:'right'
            }
          }}
        />


    </div>
  );
}