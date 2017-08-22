import { Mongo } from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const botQueries = new Mongo.Collection('botqueries');
const schema = new SimpleSchema({
    _id: {
        type: String,
    },
    name: {
        type: String,
    },
    ip: {
        type: String,
    },
    controllerName: {
      type: String
    },
    controllerIp: {
      type: String
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    status: {
      type: String
    },
    universityCode: {
      type: String
    },
    url: {
      type: String
    }
});
botQueries.attachSchema(schema);
import './methods.js';
export default botQueries;
