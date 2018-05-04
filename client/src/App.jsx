import 'babel-polyfill';
import React,{Component} from 'react';
import {render} from 'react-dom';

import {RoutedApp} from './router.jsx';

const contentNode = document.getElementById('contents');

render(<RoutedApp />, contentNode); 

if (module.hot) {
    module.hot.accept();
}

