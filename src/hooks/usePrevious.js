import { useEffect, useRef } from 'react';

const usePrevious = (value) => {
    const prevCountRef = useRef();

    useEffect(() => {
        prevCountRef.current = value;
    });

    return prevCountRef.current;
}

export default usePrevious;