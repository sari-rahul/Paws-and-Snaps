import { useEffect, useState } from 'react'

/** This hook delays the execution of the function until a certain amount of time passed
* since the last time it was called, Here 500 msec will be passed as the delay and 
* this will delay the api request by 500msec, thus avoiding unwanted API request and glitch 
*in the output displayed  */

const useDebounce = (value,delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebouncedValue(value);
        },delay);

        return ()=>{
            clearTimeout(handler);
        };
    } ,[value,delay]);



  return debouncedValue;  
};

export default useDebounce