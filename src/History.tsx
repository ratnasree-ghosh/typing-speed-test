import { tr } from "@faker-js/faker";
import { useNavigate } from 'react-router-dom';

function History(){

    const navigate = useNavigate();
    function getHis(){
        let res = localStorage.getItem('store');
        if(res===undefined || res=== null){
            return false;
        }else{
            return JSON.parse(res);
        }
    }
    
    let his =  getHis();
    console.log(his);
    return (
        
        <div id="history-box">
        
        
        <div className='history-con'>
      <button id="history" onClick={()=> navigate('/')}>Home</button>
    </div>
        
        {his? (
            <>
            <h1 style={{textAlign: 'center', marginBottom: '25px', fontSize: '23px'}}>History</h1>
        <table>
            <tr>
                <th>Total Typed</th>
                <th>Accuracy Percentage</th>
                <th>Correctly Typed</th>
                <th>Errors</th>
                <th>WPM</th>
                <th>Current Time</th>
            </tr>
            {his.map((e:any)=>{
               return <tr>
                    <td>{e.cpm}</td>
                    <td>{e.accuracyPercentage}</td>
                    <td>{e.cpm-e.errors}</td>
                    <td>{e.errors}</td>
                    <td>{e.wpm}</td>
                    <td>{e.current_time}</td>
                </tr>
            })}
        </table>
        </>
        )
        : <h3 style={{marginBottom: '15px'}}>No History Found!</h3>
        
    }
        
        </div>
    )
    
}

export default History;