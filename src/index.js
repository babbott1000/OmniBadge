import React from "react";
import ReactDOM from "react-dom";
/*
import {Pass} from "./components/Pass.jsx";
<Pass/>
*/

//TODO: Style

class App extends React.Component {

  render() {
    return (
    	<div>
  			<p className="flashpass">
	             FlashPassEDU
  			</p>

    	</div>
    );
  }
}
const app = document.getElementById('app');
ReactDOM.render(<App/>, app);
