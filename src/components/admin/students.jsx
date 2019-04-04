import React from 'react';
import Table from "react-bootstrap/Table";

//TODO: Integrate table with backend and Mongo

export class Students extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            out: null
        }
    }
    render() {
        return(
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
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Bjacob</td>
                        <td>Thornton</td>
                        <td>fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>twitter</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

