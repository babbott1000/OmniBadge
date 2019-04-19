import React from 'react';
import Table from "react-bootstrap/Table";


export class PassLog extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            log: null

        }
    }


    render() {


        return(
            <div>
                <Table id = "passes" striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Time out</th>
                    </tr>
                    </thead>
                    <tbody>


                    </tbody>
                </Table>
            </div>
        );
    }
}

