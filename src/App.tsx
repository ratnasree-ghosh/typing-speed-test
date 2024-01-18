import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './index.css';

import {useState, useRef} from "react";
// import StartBtn from './components/StartBtn';
import TestBtn from './components/TestBtn';
import Results from './components/Results';
import UserTyped from './components/UserTyped';
import useEngine from './hooks/useEngine';
import { calculateAccuracyPercentage } from './utils/helpers';


function App() {

 const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState<number>(30); 
  
  // const [results, setResults] = useState(()=>{
  //   const storedResults = localStorage.getItem('results');
  //   // console.log(storedResults);
  //   return storedResults ? JSON.parse(storedResults): null
  // })

  const testBtnRef = useRef<HTMLButtonElement>(null);

  let { state, words, timeLeft, typed, errors, restart, totalTyped , spaceCount} = useEngine(selectedTime);

  let count = 0;
  let store:any = [];
  useEffect(() => {
    // Automatically click the startBtn when selectedTime changes
    if (testBtnRef.current) {
      testBtnRef.current.click();
    }

    // if(errors){
    //   localStorage.setItem("errors", JSON.stringify(errors));
    // }
    
  }, [selectedTime]);
  
  function handleHistory(){
    navigate('/history');
  }
  

  const handleTimerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTime = parseInt(event.target.value);
    setSelectedTime(newTime);
    console.log(selectedTime);
    
  };

  var time = selectedTime/60;

  // useEffect(() => {
  //   // Update results whenever state, errors, or totalTyped changes
  //   ++count;
  //   const newResults = {
  //     count,
  //     totalTyped,
  //     errors,
  //     state,
  //     time
  //   };
  //   setResults(newResults);
    


  //   // Save results to localStorage
  //   localStorage.setItem('results', JSON.stringify(newResults));
  // }, [state, errors, totalTyped, time]);

  

  return (
    <>
    <div className='history-con'>
      <button id="history" onClick={handleHistory}>History</button>
    </div>
    <select name="timer" id="timer" onChange={handleTimerChange} value={selectedTime} style={{'color': 'blue', marginBottom:"15px"}} >
      <option value="30">30 sec</option>
      <option value="60">60 sec</option>
      <option value="120">2 min</option>
    
    </select>
      <CountdownTimer timeLeft={timeLeft} />
      

      <div className='relative text-3xl max-w-xl leading-relaxed break-all mt-3'>
        <RandomWords words={words} />
        <UserTyped className='absolute inset-0' userInput={typed} words={words} />
      </div>

      

      <TestBtn
      ref={testBtnRef}
      onStart={restart}
      className={'mx-auto mt-10 text-slate-500'}/>

       
      <Results state={state} errors={errors} className="mt-10" accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)} cpm={totalTyped} correctTyped={totalTyped - errors} wpm={spaceCount} />

      
        
        
      {/* <Results state={results.state} errors={results.errors} className="mt-10" accuracyPercentage={calculateAccuracyPercentage(results.errors, results.totalTyped)} total={results.totalTyped} correctTyped={results.totalTyped - results.errors} wpm={results.totalTyped /5/results.time} /> */}

    </>
  )

}


function RandomWords({ words }: { words: string }) {
  return <div className='text-slate-500 '>{words}</div>

}

function CountdownTimer({ timeLeft }: { timeLeft: number }) {
  return <h2 className='text-primary-400 font-medium'>Time: {timeLeft}s</h2>
}




export default App;
