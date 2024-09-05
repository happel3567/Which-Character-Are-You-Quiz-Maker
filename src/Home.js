import react from "react";
import { Navigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const [goToCreate, goCreate] = react.useState(false);
    const [goToPlay, goPlay] = react.useState(false);

    if (goToCreate) {
        return <Navigate to="/Create"/>
    }

    if (goToPlay) {
        return <Navigate to="/Play"/>
    }

    return (
        <div className="Home">
            <button onClick={() => {goCreate(true)}}className="first" >Create Quiz</button>
            <button onClick={() => {goPlay(true)}}className="second">Play Existing Quiz</button>
        </div>
    );
}



export default Home;
