import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import {createStore} from "redux";
import avlApp from "./reducers";
import {Provider} from "react-redux";
import {insertNode} from "./actions";

import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";


const store = createStore(avlApp);

    for (let i = 0; i < 15; i++)
        store.dispatch(insertNode(i));

ReactDOM.render(
    <Provider store={store}>
        <BrowserView>
            <App/>
        </BrowserView>
        <MobileView>
            <h1>ASDSADASDSAD</h1>
        </MobileView>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
