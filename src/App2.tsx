import App from "./App";
import History from "./History";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

function App2(){
    return (
        <>
        <Router>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/history" element={<History/>}/>
            </Routes>
        </Router>
        
        </>
    )
}

export default App2;