import { Mongo } from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const bots = new Mongo.Collection('bots');
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
    username: {
        type: String,
    },
    username: {
        type: String,
    },
    type: {
        type: String,
    }
});
bots.attachSchema(schema);
import './methods.js';
export default bots;
