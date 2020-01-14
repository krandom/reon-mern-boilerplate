# Hot Reload

Using [react-hot-loader](https://www.npmjs.com/package/react-hot-loader)

## App.react.jsx

### import { hot } from 'react-hot-loader/root';

### export default hot(App);

## package.json

Make sure to use --hot when starting dev server

"start": "nodemon --exec webpack.config.js --exec \"webpack-dev-server --hot --env development\"",

# Redux Store

/src/app/store/store.js

## redux-devtools-extension

[redux-devtools-extension](https://www.npmjs.com/package/redux-devtools-extension) adding devtools to broswer console for redux

## rootReducer

Importing all your reducers here

### app.reducer

#### Using [redux-actions](https://www.npmjs.com/package/redux-actions)
#### Initialstate can be found in ./initialstate. If initial state grows you can move it into
######



https://hugogiraudel.com/2015/06/18/styling-react-components-in-sass/