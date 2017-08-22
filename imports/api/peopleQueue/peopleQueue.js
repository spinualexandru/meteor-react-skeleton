import { Mongo } from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const peopleQueue = new Mongo.Collection('people');
const schema = new SimpleSchema({
    _id: {
        type: String,
    },
    name: {
        type: String,
    },
    bot: {
        type: String,
    },
    name: {
      type: String
    },
    nameBot: {
      type: String
    },
    status: {
      type: String
    },
    universityCode: {
      type: String
    },
    url: {
      type: String
    },
    insertedAt: {
      type: Date
    },
    acceptedAt: {
      type: Date
    }
});
peopleQueue.attachSchema(schema);
import './methods.js';
export default peopleQueue;
