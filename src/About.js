import React from 'react';
import ReactDOM from "react-dom";
import {Aboutus, ThePeople} from "./components/about/thePeople.jsx";
import {TheProject} from "./components/about/theProject.jsx";
import {NavBar} from "./components/navBar.jsx";
import {Footer} from "./components/footer.jsx";


class About extends React.Component {
    //This is the about us page and has everything to do with about us and our misson if you will
    render() {

        return (

            <div>
                <NavBar/>

                <div>
                    <h1 className="aboutUsHeader"> About Us </h1>
                </div>
                <div>
                    <div>
                        <h1 className="aboutUsSubHeaders"> The project </h1>
                        <TheProject className="abouttext"/>
                    </div>

                    <div>
                        <h1 className="aboutUsSubHeaders"> The people </h1>
                        <ThePeople className="abouttext"/>

                    </div>
                </div>
                <div>
                    <Footer/>
                </div>

            </div>
        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<About/>, app);