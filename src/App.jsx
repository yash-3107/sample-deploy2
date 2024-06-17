import Header from "./components/header/headers"
import Instruction from "./components/instructions/instructions"
import Quiz from "./components/quiz/quiz"
import "./App.css"
import {useState , useEffect} from "react";
import { useRef } from 'react';

function App() {
  const [minute, setMinute] = useState(9);
  const [second, setSecond] = useState(59);
  const [isActive, setIsActive] = useState(false);
  const [complete,setComplete] = useState(true);
  const appRef = useRef(null);


  const toggleFullScreen = () => {
    const element = appRef.current;
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch(err => {
        console.error("Failed to enter fullscreen mode:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    toggleFullScreen();
  },[isActive])

  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => {
        setSecond((prevSecond) => {
          if (prevSecond === 0) {
            return updateMinute();
          }
          return prevSecond - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive]);

  const updateMinute = () => {
    setMinute((prevMinute) => {
      if (prevMinute === 0) {
        setIsActive(false);
        setComplete(false);
        return 0;
      }
      return prevMinute - 1;
    });
    return 59;
  };

  const handleStartClick = () => {
    setIsActive(true);
  };

  return(
    <div ref={appRef} className="app">
            <Header min={minute} sec={second} />
            {isActive ? <Quiz/>:<Instruction/>}
            <button onClick={handleStartClick} disabled={isActive} style={{
                                                                          backgroundColor: isActive ? '#ccc' : '#007bff',
                                                                          cursor: isActive ? 'not-allowed' : 'pointer',
                                                                          opacity: isActive ? 0.6 : 1,
              }}>Start Quiz</button>
            {(!complete) && <div className="modal">
                                  < div className="overlay">
                                                  <h2>You are out of time....</h2>
                                  </div >
                             </div>
              }
                
    </div>
               
  )
}


export default App
