import React from "react";
import ReactDOM from "react-dom";
import Test from "./components/component.jsx"

class App extends React.Component {
  render() {
    return (
    	<div>
			<p style={{"font-size": "128px"}}>
	            FlashPassEDU
			</p>
			<Test/>
		</div>
    );
  }
}

const app = document.getElementById('app');

ReactDOM.render(<App/>, app);
