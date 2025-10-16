import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [selected, setSelected] = useState("");

  

  return (
    <>
      <div className="payment-methods">
        choose your payment gateway
        <ul>
          <li onClick = {() => setSelected(prev => "apple")} className={selected === "apple" ? "selected" : undefined} key="apple"><i className="bi bi-apple"></i> Apple Pay</li>
          <li onClick = {() => setSelected(prev => "google")} className={selected === "google" ? "selected" : undefined} key="google"><i className="bi bi-google"></i> Google Pay</li>
          <li onClick = {() => setSelected(prev => "credit")} className={selected === "credit" ? "selected" : undefined} key="credit-card"><i className="bi bi-credit-card"></i> Credit Card</li>
        </ul>
      </div>
    </>
  )
}

export default App
