import React, {Component} from 'react'
import {Menu} from 'semantic-ui-react'

export default class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            activeItem: 'Home'
        }
    }
    render() {
        return (
            <Menu>
                <Menu.Item
                    name='editorials'
                    active={activeItem === 'editorials'}>
                    Editorials
                </Menu.Item>

                <Menu.Item
                    name='reviews'
                    active={activeItem === 'reviews'}>
                    Reviews
                </Menu.Item>

                <Menu.Item
                    name='upcomingEvents'
                    active={activeItem === 'upcomingEvents'}>
                    Upcoming Events
                </Menu.Item>
            </Menu>
        )
    }
}