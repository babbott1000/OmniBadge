import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.css";
class Layout extends React.Component {
  render() {
    return (
		<p style={{"font-size": "128px"}}>

		</p>
    );
  }
}

const app = document.getElementById('app');

ReactDOM.render(<Layout/>, app);
