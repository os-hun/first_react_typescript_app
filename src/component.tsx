import * as React from 'react'
import {useCallback, useEffect, useMemo, useReducer, useState} from "react";
import { reducer, initialState } from './reducer'

// useCallback
type Props ={
    clickedX: number
    clickedY: number
    handleClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const Component: React.FC<Props> = props => (
    // useState
    // const [count, setCount] = useState(0)
    // const handleClick = useCallback(() => {
    //     setCount(count + 1)
    // }, [count])
    // return(
    //     <div>
    //         <p>{count}</p>
    //         <button onClick={handleClick}>+1</button>
    //     </div>
    // )

    // useMemo
    // const [count, setCount] = useState(0)
    // const double = useMemo(() => count * 2, [count])
    // const doubleWithUnit = useMemo(() => `${double} pt`, [double])
    // const handleClick = useCallback(() => {
    //     setCount(prev => prev + 1)
    // }, [])
    // return(
    //     <div>
    //         <p>count : {count}</p>
    //         <p>double : {double}</p>
    //         <p>doubleWithUnit : {doubleWithUnit}</p>
    //         <button onClick={handleClick}>+1</button>
    //     </div>
    // )

    // useCallback
    <div>
        <div
            style={{ width: 100, height: 100, background: '#ccf' }}
            onClick={props.handleClick}
        />
        <p
            style={{ width: 100, height: 100, background: '#fcc' }}
            onClick={props.handleClick}
        />
        <p>X: {props.clickedX}</p>
        <p>Y: {props.clickedY}</p>
    </div>

)

const Effect: React.FC = () => {
    const [count, setCount] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(count + 1)
        }, 1000)
        return () => clearInterval(interval)
    })
    return(
        <div>{count}</div>
    )
}

const Redu: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return(
        <>
            Count: {state.count}
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        </>
    )
}

const Container: React.FC = () => {
    const [state, update] = useState({
        clickedX: 0,
        clickedY: 0
    })
    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            event.persist()
            const { top, left } = event.currentTarget.getBoundingClientRect()
            update(prev => ({
                ...prev,
                clickedX: event.clientX - left,
                clickedY: event.clientY - top
            }))
        },
        []
    )
    return(
        <Component
            clickedX={state.clickedX}
            clickedY={state.clickedY}
            handleClick={handleClick}
        />
    )
}

export default Container;