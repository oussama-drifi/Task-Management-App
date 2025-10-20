import { useEffect, useRef, useState } from 'react'
import './App.css'



function App() {

  const [myRepos, setRepos] = useState([]);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const response = await fetch("https://api.github.com/users/oussama-drifi/repos");
        const repos = await response.json();
        setRepos(prev => repos.map(repo => repo.name));
      } catch (err) {
        setRepos(prev => ["no repos fount!"])
      }
    }, 3000)
    return () => {
      console.log("component unmounted!")
    }
  }, []);
  
  return (
    <>
      <h1>your repos</h1>
      <div className="container">
          <span className={myRepos.length !== 0 ? "d-none" : undefined}>loading...</span>
          {myRepos && (<ul>
            {
              myRepos.map(repo => (<li key={repo}>{repo}</li>))
            }
          </ul>)}
      </div>
    </>
  )
}

export default App
