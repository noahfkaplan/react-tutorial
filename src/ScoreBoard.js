import React from 'react'
import Square from './Square'

export default class ScoreBoard extends React.Component{
    render(props){
        return(
            <div className= 'score-board'>
                <div className='score'>
                    <label>X:</label>
                    <Square value={this.props.player1} onClick={()=>{}}/>
                </div>
                <div className='score'>
                    <label>0:</label>
                    <Square value={this.props.player2} onClick={()=>{}}/>
                </div>
            </div>
        )
    }
}