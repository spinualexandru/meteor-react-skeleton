import React, {Component, PropTypes} from 'react';
import {Grid, Accordion} from 'semantic-ui-react'
import faker from 'faker'
// Task component - represents a single todo item
export default class Home extends Component {
    render() {
        const colors = [
            'red',
            'orange',
            'yellow',
            'olive',
            'green',
            'teal',
            'blue',
            'violet',
            'purple',
            'pink',
            'brown',
            'grey',
            'black'
        ]
        const panels = _.times(3, () => ({
            title: faker
                .lorem
                .sentence(),
            content: faker
                .lorem
                .paragraphs()
        }))
        return (
            <div>
                <Grid columns="1">
                    <Accordion panels={panels} />
                </Grid>
            </div>

        );
    }
}

Home.propTypes = {};