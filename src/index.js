import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Stopky from './Stopky/Stopky';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Stopky />, document.getElementById('root'));
registerServiceWorker();
