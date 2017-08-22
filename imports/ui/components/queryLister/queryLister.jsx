import React, { Component, PropTypes } from 'react';
import { Icon, Table, Button } from 'semantic-ui-react';
import moment from 'moment';
export default class QueryList extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      PAGE_ID: props.ip,
      queries: []
    }
  }
  loadQueue() {
    Meteor.call('botQuery.get', this.props.ip, function(err, data) {
      if(data) {
        this.setState({
          queries: data
        });
      }
    }.bind(this))
  }
  onDelete(id, ev) {
    Meteor.call('botQuery.remove', id, (err, data)=>{
      Meteor.call('botQuery.get', this.props.ip, function(err, data) {
        if(data) {
          this.setState({
            queries: data
          });
        }
      }.bind(this))
    });
  }
  componentWillMount(){
    this.loadQueue();
  }
  render() {
    const queries = this.state.queries;
    console.log(queries);
    return (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>University Code</Table.HeaderCell>
              <Table.HeaderCell>LinkedIn URL</Table.HeaderCell>
              <Table.HeaderCell>Worker Name</Table.HeaderCell>
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
                      elem.status === "complete" ?
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
                    <Table.Cell>{moment(elem.finishedAt).format('MMMM Do YYYY, h:mm:ss a')}</Table.Cell>
                    <Table.Cell>
                                    <Button onClick={this.onDelete.bind(this, elem._id._str)}>Delete</Button>
                    </Table.Cell>
                  </Table.Row>
              )
            })
          }
          </Table.Body>
        </Table>
      );
  }
}
