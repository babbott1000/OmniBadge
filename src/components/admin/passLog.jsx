import React from 'react';
import Table from "react-bootstrap/Table";


export class PassLog extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            log: null

        }
    }
    insertData(d){
        for (let i = 0; i < d.length; i++) {
            let table = document.getElementById("passes");
            let row = table.insertRow(i + 1);
            let index = row.insertCell(0);
            let firstName = row.insertCell(1);
            let lastName = row.insertCell(2);
            let email = row.insertCell(3);
            let timeOut = row.insertCell(4);
            let duration = row.insertCell(5)
            let origin = row.insertCell(6);
            let destination = row.insertCell(7);
            index.innerHTML = i + 1;

            firstName.innerHTML = d[i].firstName;
            lastName.innerHTML = d[i].lastName;
            email.innerHTML = d[i].email;
            timeOut.innerHTML = d[i].time;
            duration.innerHTML = d[i].duration
            origin.innerHTML = d[i].teacher;
            destination.innerHTML = d[i].teacher;
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
        xhttp.open("POST", "passLog", true);
        xhttp.send();
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

