import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Web3 from 'web3';
import Web3Provider from "react-web3-provider";


const deFaultProvider = (cb) =>
{
    cb(new Web3(new Web3.providers.HttpProvider("http://localhost:8545")));
};

ReactDOM.render(
    <Web3Provider
        defaultProvider = {deFaultProvider}
        loading="Loading..."
        error={(err) => `Connection error: ${err.message}`}>
        <App />
    </Web3Provider>
    , document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
