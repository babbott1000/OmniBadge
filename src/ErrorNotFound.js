import React from 'react';
import ReactDOM from "react-dom";


class ErrorNotFound extends React.Component{

    render() {
        return(
            <div>


                <h1 className="header"> BRUHHHHH </h1>
            </div>
        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<ErrorNotFound/>, app);