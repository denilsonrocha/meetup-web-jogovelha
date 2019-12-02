import React, { useState, useEffect } from 'react';

import './App.css';

//import socketIOClient from 'socket.io-client';


function App() {

 const limpaTabuleiro = Array(9).fill("");

  // const limpaTabuleiro = [
  //   "O", "X", "X",
  //   "O", "X", "X",
  //   "O", "X", "X",
  // ]

  const [tabuleiro, setTabuleiro] = useState(limpaTabuleiro);
  const [jogadorAtual, setJogadorAtual] = useState("O");
  const [ganhador, setGanhador] = useState();

  const handlerCampoClick = (index) => {

    if(tabuleiro[index] !== "") return null;

    setTabuleiro(tabuleiro.map((item, itemIndex) => itemIndex === index ? jogadorAtual : item));
  
    setJogadorAtual(jogadorAtual === "X"? "O" : "X")
  }

  

  const verificaGanhador = () => {
    const possibilidades = [
      [tabuleiro[0],tabuleiro[1],tabuleiro[2]],
      [tabuleiro[3],tabuleiro[4],tabuleiro[5]],
      [tabuleiro[6],tabuleiro[7],tabuleiro[8]],

      [tabuleiro[0],tabuleiro[3],tabuleiro[6]],
      [tabuleiro[1],tabuleiro[4],tabuleiro[7]],
      [tabuleiro[2],tabuleiro[5],tabuleiro[8]],

      [tabuleiro[0],tabuleiro[4],tabuleiro[8]],
      [tabuleiro[2],tabuleiro[4],tabuleiro[2]],
    ]

    possibilidades.forEach(campos => {
      if(campos.every(campo => campo === "O")) setGanhador(`O jogador 'O', foi o vencedor.`);
      if(campos.every(campo => campo === "X")) setGanhador(`O jogador 'X', foi o vencedor.`);
    })
  }

  useEffect(verificaGanhador, [tabuleiro]);

  return (
    <main>
      <h1 className="title"> JOGO DA VELHA </h1>
      <h1 className="vencedor">{ganhador}</h1>
      <div className="tabuleiro">
        {
          tabuleiro.map((item, index) => (
            <div 
            key={index} 
            className={`campo ${item}`}
            onClick={() => handlerCampoClick(index)}
            >
              {item}
            </div>
          ))

         
        }

       
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
