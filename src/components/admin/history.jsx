import React from 'react';
import Table from "react-bootstrap/Table";


//TODO rename to pass log

export class History extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            log: null

        }
        this.addRows = this.addRows.bind(this);
    }

    addRows(d){
        for (let i = 0; i < d.length; i++) {
            let table = document.getElementById("logtb");
            let row = table.insertRow(i + 1);
            let index = row.insertCell(0);
            let firstName = row.insertCell(1);
            let lastName = row.insertCell(2);
            let email = row.insertCell(3);
            index.innerHTML = i + 1;
            firstName.innerHTML = d[i].firstName;
            lastName.innerHTML = d[i].lastName;
            email.innerHTML = d[i].email;

        }
    }
    componentDidMount() {
        var passLog =  [{ "firstName": "jack", "lastName": "baude", "email": "jackbaude@gmail.com" }, { "firstName": "jack", "lastName": "baude", "email": "jackbaude@gmail.com" }];


        this.addRows(passLog);
    }

    render() {


        return(
            <div>
                <Table
                    id = "logtb"
                    striped bordered hover size="sm">
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

