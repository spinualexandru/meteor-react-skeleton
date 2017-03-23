import React, {Component} from 'react';
import {Menu} from 'semantic-ui-react';
import route from '/imports/routing/router.js';

export default class Link extends Component{
    isActive(){
        const path = FlowRouter.current().path;
        if(path === this.props.to){
            return true;
        }
        return false;
    }
    redirectTo(){
        route.go(this.props.to);
    }
    render(){
        return(
             <Menu.Item
                    name='upcomingEvents'
                    active={this.isActive()}
                    onClick={this.redirectTo.bind(this)}
                    >
                    {this.props.text}
                </Menu.Item>
        )
    }
}

export class ImageLink extends Link{
    redirectTo(){
        route.go(this.props.to);
    }
    render(){
        return(
             <Menu.Item
                    name='upcomingEvents'
                    onClick={this.redirectTo.bind(this)}
                    >
                    <img src={this.props.url}/>
                </Menu.Item>
        )
    }
}