import Bots from './bot.js';
import { HTTP } from 'meteor/http';

Meteor.methods({
    'bot.get': (type) => {
        return Bots.find({
            type
        }).fetch();
    },
    'bot.get.ip': (ip) => {
        return Bots.findOne({
            ip
        });
    },
    'bot.get.id': (name) => {
        return Bots.findOne({
            name
        });
    },
    'bot.getAll': () =>{
      return Bots.find({}).fetch();
    },
    'bot.worker.getStatus': (ip) => {
      const result = HTTP.call('GET', `http://${ip}:4000/api/getStatus`);
      return result;
    },
    'bot.controller.getStatus': (ip) => {
      const result = HTTP.call('GET', `http://${ip}:3000/api/getStatus`);
      return result;
    }
})
