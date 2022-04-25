import { useEffect, useRef } from 'react'

const UseEventHandler = (channel, event, handler) => {

    const handle = useRef(handler);
    handle.current = handler;

    useEffect(()=>{
        if(channel === null){
            return;
        }
        const ref = channel.on(event, message => {
            handle.current(message);
        });
        return () => {
            channel.off(event, ref);
        }
    }, [channel, event]);
}

export default UseEventHandler
