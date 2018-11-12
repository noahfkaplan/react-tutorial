import React from 'react'

export default function Button(props){
    return(
        <button className = {props.type} onClick = {props.onClick}>
            {props.text}
        </button>
    )
}