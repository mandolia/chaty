import { useState, useEffect } from 'react';
import { ReversTimeToSec, formatTimeCounteDown } from '../helpers'

const useTimerCountDown = (spentTimer, fixedDuration) => {

    const [leftTime, setLeftTime] = useState();

    useEffect(() => {
        setLeftTime(ReversTimeToSec(fixedDuration) - spentTimer);
    }, [fixedDuration, leftTime, spentTimer])

    return [formatTimeCounteDown(leftTime)]
}

export default useTimerCountDown;
