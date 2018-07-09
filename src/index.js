import React from 'react';
import {render} from 'react-dom';
import Router from './components/Router';
import './styles/styles.scss';
import './custom_select';
require("babel-polyfill");


render(<Router/>, document.querySelector('.bod'));