import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import  { useState, useEffect,useRef } from 'react';
import {Table,Popover,Overlay,Button} from "react-bootstrap"
import axios from "axios";
import moment from 'moment';
import UsersList from 'views/Medecin/BullMed';
import 'moment/locale/fr';
import { Link } from "react-router-dom";
import {Doughnut} from 'react-chartjs-2';
import Avatar from '@material-ui/core/Avatar';



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

  paper: {
    padding: theme.spacing(1),
  },


}));




export default function UserBehavior() {
  const classes = useStyles();
  const [user,setUser] = useState([])
  const [UsersList,setUsersList] = useState([])
  const [numberUsers,setNumberUsers]=useState()


  moment.locale('fr');

  //popover
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [userName,setUserName] = useState()
  const [bullValide,setBullValide]=useState([])
  const [bullNonValide,setBullNonValide]=useState([])
  const[bullValide2,setBullValide2]= useState([])
  const[bullValideEtape4,setBullValideEtape4]= useState([])
  const [role,setRole] = useState([])
  const[numNonValide,setNumNonValide]=useState(0)
  const ref = useRef(null);

  const medecin = {
    labels: [
      'En attente',
      'Terminer',
      
    ],
    datasets: [{
     
      data: [bullNonValide.length,bullValide.length+bullValide2.length],
      backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ],
      hoverBackgroundColor: [ 
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ]
    }]
  };
  const validateur = {
    labels: [
      'En attente',
      'Terminer',
      
    ],
    datasets: [{
     
      data: [bullNonValide.length,bullValide.length+bullValide2.length],
      backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ],
      hoverBackgroundColor: [ 
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ]
    }]
  };
  const handleClick = (event,user,role) => {
    setUserName(user);
     getInfo(user,role);

    console.log(bullValide)
     setTarget(event.target);
     setShow(!show);

  };


  useEffect(() => {
    const local = localStorage.getItem("user");
    setUser(JSON.parse(local)) 
    getAllUsers();
setBullValide(bullValide)
  }, [])


  const getAllUsers = () =>{
    const local = localStorage.getItem("user");
  
    axios.get('http://localhost:8080/getAllUsers').then( res => {
      console.log(res.data)
      res.data.map(e => 
        <div key={e.id}>
        {e.role != "responsable" ? 
      ( UsersList.push(e), setNumberUsers(UsersList.length) ): false}
        </div>
      )}) }



      const getInfo = (u,role) =>{

        const local = localStorage.getItem("user");
        setRole(role)
        axios.get('http://localhost:8080/getAllBullMedEtape2/' + u).then( res => {
          setBullNonValide([])
          res.data.map(e => 
            <div key={e.numBull}>
            {moment(e.date).isBetween(  moment().subtract(7, 'days'), moment()) == true? 
                (    setBullNonValide(prevState => [...prevState, e]))

            :false}</div>
          )
      })

      axios.get('http://localhost:8080/getBullMedEtape4/' + u).then( result => {
         setBullValide([]);
         result.data.map(e => 
            <div key={e.numBull}>  
           { moment(e.date).isBetween(  moment().subtract(10, 'days'), moment()) == true? 
                (    setBullValide(prevState => [...prevState, e]))
               :false}</div>
  )
})
     

      axios.get('http://localhost:8080/getBullMedEtape3/' + u).then( result => {
        setBullValide2([]);

        result.data.map(e => 
          <div key={e.numBull}>  
          { moment(e.date).isBetween(  moment().subtract(10, 'days'), moment()) == true? 
               (    setBullValide2(prevState => [...prevState, e]))
              :false}</div>
        )
  
    })

    }


  return (
    <div className="" ref={ref}>
<Table responsive hover className="bg-white  p-5  ">
  <thead>
    <tr>
      <th scope="col">#</th>
     
        <th >Nom d'utilisateur</th>
        <th >Role</th>

        <th >Status</th>
        <th >Performance</th>

    </tr>
  </thead>
  <tbody>

 { UsersList.map (( u,index) => 
    <tr> 
      <td>  <Avatar style={{backgroundColor : u.couleur,fontSize:13,width:"27px",height:"27px"}} className="text-uppercase shadow">    { u.nom.substr(0, 1) +u.prenom.substr(0, 1) }</Avatar></td>
   
        <td>{u.userName} </td>

        <td>{u.role} </td>

        {u.connecte == true ?
        <td > <span className="bg-success border text-light p-1 px-2 shadow  rounded "> En ligne </span></td> :
        (u.lastconnect == null && u.connecte == null) ? 
        <td>Hors ligne </td> :
        (u.lastconnect == "" && u.connecte == false) ? 
        <td>Hors ligne </td> :
        <td>Hors ligne  <small>(il y'a {moment(u.lastConnect).fromNow()}) </small>  </td>
        }
        <td> <Button onClick={(event) =>{   
; handleClick(event,u.userName,u.role)}}
> Cliquer ici </Button> </td>
     
    </tr>)}

  </tbody>
</Table>





{role == "medecin" ?
<Overlay
        show={show}
        target={target}
        placement="bottom"
        containerPadding={50}
      >
        <Popover id="popover-contained">
          <Popover.Title as="h3">Perfermonce du travail dans cette semmaine</Popover.Title>
          <Popover.Content>
           
            <Doughnut data={medecin} />
            <small> les bulletins encore en attente</small>
      {bullNonValide.map(b =>
      <span key={b.numBull}>
        <li>  {b.numBull} </li>
        
         </span>
        )}
          </Popover.Content>
        </Popover>
      </Overlay> :
      
      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref.current}

        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Title as="h3">Perfermonce du travail dans cette semmaine</Popover.Title>
          <Popover.Content>
           
            <Doughnut data={validateur} />
     
          </Popover.Content>
        </Popover>
      </Overlay>
      
      }
    </div>
  );
}