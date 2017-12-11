import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const MyContract = window.web3.eth.contract([{"constant":false,"inputs":[],"name":"setExperimentInMotion","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getState","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"pseudoRandomResult","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSecret","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newState","type":"string"}],"name":"setState","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"you_awesome","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"result","type":"bool"}],"name":"ExperimentComplete","type":"event"}]);

    this.state = {
      ContractInstance: MyContract.at(
        '0xbc6ccd5269e308b291ac1b3534a24a1349d7c077'
      ),
      contractState: '',
    };

    this.querySecret = this.querySecret.bind(this);
    this.queryContractState = this.queryContractState.bind(this);
    this.handleContractStateSubmit = this.handleContractStateSubmit.bind(this);
    this.queryConditionResult = this.queryConditionResult.bind(this);
    this.activateExperiment = this.activateExperiment.bind(this);
    this.state.event = this.state.ContractInstance.ExperimentComplete();
  }

  querySecret() {
    const { getSecret } = this.state.ContractInstance;

    getSecret((err, secret) => {
      if (err) console.log(`Ya fucked up now!!`);
      console.log(`The Secret is: ${secret}!!!!`);
    });
  }

  queryContractState() {
    const { getState } = this.state.ContractInstance;
    getState((err, state) => {
      if (err) console.log(`Ya fucked up now!!`);
      console.log(`CONTRACT STATE: ${state}!!!!`);
    });
  }

  handleContractStateSubmit(event) {
    event.preventDefault();

    const { setState } = this.state.ContractInstance;
    const { contractState: newState } = this.state;

    setState(
      newState,
      {
        gas: 300000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei(0.01, 'ether'),
      },
      (err, result) => {
        console.log(`Smart contract STATE CHANGE initialized`);
      }
    );
  }

  queryConditionResult() {
    const { pseudoRandomResult } = this.state.ContractInstance;

    pseudoRandomResult((err, result) => {
      console.log(
        `This is what the fuck a smart contract looks like fool!:::: %$#@!!!!!${result}!!!!!@#$%`
      );
    });
  }

  activateExperiment() {
    const { setExperimentInMotion } = this.state.ContractInstance;

    setExperimentInMotion(
      {
        gas: 300000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei(0.01, 'ether'),
      },
      (err, result) => {
        console.log(`Smart contract EXPERIMENT initialized`);
      }
    );
  }

  render() {
    this.state.event.watch((err, event) => {
      if (err) console.log(`An error occured::: ${err}`);
      console.log(`This is the event::: ${JSON.stringify(event)}`);
      console.log(`This is the experiment result::: ${event.args.result}`);
    });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React and Ethereum Demo App</h1>
        </header>
        <br />
        <br />
        <button onClick={this.querySecret}>
          Query Your Smart Contracts secret message!
        </button>
        <br />
        <br />
        <button onClick={this.queryContractState}>
          Query Your Smart Contracts State!
        </button>
        <br />
        <br />
        <form onSubmit={this.handleContractStateSubmit}>
          <input
            type="text"
            name="state-change"
            placeholder="Enter new State..."
            value={this.state.contractState}
            onChange={event =>
              this.setState({ contractState: event.target.value })
            }
          />
          <button type="submit"> Submit </button>
        </form>
        <br />
        <br />
        <button onClick={this.activateExperiment}>
          Activate the Experiment!!!
        </button>
        <br />
        <br />
        <button onClick={this.queryConditionResult}>
          Query the Experiment Result
        </button>
        <br />
        <br />
      </div>
    );
  }
}

export default App;
