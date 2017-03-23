import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Navbar from '/imports/ui/components/menu/Menu.jsx';

const App = ({main, routeProps, user}) => {
    return (
        <div id="app">
            <Navbar />
            {React.createElement(main, routeProps)}
        </div>
    )
}

export default createContainer((props) => {
    const user = Meteor.user();
    
    return _.extend(props, {user});
}, App);