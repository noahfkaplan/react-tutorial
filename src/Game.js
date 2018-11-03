import Board from './Board'
import React from 'react'
import {CalculateWinner} from './HelperFunctions'

export default class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = 
      {
          history: [{squares: Array(9).fill(null)}],
          turnX : true,
          stepNumber: 0,
      };
    }
    handleClick(i){
      const history = this.state.history.slice(0,this.state.stepNumber+1);
      const currentBoard = history[history.length-1];
      const squares = currentBoard.squares.slice()
      if(squares[i] || CalculateWinner(squares)){
        return;
      }
      squares[i] = this.state.turnX? "X":"O";
      this.setState({
          history: history.concat([{
            squares:squares,
          }]),
          turnX: !this.state.turnX,
          stepNumber: history.length,
      });
    }
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }
    render() {
      const history = this.state.history;
      const currentBoard = history[this.state.stepNumber];
      const winner = CalculateWinner(currentBoard.squares);
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
      let status;
      if(winner){
        status = 'The winner is: ' + (winner);
      }
      else{
        status = 'Current Turn: ' + (this.state.turnX ? 'X':'O');
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board squares={currentBoard.squares} onClick={(i) => this.handleClick(i)}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
}
