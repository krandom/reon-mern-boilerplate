const express = require('express');
const bodyParser = require("body-parser");
const connectDB = require('./config/db')
const cors = require('cors');
const WebSocket = require('ws');
const http = require('http');

// import * as WebSocket from 'ws';
// https://www.freecodecamp.org/news/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab/

const app = express();

app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:9090'],
  credentials: true
}));


// Connect DB
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.all('*', (req, res, next) => {
  req.props = { ...req.body, ...req.query };

  next();
});

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/admin/auth', require('./routes/api/admin/auth'));
app.use('/api/admin/users', require('./routes/api/admin/users'));
app.use('/api/admin/settings', require('./routes/api/admin/settings'));
app.use('/api/auth/', require('./routes/api/auth'));
app.use('/api/app/', require('./routes/api/app'));


const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// TODO :: move websockets to own file
const websockets = {};

global.broadcast = (data) => {
  wss.clients.forEach((client) => {
    // console.log('CLIENT', client)
    if (client.readyState === WebSocket.OPEN) { //  && client !== ws
      client.send(JSON.stringify(data))
    }
  })
}

const broadcastToClient = (data, ws) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) { //  && client !== ws
      client.send(JSON.stringify(data))
    }
  })
}

wss.on('connection', ws => {

  // verify anon/auth somehow?
  // only save for logged in user?
  // do it on login
  // websockets[userID] = ws;
  // broadcast from client when logging in, also app (client/admin)?

  ws.on('message', message => {

    const data = JSON.parse(message)

    switch (data.type) {
      case 'ADD_USER': {
        // index = users.length
        // users.push({ name: 'mumin', id: index + 1 })
        // ws.send(JSON.stringify({
        //   type: 'USERS_LIST',
        //   users
        // }))
        // broadcastToClient({
        //   type: 'USERS_LIST',
        //   users
        // }, ws)
        break
      }
      case 'ADD_MESSAGE':
        broadcastToClient({
          type: 'ADD_MESSAGE',
          message: data.message,
          author: data.author
        }, ws)
        break
      default:
        break
    }
  })

  // ws.send('test');
});

server.listen(PORT, () => { console.log(`Server is running on port: ${PORT}`); });