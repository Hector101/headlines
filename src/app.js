import React from 'react';
import ReactDOM from 'react-dom';

/**
 * load sass file
 */
import './sass/style.scss';

/**
 * import router component
 */
import Router from './router/Router';

/**
 * render router component to the DOM
 */
ReactDOM.render(<Router />, document.getElementById('root'));
