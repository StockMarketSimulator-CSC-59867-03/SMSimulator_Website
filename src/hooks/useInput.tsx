import { useState } from "react";

// react hook to make input state handling easier
// initialValue is the initialValue of the state, option mapValue is a function that takes in the arguments of onChange and returns a value
// that value should be set to when onChagne is called. 
export default function useInput(initialValue: any, mapValue: any = null){
    const [value, setValue] = useState(initialValue);

    if(mapValue === null){
        mapValue = (event: any) => event.target.value;
    }

    return {
        value,
        setValue,
        bind: {
            onChange: (...args : any[]) =>{
                setValue(mapValue(...args));
            }
        }
    };

}

