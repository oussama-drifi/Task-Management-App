import { createContext, useContext, useState } from "react"

const CountContext = createContext();
const SetCountContext = createContext();

const useCount = () => useContext(CountContext);
const useSetCount = () => useContext(SetCountContext);

const CountProvider = ({children}) => {
    
    const [count, setCount] = useState(6);
    
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