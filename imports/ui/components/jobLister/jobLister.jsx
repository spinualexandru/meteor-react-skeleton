import React, { Component, PropTypes } from 'react';
import { Icon, Table, Button, Modal, Image, Header } from 'semantic-ui-react';
import moment from 'moment';
import WorkerStats from '../workerStats/workerStats.jsx';

export default class JobList extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      PAGE_ID: props.ip
    }
  }

  loadQueue() {
    Meteor.call('peopleQueue.get', this.props.ip, function(err, data) {
      if(data) {
        this.setState({
          queries: data
        });
      }
    }.bind(this))
  }

  componentWillMount(){
    this.loadQueue();
  }

  onDelete(id, ev) {
    Meteor.call('peopleQueue.remove', id, (err, data)=>{
      Meteor.call('peopleQueue.get', this.props.ip, function(err, data) {
        if(data) {
          this.setState({
            queries: data
          });
        }
      }.bind(this))
    });
  }
  render() {
    const queries = this.state.queries;
    return (
      <div>
      { queries &&
      <WorkerStats data={queries}/>
    }
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>University Code</Table.HeaderCell>
              <Table.HeaderCell>LinkedIn URL</Table.HeaderCell>
              <Table.HeaderCell>Candidate Name</Table.HeaderCell>
              <Table.HeaderCell>Queued At</Table.HeaderCell>
              <Table.HeaderCell>Finished At</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
          {
            _.map(queries, (elem, index) =>{
              return (
                  <Table.Row key={elem._id}>

                    {
                      elem.status === "accepted" ?
                      <Table.Cell positive>
                        <Icon name='checkmark' />
                          Completed
                        </Table.Cell>
                        :
                        <Table.Cell negative>
                            Pending
                        </Table.Cell>
                    }
                    <Table.Cell>{elem.universityCode}</Table.Cell>
                    <Table.Cell>{elem.url}</Table.Cell>
                    <Table.Cell>{elem.name}</Table.Cell>
                    <Table.Cell>{moment(elem.insertedAt).format('MMMM Do YYYY, h:mm:ss a')}</Table.Cell>
                    <Table.Cell>{moment(elem.acceptedAt).format('MMMM Do YYYY, h:mm:ss a')}</Table.Cell>
                    <Table.Cell>  <Button.Group size='tiny'>
                                    <Button onClick={this.onDelete.bind(this, elem._id._str)}>Delete</Button>
                                    <Button.Or />
                                    <Modal trigger={<Button>Show Screenshots</Button>}>
                                    <Modal.Header>Select a Photo</Modal.Header>
                                    <Modal.Content image>

                                      <Modal.Description>
                                        <Header>Login</Header>
                                        <Image wrapped size='large' src={`http://${elem.bot}:4000/proof/${elem.imgFolder && elem.imgFolder.split('\n').reverse()[1]}/1.png`} />
                                        <Header>Message Adding</Header>
                                        <Image wrapped size='large' src={`http://${elem.bot}:4000/proof/${elem.imgFolder && elem.imgFolder.split('\n').reverse()[1]}/2.png`} />
                                        <Header>After add</Header>
                                        <Image wrapped size='large' src={`http://${elem.bot}:4000/proof/${elem.imgFolder && elem.imgFolder.split('\n').reverse()[1]}/3.png`} />

                                      </Modal.Description>
                                    </Modal.Content>
                                  </Modal>
                                  </Button.Group>
                    </Table.Cell>
                  </Table.Row>
              )
            })
          }
          </Table.Body>
        </Table>
        </div>
      );
  }
}
