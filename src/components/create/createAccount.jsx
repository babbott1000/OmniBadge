import React from 'react';
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

//TODO change the redirect link
//TODO MIME CHECK
export class CreateAccount extends React.Component {

    render() {
        return (
            <div>
                <h1>The account you have logged in does not have an account
                    associated with us.
                </h1>
                <br/>
                <h1>Would you like to create one?</h1>
                <ButtonToolbar>
                    <Button
                        variant="Success"
                        size="lg"
                        href="/CHANGE"
                        block>
                        Yes
                    </Button>
                    <Button
                        variant="Danger"
                        size="lg"
                        href="/CHANGE"
                        block>
                        No
                    </Button>
                </ButtonToolbar>
            </div>
        );
    }
}