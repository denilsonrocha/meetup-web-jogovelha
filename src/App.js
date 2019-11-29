import React, { useState } from 'react';

import './App.css';

//import socketIOClient from 'socket.io-client';


function App() {

  //const limpaTabuleiro = Array(9).fill("");

  const limpaTabuleiro = [
    "O", "X", "X",
    "O", "X", "X",
    "O", "X", "X",
  ]

  const [tabuleiro, setTabuleiro] = useState(limpaTabuleiro);

  return (
    <main>
      <h1 className="title"> *** Jogo da Velha ***</h1>

      <div className="tabuleiro">
        {
          tabuleiro.map((item, index) => (
            <div key={index} className={`campo ${item}`}>{item}</div>
          ))
        }
        <div className="campo">.</div>
      </div>
    </main>
  )

}
export default App;

// class App extends Component {



//   constructor() {
//     super();

//     // this.state = {
//     //   serverURL: 'http://localhost:3334',
//     //   informationReceived: 'I'
//     // }


//     const socket = socketIOClient(this.state.serverURL);

//     socket.on('receivedMessage', (receivedInfo) => {
//       this.setState({
//         informationReceived: receivedInfo[0][0]
//       })
//     })
//   }

//   emitInfo = () => {

//     const socket = socketIOClient(this.state.serverURL);

//     socket.emit('sendMessage', 'teste envio de dados');

//   }

//   render() {
//     return (
//       <main>
//         <h1 className="title"> *** Jogo da Velha ***</h1>

//         <div className="tabuleiro">
//           {
//             tabuleiro.map((item,index) => {

//             })
//           }
//           <div className="campo">.</div>
//         </div>
//       </main>
//     );
//   }
// }

// export default App;
