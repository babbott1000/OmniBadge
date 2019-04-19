import React from 'react';
import Table from "react-bootstrap/Table";

// TODO: Integrate table with backend and Mongo

export class Students extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            log: null
        }

    }


    insertData(d){
        for (let i = 0; i < d.length; i++) {
            let table = document.getElementById("students");
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
        var insertData = this.insertData.bind();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //console.log(xhttp.responseText);
                let passes = JSON.parse(xhttp.responseText);
                insertData(passes);
            }
        };
        xhttp.open("POST", "students", true);
        xhttp.send();
    }

    render() {

        return (
            <div>
                <Table id="students" striped bordered hover size="sm">
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

