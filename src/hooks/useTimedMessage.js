// this hook I took from the solution because it seems like a pretty cool 
// functionality to have. Hopefully I'll remember that I have this code for 
// future projects

import { useRef, useState, useEffect } from 'react';

// adds an item in state that can then be removed after a specified time
// in this case a message will be displayed for that specified time
// then be removed

function useTimeMessage() {
    const [ active, setActive ] = useState(false);

    const messageShownRef = useRef(false);

    useEffect(
        function showSavedMessage() {
            if (active && !messageShownRef.current) {
                messageShownRef.current = true;
                setTimeout(function removeMessage() {
                    setActive(false);
                    messageShownRef.current = false
                }, timeInMilliseconds);
            }
        }, [active, timeInMilliseconds],
    );

    return [ active, setActive ];
 }

export default useTimeMessage;