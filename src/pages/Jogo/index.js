import React, { useState, useEffect } from 'react';

const io = require('socket.io-client');
const socket = io(process.env.REACT_APP_API_URL);

const Jogo = () => {

  const limpaTabuleiro = Array(9).fill("");

  const [tabuleiro, setTabuleiro] = useState(limpaTabuleiro);
  const [jogadorAtual, setJogadorAtual] = useState("O");
  const [ganhador, setGanhador] = useState();


  const verificaGanhador = () => {

    const possibilidades = [
      [tabuleiro[0], tabuleiro[1], tabuleiro[2]],
      [tabuleiro[3], tabuleiro[4], tabuleiro[5]],
      [tabuleiro[6], tabuleiro[7], tabuleiro[8]],

      [tabuleiro[0], tabuleiro[3], tabuleiro[6]],
      [tabuleiro[1], tabuleiro[4], tabuleiro[7]],
      [tabuleiro[2], tabuleiro[5], tabuleiro[8]],

      [tabuleiro[0], tabuleiro[4], tabuleiro[8]],
      [tabuleiro[2], tabuleiro[4], tabuleiro[6]],
    ]

    possibilidades.forEach(campos => {
      if (campos.every(campo => campo === "O")) setGanhador(`O jogador 'O', foi o vencedor.`);
      if (campos.every(campo => campo === "X")) setGanhador(`O jogador 'X', foi o vencedor.`);
    })

  }

  useEffect(verificaGanhador, [tabuleiro]);


  useEffect(() => {
    socket.on('recebeTabuleiro', data => {

      setTabuleiro(data);

    });
  }, [tabuleiro]);

  useEffect(() => {
    socket.on('recebeJogadorAtual', data => {

      setJogadorAtual(data === "X" ? "O" : "X")

    });
  }, [jogadorAtual]);

  const handlerCampoClick = (index) => {

    if (tabuleiro[index] !== "") return null;

    setTabuleiro(tabuleiro.map((item, itemIndex) => itemIndex === index ? jogadorAtual : item));

    setJogadorAtual(jogadorAtual === "X" ? "O" : "X")

    socket.emit('sendTabuleiro',
      tabuleiro.map((item, itemIndex) => itemIndex === index ? jogadorAtual : item)
    );

    socket.emit('sendJogadorAtual', jogadorAtual);
  }

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

export default Jogo