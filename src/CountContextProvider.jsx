import { createContext, useContext, useState } from "react"

const CountContext = createContext();
const SetCountContext = createContext();

// // custom hooks to get state and its updater
const useCount = () => useContext(CountContext);
const useSetCount = () => useContext(SetCountContext);

const CountProvider = ({children}) => {
    
    // create state
    const [count, setCount] = useState(6);
    // create state handler
    const handleCount = () => {
        setCount(count + 1);
    }
    
    return (
        <CountContext.Provider value={count}>
            <SetCountContext value={setCount}>
                {children}
            </SetCountContext>
        </CountContext.Provider>
    )
    
}

export { CountProvider, useCount, useSetCount }