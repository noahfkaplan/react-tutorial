import React from 'react'
import Board from './Board'
import ScoreBoard from './ScoreBoard'
import {CalculateWinner} from './HelperFunctions'

export default class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = 
      {
          history: [{squares: Array(9).fill(null)}],
          turnX : true,
          stepNumber: 0,
          winCounter: {player1: 0, player2: 0}
      };
    }
    handleClick(i){
      const history = this.state.history.slice(0,this.state.stepNumber+1);
      const currentBoard = history[history.length-1];
      const squares = currentBoard.squares.slice();
      const winCounter = {player1: this.state.winCounter.player1, player2: this.state.winCounter.player2};
      if(squares[i] || CalculateWinner(squares)){
        return;
      }
      squares[i] = this.state.turnX? "X":"O";
      if(CalculateWinner(squares)){
        winCounter.player1 = this.state.turnX? winCounter.player1+1: winCounter.player1;
        winCounter.player2 = this.state.turnX? winCounter.player2: winCounter.player2+1;
      }
      this.setState({
          history: history.concat([{
            squares:squares,
          }]),
          turnX: !this.state.turnX,
          stepNumber: history.length,
          winCounter: winCounter,
      });
    }
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }
    restart(){
      this.jumpTo(0);
      this.setState({
        stepNumber: 0,
        history: [{squares: Array(9).fill(null)}]
      })
    }
    render() {
      const history = this.state.history;
      const currentBoard = history[this.state.stepNumber];
      const winner = CalculateWinner(currentBoard.squares);
      let status;
      if(winner){
        status = 'The winner is: ' + (winner);
      }
      else{
        status = 'Current Turn: ' + (this.state.turnX ? 'X':'O');
      }      
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

      return (
        <div className="game">
          <div className="game-board">
            <div>
              <ScoreBoard player1={this.state.winCounter.player1} player2={this.state.winCounter.player2}/>
              <button onClick = {() => this.restart()}>Restart</button>
            </div>
            <div className="board">
              <Board squares={currentBoard.squares} onClick={(i) => this.handleClick(i)}/>
            </div>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
}
