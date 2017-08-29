import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

const App = ({main, routeProps, user}) => {
    return (
        <div id="app">
            {React.createElement(main, routeProps)}
        </div>
    )
}

export default createContainer((props) => {
    const user = Meteor.user();
    
    return _.extend(props, {user});
}, App);