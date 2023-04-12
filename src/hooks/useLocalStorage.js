import { useState, useEffect } from "react";

// hook to keeping data in local storage

function useLocalStorage(key, firstValue = null) {

    const initialValue = localStorage.getItem(key) || firstValue;

    const [ item, setItem ] = useState(initialValue);

    useEffect(function setKeyInLocalStorage() {
        if (item === null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, item);
        }
    }, [key, item]);

    return [item, setItem];
}

export default useLocalStorage;