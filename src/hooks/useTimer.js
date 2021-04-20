import { useState, useRef } from 'react';

const useTimer = (initialState = 0) => {
    const [timer, setTimer] = useState(initialState)

    const countRef = useRef(null);

    const handleStart = () => {
        setTimeout(clearInterval(countRef.current), 1000);
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    };



    const handleReset = () => {
        clearInterval(countRef.current)
        setTimer(0)
    };

    return { timer, handleStart, handleReset }
}

export default useTimer;
