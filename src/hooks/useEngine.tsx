import {useState, useCallback, useEffect} from "react";
import useCountdown from "./useCountdown";
import useWords from "./useWords";
import useTyped from "./useTyped";
import {countErrors} from "../utils/helpers";

export type State = 'start' | 'run' | 'finish';

const words_num = 12;
const useEngine = (initialTime: number)=>{

  
    const [state, setState] = useState<State>('start');
    const {words, updateWords} = useWords(words_num);
    const {timeLeft, startCountdown, resetCountdown} = useCountdown(initialTime);
    const { typed, 
      cursor, clearTyped, resetTotalTyped, totalTyped} = useTyped(state !== "finish");


    const [errors, setErrors] = useState(0);
   
    
    
    const isStarting = state === "start" && cursor > 0;
    const areWordsEnds = cursor === words.length;

    const restart = useCallback(()=>{
        resetCountdown();
        resetTotalTyped();
        setState("start");
        setErrors(0);
        updateWords();
        clearTyped();

      }, [clearTyped, updateWords, resetCountdown, resetTotalTyped]);

    const sumErrors = useCallback(()=>{
        const wordsReached = words.substring(0, Math.min(cursor, words.length));
        setErrors((prevErr)=> prevErr + countErrors(typed, wordsReached));

    }, [typed, words, cursor]);

    useEffect(() => {
        if (isStarting) {
          setState("run");
          startCountdown();
        }
      }, [isStarting, startCountdown]);
    
  

    useEffect(()=>{
        if (!timeLeft && state === "run") {
            
            setState("finish");
            sumErrors();
          } 
    }, [timeLeft, state, sumErrors]);

    useEffect(() => {
        if (areWordsEnds) {
        
          sumErrors();
          updateWords();
          clearTyped();
        }
      }, [clearTyped, areWordsEnds, updateWords, sumErrors]);

      

    return { state, words, timeLeft , typed, errors, totalTyped, restart};

}

export default useEngine;