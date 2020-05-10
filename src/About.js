import React from 'react';
import ReactDOM from "react-dom";
import { NavBar } from "./components/NavBar.jsx";
import { Footer } from "./components/Footer.jsx";


class About extends React.Component {
    //This is the about us page and has everything to do with about us and our misson if you will
    render() {

        return (

            <div>
                <NavBar/>

                <div className="about">
                    <h1>About Us</h1>
                    <div>
                        <h2>The project</h2>
                        <p>OmniBadge is a hall pass system that was founded at Stillwater Area High School, originally between several students, although the project only currently has one developer. The pass system includes an inexpensive physical pass for all students along with a scanner for each physical classroom, allowing for better safety of students while also being lightweight and easy to use. The project is aimed at creating a reliable system that easy to use, safe and solves many of the issues with other pass technologies.</p>
                    </div>

                    <div>
                        <h2>The people</h2>
                        <p>Ben is the main devloper behind the OmniBadge project. Ben manages everthing from and web development to infrastructure managment to circuit board design.  He thoroughly enjoys a good challenge and is also the current captain of SAHS's <a href="https://frc2508.org">FIRST robotics team</a>.</p>
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