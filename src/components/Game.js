import React ,{useState} from 'react'
import {CalculateWinner} from '../helper'
import Board from './Board'
function Game() {
    const [history,setHistory]=useState([Array(9).fill(null)])
    const [stepNumber,setStepNumber]=useState(0)
    const [xIsNext,setXIsNext]=useState(true)
    const winner=CalculateWinner(history[stepNumber])
    const XO=xIsNext ? 'X':'O'
    const handleClick=(i)=>{
        const historyPoint=history.slice(0,stepNumber+1)
        const current=historyPoint[stepNumber]
        const squares=[...current]
        if(winner|| squares[i]) return;
        squares[i]=XO
        setHistory([...historyPoint , squares])
        setStepNumber(historyPoint.length)
        setXIsNext(!xIsNext)

    }
    const jumpTo=(step)=>{
        setStepNumber(step)
        setXIsNext(step%2===0)
    } 
    const rendermoves =()=>history.map((_step,move)=>{
        const destination= move?`Go to move : #${move}`:'Go to start'
        return (
            <li key={move}>
<button onClick={()=>jumpTo(move)}>{destination}</button>
            </li>
        )
    })
    return (
        <>
            <h1>Tic Tac Toe</h1>
            <Board onClick={handleClick }squares={history[stepNumber]} />
            <div className="info-wrapper">
                <div>
                    <h3>History</h3>
                    {rendermoves()}
                </div>
                <h3>{winner ?'Winner: '+winner :'Next Player:' +XO }</h3>
            </div>
        </>
    )
}

export default Game
