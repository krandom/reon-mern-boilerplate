const express = require('express');
const bodyParser = require("body-parser");
const connectDB = require('./config/db')
const cors = require('cors');
const WebSocket = require('ws');
const http = require('http');

// import * as WebSocket from 'ws';

const app = express();

app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:9090'],
  credentials: true
}));


// Connect DB
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/auth/', require('./routes/api/auth'));
app.use('/api/admin/auth', require('./routes/api/admin/auth'));
app.use('/api/admin/users', require('./routes/api/admin/users'));


const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const users = []

const broadcast = (data, ws) => {
      console.log('BROADCASTING 1')
  wss.clients.forEach((client) => {
      console.log('BROADCASTING 2')
    if (client.readyState === WebSocket.OPEN) { //  && client !== ws
      console.log('BROADCASTING 3')
      client.send(JSON.stringify(data))
    }
  })
}

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
    // console.log(`Received message => ${message.type}`)

    const data = JSON.parse(message)

    console.log(`Received data => ${data.type}`)
    console.log(`Received data => ${data}`)

    switch (data.type) {
      case 'ADD_USER': {
        console.log('add user 1')
        index = users.length
        console.log('add user 2', index)
        users.push({ name: 'mumin', id: index + 1 })
        console.log('add user 3', users)
        ws.send(JSON.stringify({
          type: 'USERS_LIST',
          users
        }))
        console.log('add user 4')
        broadcast({
          type: 'USERS_LIST',
          users
        }, ws)
        console.log('add user 5')
        break
      }
      case 'ADD_MESSAGE':
        broadcast({
          type: 'ADD_MESSAGE',
          message: data.message,
          author: data.author
        }, ws)
        break
      default:
        break
    }

  })
  // ws.send('ho!');
});

server.listen(PORT, () => { console.log(`Server is running on port: ${PORT}`); });

// var wsServer = new WebSocketServer({'httpServer': server});

/*
wsServer.on("request", function(request) {
    var connection = request.accept(null, request.origin);
    console.log("Connection ACCEPTED\n");

    connection.on("message", function(message)
    {
        if(message.type == 'utf8')
        {
            console.log("Received Message: %s", message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
    })

    connection.on("close", function(reasonCode, description)
    {
        console.log("Connection lost\n");
    })
})
*/