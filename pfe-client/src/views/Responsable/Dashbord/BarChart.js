import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import  { useState, useEffect } from 'react';
import axios from "axios";
import { Bar} from "react-chartjs-2";
import moment from 'moment';

const colors = ['#185fad', '#d64161', '#feb236', '#95caf8', '#82caf8', '#6b5b95'];
const options = {
    layout: {
      padding: {
        bottom: 0,
        top: 0
      }
    },
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          display: false
        },
      }],
      yAxes: [{
        stacked: true,
          }],
    },
        responsive: true,
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              fontColor: '#91929b',
              padding: 20
            }
          }
        };


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


}));



export default function BarChart() {
  const classes = useStyles();
  const [user,setUser] = useState([])
  
  const [lastWeek,setLastWeek] =useState("")
  const [lasttWeek,setLasttWeek] =useState("")
  const [lastttWeek,setLastttWeek] =useState("")
  const [lasttttWeek,setLasttttWeek] =useState("")

  const[accepterLastWeek,setAccepterLastWeek] =useState([])
  const[numAccepter,setNumAccepter] =useState()
  const[accepterLasttWeek,setAccepterLasttWeek] =useState([])
  const[accepterLastttWeek,setAccepterLastttWeek] =useState([])
  const[accepterLasttttWeek,setAccepterLasttttWeek] =useState([])

  const[rejeterLastWeek,setRejeterLastWeek] = useState([])
  const[rejeterLasttWeek,setRejeterLasttWeek] = useState([])
  const[rejeterLastttWeek,setRejeterLastttWeek] = useState([])
  const[rejeterLasttttWeek,setRejeterLasttttWeek] = useState([])
  const[numRejeter,setNumRejeter] = useState()

  const [visiteLastWeek,setVisiteLastWeek] = useState([])
  const [visiteLasttWeek,setVisiteLasttWeek] = useState([])
  const [visiteLastttWeek,setVisiteLastttWeek] = useState([])
  const [visiteLasttttWeek,setVisiteLasttttWeek] = useState([])
  const [numVisite,setNumVisite] = useState()

  const [autreLastWeek,setAutreLastWeek] = useState([])
  const [autreLasttWeek,setAutreLasttWeek] = useState([])
  const [autreLastttWeek,setAutreLastttWeek] = useState([])
  const [autreLasttttWeek,setAutreLasttttWeek] = useState([])
  const [numAutre,setNumAutre] = useState()


  useEffect(() => {
    const local = localStorage.getItem("user");
    setUser(JSON.parse(local)) 
    setLastWeek(moment().subtract(7, 'days').format('L'))
    setLasttWeek(moment().subtract(14, 'days').format('L'))
    setLastttWeek(moment().subtract(21, 'days').format('L'))
    setLasttttWeek(moment().subtract(28, 'days').format('L'))

    getEtatBull();
  }, [])



  const getEtatBull = () =>{
    const local = localStorage.getItem("user");
  //moment(e.date).format('L').isBetween( lastWeek, moment().format('L')) 
    axios.get('http://localhost:8080/getAllBullRespMedEtape4/'+JSON.parse(local).userName).then( res => {
      const week1=  moment().startOf('month').add(7,'days');
      const week2=  moment().startOf('month').add(14,'days');
      const week3=  moment().startOf('month').add(21,'days');
      const start =  moment().startOf('month').subtract(1,"days");
      const end= moment().endOf('month').add(1,"days");
    res.data.map(e => 
        <div key={e.numBull}>
            
       {(e.avis.avis == "Accepté" && moment(e.date).isBetween(  week3, end) == true)? (accepterLastWeek.push(e),setNumAccepter(accepterLastWeek.length)): 
        (e.avis.avis == "Accepté" && moment(e.date).isBetween(  week2, week3) == true)? (accepterLasttWeek.push(e),setNumAccepter(accepterLastWeek.length)): 
        (e.avis.avis == "Accepté" && moment(e.date).isBetween( week1,week2) == true)? (accepterLastttWeek.push(e),setNumAccepter(accepterLastWeek.length)): 
        (e.avis.avis == "Accepté" && moment(e.date).isBetween(start, week1) == true)? (accepterLasttttWeek.push(e),setNumAccepter(accepterLastWeek.length)): 

        (e.avis.avis == "Rejeté" && moment(e.date).isBetween( week3, end) == true)? (rejeterLastWeek.push(e),setNumRejeter(rejeterLastWeek.length)): 
        (e.avis.avis == "Rejeté" && moment(e.date).isBetween(   week2, week3) == true)? (rejeterLasttWeek.push(e),setNumRejeter(rejeterLastWeek.length)): 
        (e.avis.avis == "Rejeté" && moment(e.date).isBetween(   week1,week2) == true)? (rejeterLastttWeek.push(e),setNumRejeter(rejeterLastWeek.length)): 
        (e.avis.avis == "Rejeté" && moment(e.date).isBetween( start, week1) == true)? (rejeterLasttttWeek.push(e),setNumRejeter(rejeterLastWeek.length)): 

        (e.avis.avis == "Contre visite" && moment(e.date).isBetween( week3, end) == true)? (visiteLastWeek.push(e),setNumVisite(rejeterLastWeek.length)): 
        (e.avis.avis == "Contre visite" && moment(e.date).isBetween(  week2, week3) == true)? (visiteLastWeek.push(e),setNumVisite(rejeterLasttWeek.length)): 
        (e.avis.avis == "Contre visite" && moment(e.date).isBetween( week1,week2) == true)? (visiteLastWeek.push(e),setNumVisite(rejeterLastttWeek.length)): 
        (e.avis.avis == "Contre visite" && moment(e.date).isBetween( start, week1)  == true)? (visiteLastWeek.push(e),setNumVisite(rejeterLasttttWeek.length)): 

         moment(e.date).isBetween(week3, end) == true? (autreLastWeek.push(e),setNumAutre(autreLastWeek.length)): 
        ( moment(e.date).isBetween( week2, week3) == true)? (autreLasttWeek.push(e),setNumAutre(autreLasttWeek.length)): 
        ( moment(e.date).isBetween(week1,week2) == true)? (autreLastttWeek.push(e),setNumAutre(autreLastttWeek.length)): 
        ( moment(e.date).isBetween( start, week1) == true)? (autreLasttttWeek.push(e),setNumAutre(autreLasttttWeek.length)):
        false

     
  
      }</div>
      )
  }
  
  )
  
   }

  const chartData = {
    labels: ["1ére semaine" ,"2éme semaine", "3éme semaine", "4éme semaine"],
    datasets: [{
        label: 'Accepté',
        data: [accepterLasttttWeek.length, accepterLastttWeek.length, accepterLasttWeek.length, accepterLastWeek.length],
        stack:'1',
        backgroundColor: colors[0],
        borderWidth: 0
      },
      {
        label: 'Rejeté',
        stack: '2',
        data: [rejeterLasttttWeek.length, rejeterLastttWeek.length,rejeterLasttWeek.length, rejeterLastWeek.length],
        backgroundColor: colors[1],
        borderWidth: 0
      },
      
      {
        label: 'Contre Visite',
        data: [visiteLasttttWeek.length, visiteLastttWeek.length, visiteLasttWeek.length, visiteLastWeek.length],
        backgroundColor: colors[2],
        borderWidth: 0,
        stack: '3'
      },
      {
        label: 'Autre',
        data: [autreLasttttWeek.length, autreLastttWeek.length, autreLasttWeek.length, autreLastWeek.length],
        backgroundColor: colors[3],
        borderWidth: 0,
        stack: '4',
      },
   
    ]
  };

  return (
    <div className="content">
<Bar 
        data={chartData}
        options={options}
        width={700}
        height={350} />
    </div>
  );
}