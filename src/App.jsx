import { useEffect, useRef, useState } from 'react'
import './App.css'



function App() {

  const [myRepos, setRepos] = useState([]);
  const [isContentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const response = await fetch("https://api.github.com/users/oussama-drifi/repos");
        const repos = await response.json();
        setRepos(prev => repos.slice(0, 6).map(repo => repo.name));
        setContentLoaded(prev => true);
      } catch (err) {
        setRepos(prev => ["no repos fount!"]);
        setContentLoaded(prev => true);
      }
    }, 3000)
    return () => {
      console.log("component unmounted!")
    }
  }, []);


  // ======= this is for offline test
  // setTimeout(() => {
  //   setRepos(prev => [
  //     "my repo number 1",
  //     "my repo number 2",
  //     "my repo number 3",
  //     "my repo number 4",
  //     "my repo number 5",
  //   ]);
  //   setContentLoaded(prev => true);
  // }, 1500);
  
  return (
    <>
      <h1>your repos</h1>
      <div className="container">
          <div className={`skeleton ${isContentLoaded ? "done-loading" : "" }`}>
            <span></span>
            <span></span>
          </div>
          <div className={`skeleton ${isContentLoaded ? "done-loading" : "" }`}>
            <span></span>
            <span></span>
          </div>
          <div className={`skeleton ${isContentLoaded ? "done-loading" : "" }`}>
            <span></span>
            <span></span>
          </div>
          <div className={`skeleton ${isContentLoaded ? "done-loading" : "" }`}>
            <span></span>
            <span></span>
          </div>
          <div className={`skeleton ${isContentLoaded ? "done-loading" : "" }`}>
            <span></span>
            <span></span>
          </div>
          <div className={`skeleton ${isContentLoaded ? "done-loading" : "" }`}>
            <span></span>
            <span></span>
          </div>
          {
            isContentLoaded && (
                myRepos.map(repo => (
                  <div key={repo} className="repo">
                    <span>{repo}</span>
                  </div>
                ))
            )
          }
      </div>
    </>
  )
}

export default App