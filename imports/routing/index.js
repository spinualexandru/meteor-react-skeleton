import route from './router.js';
import Home from '/imports/ui/home/Home.jsx';
import Controllers from '../ui/controllers/Controllers.jsx';
import Workers from '../ui/workers/Workers.jsx';

//  Home
route('/', Home);

//  Controllers page
route('/bot/controllers/', Controllers);
route('/bot/controllers/:id', Controllers);

//  Workers page
route('/bot/workers/', Workers);
route('/bot/workers/:id', Workers);
