import React from 'react';
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

//TODO change the redirect link
//TODO MIME CHECK
export class CreateAccount extends React.Component {

    render() {
        var buttonStyle = {
            'margin': 'auto',
            'margin-top': '1em',
            'width': '25%',
            'height': '2em',
            'font-size': '5em',
            'line-height': '1.5em',
        }
        return (
            <div>
                <Jumbotron fluid>
                    <Container>
                        <h1>Oops!</h1>
                        <p>
                            The account you have logged in does not have an account
                            associated with us. Would you like to create one?
                        </p>
                    </Container>
                </Jumbotron>
                <ButtonToolbar>
                    <Button
                        variant="success"
                        href="/CHANGE"
                        style={buttonStyle}
                        >
                        Yes
                    </Button>
                    <Button
                        variant="danger"
                        href="/CHANGE"
                        style={buttonStyle}
                        >
                        No
                    </Button>
                </ButtonToolbar>
            </div>
        );
    }
}