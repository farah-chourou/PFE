import React,{ Component } from 'react';
import axios from 'axios';
import {Card,CardHeader,CardBody,CardTitle,Table,Row,Col,} from "reactstrap";

 class BulletinNotif extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            id: this.props.match.params.id,
            notif:[],
            bull:[],
            expediteur:[],

        }
    }
    

componentDidMount(){
   this.getBull();
   this.updateEtatNotif();

}


  getBull=()=>{
      axios.get('http://localhost:8080/getNotif/'+this.state.id).then(res => { 
      console.log(res.data);
      {res.data.suivisBull == null ? 
      this.setState({
          notif:res.data,
          bull:res.data.suivisBullMed,
          expediteur:res.data.suivisBullMed.expediteur, 
      })
      :  this.setState({
        notif:res.data,
        bull:res.data.suivisBull,
        expediteur:res.data.suivisBull.expediteur, 
    })

    }
    })
  }


updateEtatNotif=() =>{
axios.put(' http://localhost:8080/updateNotif/' + this.state.id).then(res => {

})
 
}

    render() {
        return (
         
       <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Bulletin</CardTitle>
                
                </CardHeader>
                <CardBody>
                  <Table >

                    
                    <thead className="text-primary">
                      <tr>
                        <th>Num Bulletin</th>
                        <th>date</th>
                        <th>Specialite Med</th>
                        <th>Envoyer par</th>
                        <th>Etape</th>
                        <th >Etat</th>
                      </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <th>{this.state.bull.numBull}</th>
                        <th>{this.state.bull.date}</th>
                        <th>{this.state.bull.specialiteMed}</th>
                      <th>{this.state.expediteur.userName}</th>
                        <th>{this.state.bull.etape}</th>
                        <th > <div className="etat">  {this.state.bull.etat}</div> </th>
                      </tr>
                      
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col> </Row>

            </div>
        )
    }
}
export default BulletinNotif;