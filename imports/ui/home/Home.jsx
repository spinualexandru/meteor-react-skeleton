import React, {Component, PropTypes} from 'react';
import { Grid, Menu, Segment, Item, Card, Button, Header } from 'semantic-ui-react'
import WorkerCard from '../components/workerCard/workerCard.jsx';
import ControllerCard from '../components/controllerCard/controllerCard.jsx';

import faker from 'faker'
// Task component - represents a single todo item
export default class Home extends Component {
  constructor(){
    super();
    this.state = {
      workers: [],
      controllers: []
    }
  }
  componentWillMount(){
    Meteor.call('bot.get', 'worker', (err, data) => {
      this.setState({
        workers: data
      })
    });
    Meteor.call('bot.get', 'controller', (err, data) => {
      this.setState({
        controllers: data
      })
    });
  }
    render() {
    const workers = this.state.workers;
    const controllers = this.state.controllers;
        return (
            <div>
      <Grid>
        <Grid.Column width={16}>
        <Header as='h2'>
          Workers
          <Header.Subheader>
            Here is a quick view of the workers and some tools available for it
          </Header.Subheader>
        </Header>
          <Card.Group>
          { workers && workers.length > 0 &&
            _.map(workers, (elem, key) => {
              return (<WorkerCard key={elem.ip} ip={elem.ip}/>);
            })
          }
          </Card.Group>
        </Grid.Column>
        <Grid.Column width={16}>
        <Header as='h2'>
          Controllers
          <Header.Subheader>
            Here is a quick view of the controllers and some tools available for it
          </Header.Subheader>
        </Header>
          <Card.Group>
          { controllers && controllers.length > 0 &&
            _.map(controllers, (elem, key) => {
              return (<ControllerCard key={elem.ip} ip={elem.ip}/>);
            })
          }
          </Card.Group>
        </Grid.Column>
      </Grid>
            </div>

        );
    }
}

Home.propTypes = {};
