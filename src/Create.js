import React from 'react';
import ReactDOM from "react-dom";

import {CreateAccount} from "./components/create/createAccount.jsx";

class Create extends React.Component{

    render() {
        return(
            <div>
                <CreateAccount/>
            </div>
        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<Create/>, app);