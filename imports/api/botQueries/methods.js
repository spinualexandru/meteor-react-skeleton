import BotQueries from './botQueries.js';
import { HTTP } from 'meteor/http';

Meteor.methods({
  'botQuery.get': (ip) => {
    return BotQueries.find({
      controllerIp: ip
    }, {sort: {insertedAt: -1, status: 1}}).fetch();
  },
  'botQuery.remove': (id) =>{
    return BotQueries.remove({
      _id: new Mongo.ObjectID(id)
    });
  }
})
