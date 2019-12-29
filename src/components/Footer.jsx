import React from 'react';

export class Footer extends React.Component {
    //This is the footer that goes at the bottom of every page - it includes the OmniBadge email and nothing else at the moment
    render() {
        return (
            <footer>
            	<p>
	                OmniBadge™ <a href="mailto:omnibadge@omnibadge.com">Hello@OmniBadge.com</a>
            	</p>
            </footer>
        );
    }
}