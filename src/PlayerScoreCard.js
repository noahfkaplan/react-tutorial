import React from 'react'
import Square from './Square'

export default function PlayerScoreCard(props){
    return (
        <div className='score-card'>
            <label className='user-name'>{props.name}</label>
            <Square value={props.score} onClick={()=>{}}/>
        </div>
    )
}