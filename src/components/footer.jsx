import React from 'react';

export class Footer extends React.Component {
    //This is the footer that goes at the bottom of every page - it includes the Byte pass email and nothing else at the moment
    render() {
        return (
            <div className="footerInfo">
                <p> Byte Pass </p>
                <p>Contact information: <a href="mailto:Contact@Bytepassedu.com">someone@example.com</a>.</p>
            </div>
        );
    }
}