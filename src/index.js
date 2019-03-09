import React from "react";
import ReactDOM from "react-dom";
import Test from "./components/component.jsx"

class Layout extends React.Component {
  render() {
    return (
    	<div>
			<p style={{"font-size": "128px"}}>
	            TEST TEST TEST
			</p>
			<Test/>
		</div>
    );
  }
}

const app = document.getElementById('app');

ReactDOM.render(<Layout/>, app);
