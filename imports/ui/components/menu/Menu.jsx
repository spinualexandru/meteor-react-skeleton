import React, {Component} from 'react'
import {Menu} from 'semantic-ui-react'
import Link,{ImageLink} from './MenuLink.jsx';
export default class Navbar extends Component {

    render() {
        return (
            <Menu pointing secondary>
                <Link text='Home' to='/'/>
                <Link text='Controllers' to='/bot/controllers'/>
                <Link text='Workers' to='/bot/workers'/>
            </Menu>
        )
    }
}
