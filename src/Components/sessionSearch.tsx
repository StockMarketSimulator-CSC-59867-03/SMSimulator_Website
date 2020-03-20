import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateSearchInputValue } from '../redux/actions';

function SearchBar(){
    let dispatch = useDispatch();

    const [inputValue, setInputValue] = useState("");

    useEffect(() => {

    }, [inputValue]);

    const onInputChange = (e: any) => {
        setInputValue(e.target.value);
    }

    const storeSearchInputValue = () => {
        // update current inputValue state to redux
        dispatch(updateSearchInputValue(inputValue));
        console.log("dispatched !!");
    }

    return (
        <div className='input-wrapper'>
            <input
                placeholder='Search...'
                value={inputValue}
                onChange={onInputChange}
            />
            <button onClick={storeSearchInputValue}>Search</button>
        </div>);    
}

export default SearchBar;