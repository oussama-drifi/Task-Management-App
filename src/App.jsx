import { useEffect, useRef, useState } from 'react'
import './App.css'

// const setTheme = (newTheme) => {
//   window.localStorage.setItem("theme", new)
// }


function App() {
  const [isLiked , setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(375);

  const handleClick = () => {
    setLiked(prev => {
      if (!prev) {
        setLikesCount(prev => prev + 1)
      } else {
        setLikesCount(prev => prev - 1)
      }
      return !prev
    })
  }

  return (
    <>
      <div className="container">
        <span onClick={handleClick}><i className={isLiked ? "bi bi-heart-fill" : "bi bi-heart"}></i> {likesCount}</span>
      </div>
    </>
  )
}

export default App
