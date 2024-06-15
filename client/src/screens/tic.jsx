//client/src/App.js
import React, { useState, useEffect } from "react";
import "./tic.css";
import { io } from "socket.io-client";
import json from '../ip.json';

const socket = io(json.ip+":5000");
// const socket = io("http://localhost:5000");

const Tic = () => {
  const [game, setGame] = useState({
    board: Array(9).fill(null),
    currentPlayer: "X",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [playerTurn, setPlayerTurn] = useState("X");

  useEffect(() => {
    socket.on("moveMade", (data) => {
      setGame(data.updatedGame);
      setPlayerTurn(data.updatedGame.currentPlayer);
      setErrorMessage("");
    });

    socket.on("gameReset", (newGame) => {
      setGame(newGame);
      setPlayerTurn("X");
      setErrorMessage("");
    });

    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error.message);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.off("moveMade");
      socket.off("gameReset");
      socket.off("connect_error");
      socket.off("disconnect");
    };
  }, []);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  const makeMove = (index) => {
    const squares = [...game.board];

    if (calculateWinner(squares) || squares[index]) {
      setErrorMessage("Invalid move. Please try again.");
      return;
    }

    squares[index] = game.currentPlayer;

    const updatedGame = {
      ...game,
      board: squares,
      currentPlayer: game.currentPlayer === "X" ? "O" : "X",
    };

    socket.emit("makeMove", { index, updatedGame });
  };

  const resetGame = () => {
    const newGame = {
      board: Array(9).fill(null),
      currentPlayer: "X",
    };

    socket.emit("resetGame", newGame);
  };

  const winner = calculateWinner(game.board);

  return (
    <div>
    <div className="tic_app-container">
      <h1>Welcome to Tic Tac Toe Game</h1>
      <div>
        <div className="tic_board">
          {game.board.map((cell, index) => (
            <div
              key={index}
              className={`tic_cell ${winner && winner === cell ? "tic_winner" : ""}`}
              onClick={() => makeMove(index)}
            >
              {cell}
            </div>
          ))}
        </div>
        <p className="tic_current-player">
          {winner
            ? `Player ${winner} wins!`
            : `Current Player: ${playerTurn}`}
        </p>
        <button className="tic_reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
      {errorMessage && (
        <p className="tic_error-message">{errorMessage}</p>
      )}
    </div>
    </div>
  );
};

export default Tic;
