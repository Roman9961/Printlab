import React from 'react';
import {render} from 'react-dom';
import Router from './components/Router';
import './styles/styles.scss';
require("babel-polyfill");
require('./custom4963');

render(<Router/>, document.querySelector('.bod'));