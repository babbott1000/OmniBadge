import React from 'react';

export class Footer extends React.Component {
    //This is the footer that goes at the bottom of every page - it includes the OmniBadge email and nothing else at the moment
    render() {
        return (
            <footer>
            	<p>
                    &copy;2019-{new Date().getFullYear()}&nbsp;OmniBadge<br></br>Contact&nbsp;<a href="mailto:omnibadge@omnibadge.com">hello@omnibadge.com</a>
            	</p>
            </footer>
        );
    }
}