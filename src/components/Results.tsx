import { State } from "../hooks/useEngine";
import {formatPercentage} from "../utils/helpers";

const Results = ({
    errors,
    state,
    accuracyPercentage,
    total,
    wpm,
    className="",
    correctTyped,
}: {
    state: State
    errors: number;
    accuracyPercentage: number;
    total: number;
    wpm: number;
    correctTyped: number;
    className?: string;
}) => {

    if(state !== 'finish'){
        return null;
    }

    
    function isValid(){
       let res = localStorage.getItem('store');
       console.log(res);
       if(res === undefined || res=== null){
        return [];
       }else{
        return JSON.parse(res);
       }
    }
    
    if(errors>0){
        let res = {
            errors,
            accuracyPercentage:formatPercentage(accuracyPercentage) ,
            total,
            wpm,
            correctTyped,
            current_time: new Date(),
        }
        let variable = isValid();
        // console.log(variable);
        variable.push(res);
        // console.log(res);
         
         localStorage.setItem("store", JSON.stringify(variable));
        
    }
    // console.log(store);
    return (
        <ul className={`flex flex-col items-center text-primary-400 space-y-3 ${className}`}>
            <li className="text-xl font-semibold">Results:</li>
            <li>Accuracy: {formatPercentage(accuracyPercentage)}</li>
            <li className="text-red-500">Errors: {errors}</li>
            <li>WPM: {wpm}</li>
            <li>Total Typed: {total}</li>
            <li>Correctly Typed: {correctTyped}</li>

        </ul>
    )
}

export default Results;