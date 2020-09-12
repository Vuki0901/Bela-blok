import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

import "shards-ui/dist/css/shards.min.css"
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.baseURL = "https://bela-blok-8b93f.firebaseio.com";

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
