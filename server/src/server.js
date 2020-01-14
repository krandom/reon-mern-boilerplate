const express = require('express');
const bodyParser = require("body-parser");
const connectDB = require('./config/db')
const cors = require('cors');
const WebSocket = require('ws');
const http = require('http');
const setLastActive = require('./helpers/setLastActive');

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
app.use('/api/boot', require('./routes/api/boot'));
app.use('/api/admin/auth', require('./routes/api/admin/auth'));
app.use('/api/admin/users', require('./routes/api/admin/users'));
app.use('/api/admin/settings', require('./routes/api/admin/settings'));
app.use('/api/auth/', require('./routes/api/auth'));
app.use('/api/app/', require('./routes/api/app'));


const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// TODO :: move websockets to own file
const wss = new WebSocket.Server({ server });
global.clientsObj = {};

// TODO :: make broadcast by App/Env
global.broadcast = (data) => {
  wss.clients.forEach((client) => {
    // console.log('CLIENT', client)
    if (client.readyState === WebSocket.OPEN) { //  && client !== ws
      client.send(JSON.stringify(data))
    }
  })
}

global.broadcastToUser = ({ clientApp, clientEnv, userID, payload }) => {
  checkSocketsAppEnv({ clientApp, clientEnv });

  console.log('broadcastToUser', clientsObj)
  console.log('broadcastToUser', clientApp, clientEnv, userID, payload )

  const user = clientsObj[clientApp][clientEnv][userID];

  console.log('broadcastToUser', user)
  if (user) {

    user.forEach(x => {
      x.socket.send(JSON.stringify({
        type: 'TOAST',
        payload
      }))
    })
  }

  // wss.clients.forEach((client) => {
  //   // console.log('CLIENT', client)
  //   if (client.readyState === WebSocket.OPEN) { //  && client !== ws
  //     client.send(JSON.stringify(data))
  //   }
  // })
}

const broadcastToClient = (data, ws) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) { //  && client !== ws
      client.send(JSON.stringify(data))
    }
  })
}

// TODO :: make function that checks and creates websockets.clientApp.clientEnv etc and call that first on any websocket const...
const checkSocketsAppEnv = ({ clientApp, clientEnv }) => {
  if (!(clientApp in clientsObj))
    clientsObj[clientApp] = {};

  if (!(clientEnv in clientsObj[clientApp]))
    clientsObj[clientApp][clientEnv] = {};
};

// TODO :: add timestamp of ws
const addSocket = ({ clientApp, clientEnv, websocketID, ws }) => {
  checkSocketsAppEnv({ clientApp, clientEnv });

  clientsObj[clientApp][clientEnv][websocketID] = { ws };
};

// TODO :: add timestamp of ws
const removeSocket = ({ clientApp, clientEnv, websocketID, userID = null }) => {
  checkSocketsAppEnv({ clientApp, clientEnv });

  if (userID) {
    const user = clientsObj[clientApp][clientEnv][userID];

    if (user) {
      if (user.length === 1)
        delete clientsObj[clientApp][clientEnv][userID];
      else
        clientsObj[clientApp][clientEnv][userID] = clientsObj[clientApp][clientEnv][userID]
          .filter(x => x.websocketID !== websocketID);
    }
  } else
    delete clientsObj[clientApp][clientEnv][websocketID];
};

// TODO :: add timestamp of ws
const updateSocketID = ({ clientApp, clientEnv, currentID, newID, ws }) => {
  checkSocketsAppEnv({ clientApp, clientEnv });

  console.log('UPDATING socket user id', clientApp, clientEnv, currentID, newID);

  clientsObj[clientApp][clientEnv][newID] = { ws };

  delete clientsObj[clientApp][clientEnv][currentID];

  // console.log('UPDATING socket user id 22222222', clientsObj);

};

// TODO :: add timestamp of ws
const userLogin = ({ clientApp, clientEnv, websocketID, userID, ws }) => {
  checkSocketsAppEnv({ clientApp, clientEnv });

  console.log('userLogin socket user id', clientApp, clientEnv, websocketID, userID);

  if (userID in clientsObj[clientApp][clientEnv]) {
    clientsObj[clientApp][clientEnv][userID].push({
      socket: ws,
      websocketID,
    });
  } else {
    clientsObj[clientApp][clientEnv][userID] = [{ socket: ws, websocketID }];
  }

  // clientsObj[clientApp][clientEnv][userID] = { ws };

  delete clientsObj[clientApp][clientEnv][websocketID];

  // console.log('UPDATING socket user id 22222222', clientsObj);

};

const userLogout = ({ clientApp, clientEnv, websocketID, userID, ws }) => {

  console.log('userLogout socket user id', clientApp, clientEnv, websocketID, userID);

  const user = clientsObj[clientApp][clientEnv][userID];

  if (user) {

    if (user.length === 1)
      delete clientsObj[clientApp][clientEnv][userID];
    else
      clientsObj[clientApp][clientEnv][userID] = clientsObj[clientApp][clientEnv][userID]
        .filter(x => x.websocketID !== websocketID);
    // clientsObj[clientApp][clientEnv][userID].push({
      // socket: ws,
      // websocketID,
    // });
  }
   // else {
    // clientsObj[clientApp][clientEnv][userID] = { socket: ws, websocketID };
  // }

  clientsObj[clientApp][clientEnv][websocketID] = { ws };
};

wss.on('connection', ws => {

  // verify anon/auth somehow?
  // only save for logged in user?
  // do it on login
  // websockets[userID] = ws;
  // broadcast from client when logging in, also app (client/admin)?

  // ws.on('open', )

  let client = {
    app: '',
    env: '',
    userID: null,
    websocketID: '',
  };

  ws.on('message', message => {

    const data = JSON.parse(message)
    const { clientApp, clientEnv, userID } = data;

    if (userID)
      setLastActive({ clientApp, clientEnv, userID });

    // console.log('ACTION', data)
    switch (data.type) {
      case 'CONNECT':
        client.app = clientApp;
        client.env = clientEnv;
        client.websocketID = data.websocketID;

        addSocket({
          clientApp,
          clientEnv,
          websocketID: data.websocketID,
          ws,
        });

        // console.log('CONNECT', data)
        // console.log('CONNECT clientsObj', clientsObj)
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


      case 'LOGIN':
        // console.log('SET USER ID HERE FOR WEBSOCKETS!!!', data)
        client.userID = userID;

        userLogin({
          clientApp,
          clientEnv,
          websocketID: client.websocketID,
          userID,
          ws,
        });

        // updateSocketID({
        //   clientApp,
        //   clientEnv,
        //   currentID: data.websocketID,
        //   newID: userID,
        //   ws,
        // });
        break;

      case 'LOGOUT':
        // console.log('LOGOUTLOGOUTLOGOUTLOGOUTLOGOUTLOGOUTLOGOUTLOGOUTLOGOUT')
        // client.id = userID;

        userLogout({
          clientApp,
          clientEnv,
          websocketID: client.websocketID,
          userID: client.userID,
          ws,
        });

        // updateSocketID({
        //   clientApp,
        //   clientEnv,
        //   currentID: client.userID,
        //   newID: client.websocketID,
        //   ws,
        // });

        client.userID = null;
        break;

      default:
        break
    }

    ws.on('close', message => {
      // console.log('TODO :: CLEAN UP CONNECTION HERE', client)

      if (client.userID)
        removeSocket({
          clientApp: client.app,
          clientEnv: client.env,
          websocketID: client.websocketID,
          userID: client.userID
        });

      removeSocket({ clientApp: client.app, clientEnv: client.env, websocketID: client.websocketID });

/*

      Maybe save in two objects, user in one, socket (socket id): (socket) in other for easier cleanup

      const users = {};
      io.on('connection', function(socket){
        console.log('a user connected');
        socket.on('login', function(data){
          console.log('a user ' + data.userId + ' connected');
          // saving userId to array with socket ID
          users[socket.id] = data.userId;
        });
        socket.on('disconnect', function(){
          console.log('user ' + users[socket.id] + ' disconnected');
          // remove saved socket from users object
          delete users[socket.id];
        });
      });

*/
    })
  })

  // ws.send('test');
});

server.listen(PORT, () => { console.log(`Server is running on port: ${PORT}`); });