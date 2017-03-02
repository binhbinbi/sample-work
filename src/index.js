import React from 'react';
import ReactDOM from 'react-dom';
import { createStore} from 'redux';
import './stylesheets/bootstrap/css/bootstrap.min.css'
import './stylesheets/bootstrap-datetimepick.min.css'
import './stylesheets/main.css';


const store = createStore(()=>{});
let Root = require('./containers/Server.js');

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
