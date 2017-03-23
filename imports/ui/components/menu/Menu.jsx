import React, {Component} from 'react'
import {Menu} from 'semantic-ui-react'
import Link,{ImageLink} from './MenuLink.jsx';
export default class Navbar extends Component {

    render() {
        return (
            <Menu>
                <ImageLink url="https://semantic-ui.com/images/logo.png"/>
                <Link text='Home' to='/'/>
            </Menu>
        )
    }
}