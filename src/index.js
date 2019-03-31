import React from "react";
import ReactDOM from "react-dom";
import {Admin} from "./components/Admin.jsx";
/*
import {Pass} from "./components/Pass.jsx";
<Pass/>
*/

class App extends React.Component {

  render() {
    return (
    	<div>
  			<p className="flashpass">
	             FlashPassEDU
  			</p>
			<Admin/>

    	</div>
    );
  }
}
const app = document.getElementById('app');
ReactDOM.render(<App/>, app);
