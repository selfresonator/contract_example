import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    const MyContract = window.web3.eth.contract([{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getSecret","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"you_awesome","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]);
    
    this.state = {
      ContractInstance: MyContract.at('0xfb9ed2a7dd4320c6959b5246e1f7b6087c20e994')
    };
    
    this.querySecret = this.querySecret.bind(this);
  }
  
  querySecret() {
    const { getSecret } = this.state.ContractInstance;
    
    getSecret((err, secret) => {
      if (err) console.log(`Ya fucked up now!!`);
      console.log(`The Secret is: ${secret}!!!!`);
    });
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React and Ethereum Demo App</h1>
        </header>
        <br/>
        <br/>
        <button onClick={this.querySecret}>Query Your Smart Contracts secret message!</button>
        <br/>
        <br/>
      </div>
    );
  }
}

export default App;
