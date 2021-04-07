import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AppWithRedux } from './AppWithRedux';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { store } from "./state/store";


// чтобы компонента могла пользовотся store её надо обернуть в тег - <Provider store={store}></Provider>
ReactDOM.render (
	<Provider store={store} >
		<AppWithRedux/>
	</Provider>, document.getElementById ( 'root' ) );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister ();
