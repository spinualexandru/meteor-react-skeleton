import peopleQueue from './peopleQueue.js';
import { HTTP } from 'meteor/http';

Meteor.methods({
  'peopleQueue.get': (ip) => {
    return peopleQueue.find({
      bot: ip
    },{sort: {insertedAt: -1, status: 1}}).fetch();
  },
  'peopleQueue.remove': (id) =>{
    return peopleQueue.remove({
      _id: new Mongo.ObjectID(id)
    });
  }
})
