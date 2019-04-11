import React from 'react';
import Table from "react-bootstrap/Table";

//TODO use the table.insertRow() method to dynamically add rows to the tables

export class History extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            out: null
        }
    }
    render() {
       var passLog =  { "firstName": "jack", "lastName": "baude", "teacher": "springer" }
        return(
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Time out</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>12:31</td>
                    </tr>

                    </tbody>
                </Table>
            </div>
        );
    }
}

