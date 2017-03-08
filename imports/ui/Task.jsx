import React, { Component, PropTypes } from 'react';
import { Button } from 'semantic-ui-react'
// Task component - represents a single todo item
export default class Task extends Component {
    render() {
        return (
            <li>{this.props.task.text}
                <Button primary>
                    Click There
  </Button></li>

        );
    }
}

Task.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    task: PropTypes.object.isRequired,
};  