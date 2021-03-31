
import React from "react";
import axios from "axios";
import {  Link } from "react-router-dom";


class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
      user:[],
      notificationsNonLu:[],
      notificationsLu:[],

      expediteurNotif:[],
      number:"",
      showHideNotif: true,


    };

   
    this.getBull =this.getBull.bind(this);
   

  }

  componentDidMount() {
    const local = localStorage.getItem("user");
    console.log(JSON.parse(local));


    this.setState({
      user: JSON.parse(local),


    })
    this.getNotification();


  }



 getNotification =() =>{
    axios.get('http://localhost:8080/getNotif').then(res => {
      console.log(res.data);
      res.data.map(e => 
        <div key={e.id}>
        { ( e.recepteur == this.state.user.userName && e.etat == false )? 

        ( this.state.notificationsNonLu.push(e),
        this.setState({
          number: this.state.notificationsNonLu.length
        }) )
      
        :false  }

        </div>
        )
      
      
        res.data.map(e => 
          <div key={e.id}>
          { ( e.recepteur == this.state.user.userName && e.etat == true )? 
  
          ( this.state.notificationsLu.push(e),
          this.setState({
          }) )
        
          :false  }
  
          </div>
          )
      
      
      })

   

  }

  getBull = (id) => {
    this.props.history.push('/user/soloBulletin'+id);
    window.location.reload(false);

  }




  render() {
    return (
      <>
        <div className="content">
<div> 
  <b> Non Lu</b>
        {this.state.notificationsNonLu.length == 0 ?  <div className="text-center small"> No notification avaible  </div>
         : this.state.notificationsNonLu.map( R => 

        <div  className="border border-muted " onClick={()=> this.getBull(R.id)} key={R.id}> 
      
        <div className="font-weight-bold text-uppercase"> {R.expediteurNotif.userName} </div>
         <div> {R.message}  </div> 
         <small className=" text-secondary">  envoyer le  {R.date} </small>  
        </div>
        )}

</div>

<div> 
      <b> Lu</b>
         { this.state.notificationsLu.map( R => 

        <div  className="border border-muted " onClick={()=> this.getBull(R.id)} key={R.id}> 
      
        <div className="font-weight-bold text-uppercase"> {R.expediteurNotif.userName} </div>
         <div> {R.message}  </div> 
         <small className=" text-secondary">  envoyer le  {R.date} </small>  
        </div>
        )}

</div>





        </div>
      </>
    );
  }
}

export default Notifications;
