import React, { Component, PropTypes } from 'react';

import { Grid, Menu, Segment } from 'semantic-ui-react'

export default class SideList extends Component {
    constructor() {
        super();
        this.state = {
            active: FlowRouter.getParam('id')
        };
    }

    componentWillMount(){

    }
    isWorkerPage() {
      return FlowRouter._current.path.indexOf('workers') > -1
    }
    onClickHandler(id, ev) {
        this.id = id._str;
        this.setState({
          active: id._str
        });
        if(this.isWorkerPage()) {
          FlowRouter.go(`/bot/workers/${this.id}`);
        }else{
          FlowRouter.go(`/bot/controllers/${this.id}`);
        }

        this.props.handleBotChange(id._str);
    }

    getActive(active){
        return this.state.active === active._str;
    }

    render() {
        items = this.props.items;
        return (
            <Menu attached='top' tabular>
                {
                    _.map(items, (elem, index) => {
                        return (
                            <Menu.Item active={this.getActive(elem._id)} key={elem._id} name={elem.name} onClick={this.onClickHandler.bind(this, elem._id)}/>
                        )
                    })
                }
            </Menu>
        )
    }
}
