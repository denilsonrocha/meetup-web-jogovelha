import React, { Component } from 'react';

import './App.css';

import socketIOClient from 'socket.io-client';


class App extends Component {


  constructor() {
    super();

    this.state = {
      serverURL: 'http://localhost:3334',
      informationReceived: 'Nothing yet! You should click on the button'
    }

    const socket = socketIOClient(this.state.serverURL);

    socket.on('receivedMessage', (receivedInfo) => {
      this.setState({
        informationReceived: receivedInfo[0][0]
      })
    })
  }

  emitInfo = () => {

    const socket = socketIOClient(this.state.serverURL);

    socket.emit('sendMessage', 'teste envio de dados');

  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <button onClick={() => this.emitInfo()}>envia dados</button>

          <div className="App-link ">
            {
              this.state.informationReceived
            }
          </div>



        </header>

        <br />

      </div>
    );
  }
}

export default App;
