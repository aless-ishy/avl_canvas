import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import {createStore} from "redux";
import avlApp from "./reducers";
import {Provider} from "react-redux";
import {insertNode} from "./actions";

const store = createStore(avlApp);

store.dispatch(insertNode(0));
store.dispatch(insertNode(1));
store.dispatch(insertNode(2));
store.dispatch(insertNode(3));
store.dispatch(insertNode(4));
store.dispatch(insertNode(60));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
