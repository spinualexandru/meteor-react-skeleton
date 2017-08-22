import React, { Component, PropTypes } from 'react';
import { Segment, Statistic, Button, Icon } from 'semantic-ui-react';

export default class WorkerStats extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false
    }
  }
  // active queries
  // finished queries
  // total extracted public profiles
  // total sent
  // total error
  // total queued
  getPendingQueries() {
    // Active queries
    return _.where(this.props.data, {status: 'pending'}).length;
  }

  getCompletedQueries() {
    return _.where(this.props.data, {status: 'accepted'}).length;
  }

  getRemainingTime() {
    return this.getPendingQueries() * 7;
  }

  render() {
    return(
      <Segment inverted>
        <Statistic size='mini' inverted value={this.getPendingQueries()} label='Pending People' />
        <Statistic size='mini' inverted value={this.getCompletedQueries()} label='Added People' />
        <Statistic size='mini' inverted value={this.getRemainingTime()} label='Est. Time Remaining(min)' />
      </Segment>
    );
  }
}
