import React from 'react'
import PlayerScoreCard from './PlayerScoreCard'

export default function ScoreBoard(props) {
    return(
        <div className= 'score-board'> 
            <PlayerScoreCard name={"X"} score={props.player1}/>
            <PlayerScoreCard name={"O"} score={props.player2}/>
        </div>
    )
}