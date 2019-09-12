import React from 'react';
import ReactDOM from "react-dom";
import {Footer} from "./components/footer.jsx";


class ErrorNotFound extends React.Component{

    render() {
        return(
            <div>


                <h1 className="header"> BRUHHHHH </h1>
                <Footer/>
            </div>

        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<ErrorNotFound/>, app);