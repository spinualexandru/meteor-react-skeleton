import React, {Component, PropTypes} from 'react';

export default class Home extends Component {
  constructor(){
    super();
    this.state = {
      loading: false
    }
  }

    render() {
        return (
            <div>
      Hello world!
            </div>

        );
    }
}

Home.propTypes = {};
