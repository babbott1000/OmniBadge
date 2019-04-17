import React from 'react';
import Table from "react-bootstrap/Table";

/*TODO: Integrate table with backend and Mongo


*/
export class Students extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            log: null
        }

    }



    render() {

        return (
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </Table>
            </div>
        );
    }
}

