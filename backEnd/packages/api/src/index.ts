import HyperExpress from 'hyper-express';
const webserver = new HyperExpress.Server();

const jwt=require('jsonwebtoken');
import Pouchdb from 'pouchdb';
import PouchDB_Find from 'pouchdb-find';
Pouchdb.plugin(PouchDB_Find);

var cors = require('cors')
webserver.use(cors())

const postsRoute=require('./Routes/posts');
const usersRoute=require('./Routes/users');





webserver.use('/users',usersRoute);

webserver.use('/posts',postsRoute);



// Activate webserver by calling .listen(port, callback);
webserver.listen(8080)
.then((socket) => console.log('Webserver started on port 8080'))
.catch((error) => console.log('Failed to start webserver on port 8080'));