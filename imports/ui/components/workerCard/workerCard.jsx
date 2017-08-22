import React, {Component, PropTypes} from 'react';
import { Grid, Menu, Segment, Item, Card, Button, Loader, Dimmer } from 'semantic-ui-react';

export default class WorkerCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    Meteor.call('bot.get.ip', this.props.ip, (err,data) =>{
      this.setState({
        data
      })
    });
    Meteor.call('bot.worker.getStatus', this.props.ip, (err,data) =>{
        this.setState({
          botStatus: data
        })
    });
  }

  onDetailedClick(data, ev) {
    FlowRouter.go('/bot/workers/'+data._str)
  }
  onVPNclick(data, ev) {
    var win = window.open(`https://${data}:943`,'_blank');
    win.focus();
  }

  onToggleStatus() {
    Meteor.call('bot.worker.getStatus', this.props.ip, (err,data) =>{
      const status = data.content === "true";
      const newStatus = !status;
      HTTP.call('POST', `http://${this.props.ip}:4000/api/setStatus`,{
        data:{
          status: newStatus
        }
      }, (errr, dataa)=>{
        this.setState({
          botStatus: dataa
        })
      })

    });
  }
  render() {
    const data = this.state.data;
    const status = this.state.botStatus;
    if(data){
      return (
        <Card>
          <Card.Content>
            <Card.Header>
              {data.name} <Button basic color='green' onClick={this.onVPNclick.bind(this, this.state.data.ip)}>Go to VPN</Button>
            </Card.Header>
            <Card.Meta>
              Worker
            </Card.Meta>
            <Card.Description>
              Use some of the tools below to control the worker.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green' onClick={this.onDetailedClick.bind(this, this.state.data._id)}>Detailed View</Button>
              { status && status.content === 'false' ?
                  <Button basic color='red' onClick={this.onToggleStatus.bind(this)}>Pause</Button>
                  :
                  <Button basic color='green' onClick={this.onToggleStatus.bind(this)}>Resume</Button>
              }


            </div>
          </Card.Content>
        </Card>
      )
    }else{
      return(
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      )
    }

  }
}
