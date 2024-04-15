import React, {useEffect, useState} from 'react';
import "./App.css"
import BoardComponent from "./componets/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import LostFiguresComponent from "./componets/LostFiguresComponent";
import Timer from "./componets/Timer";

function LostFigures() {
    return null;
}

const App = () => {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
    useEffect(() => {
        restart()
        setCurrentPlayer(whitePlayer);
    },[])

    function restart(){
        const newBoard = new Board();
        newBoard.initeCells();
        newBoard.addFigures();
        setBoard(newBoard);
    }

    function swapPlayer(){
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

  return (
      <div className="app">
          <Timer
              restart={restart}
              currentPlayer={currentPlayer}
          />
        <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer ={currentPlayer}
        swapPlayer={swapPlayer}
        />
          <div>
              <LostFiguresComponent
              title="Black Figures"
              figures={board.lostBlackFigures}
              />
              <LostFiguresComponent
                  title="White Figures"
                  figures={board.lostWhiteFigures}
              />
          </div>
      </div>
  );
};

export default App;
