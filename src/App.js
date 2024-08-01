import './App.css';
import {ShowList} from "./ShowList";
import {ListStudent} from "./ListStudent";
import {Link, Route, Routes} from "react-router-dom";

function App() {
    return (
        <>
            <Link to={'a'}>Page A</Link>
            <hr/>
            <Link to={'b'}>Page B</Link>
            <hr/>
            <Routes>
                <Route path={'a'} element={<ShowList/>}></Route>
                <Route path={'b'} element={<ListStudent/>}></Route>
            </Routes>
        </>
    );
}

export default App;
