import { Link } from 'react-router-dom';

import React from 'react';

class MarketWindow extends React.Component {
    render() {
        return (
            <div>
                <h1>Market Window page</h1>
                <Link to="/"> Back to home </Link>
            </div>
        );
    }
}

export default MarketWindow;