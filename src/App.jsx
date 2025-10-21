import { useEffect, useRef, useState } from 'react'
import './App.css'



function App() {

  // const [myRepos, setRepos] = useState([]);
  // const [isContentLoaded, setContentLoaded] = useState(false);

  // useEffect(() => {
  //   setTimeout(async () => {
  //     try {
  //       const response = await fetch("https://api.github.com/users/oussama-drifi/repos");
  //       const repos = await response.json();
  //       setRepos(prev => repos.slice(0, 6).map(repo => repo.name));
  //       setContentLoaded(prev => true);
  //     } catch (err) {
  //       setRepos(prev => ["no repos fount!"]);
  //       setContentLoaded(prev => true);
  //     }
  //   }, 3000)
  //   return () => {
  //     console.log("component unmounted!")
  //   }
  // }, []);

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

  const [hours, setHour] = useState(0);
  const [minutes, setMinutes] = useState(59);
  const [seconds, setSeconds] = useState(0);


  // keep incrementing by a second
  useEffect(() => {
    const interval = setInterval(() => {
        setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [])


  // increment minutes
  useEffect(() => {
    if (seconds > 59) {
      setSeconds(0);
      setMinutes(prev => prev + 1);
    }
  }, [seconds]);

  // increment houres
  useEffect(() => {
    if (minutes > 59) {
      setMinutes(0);
      setHour(prev => prev + 1);
    }
  }, [minutes]);

  const mySeconds = String(seconds).padStart(2, '0');
  const myMinutes = String(minutes).padStart(2, '0');
  const myHoures = String(hours).padStart(2, '0');
  
  return (
    <>
      {/* <h1>your repos</h1>
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
          } */}
      {/* </div> */}
    </>
  )
}

export default App