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

  // const [houres, setHoure] = useState("00");
  // const [minutes, setMinutes] = useState("00");
  // const [seconds, setSeconds] = useState("00");

  // useEffect(() => {
  //   setInterval(() => {
  //     if (Number(seconds) <= 59) {
  //       setSeconds(prev => toString(Number(prev) + 1))
  //     } else {
  //       if (Number())
  //     }
  //   }, 1000);
  // }, [seconds])
  
  return (
    <>
      {/* <div className="clock">
          <div className="houres"><span>{houres}</span><span>houres</span></div>
          <div className="minutes"><span>{minutes}</span><span>minutes</span></div>
          <div className="seconds"><span>{seconds}</span><span>seconds</span></div>
      </div> */}
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