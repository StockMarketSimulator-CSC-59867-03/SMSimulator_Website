import { Link } from 'react-router-dom';

import React from 'react';

class MarketData extends React.Component {
    render() {
        return (
            <div>
                <h1>MarketData page</h1>
                <Link to="/"> Back to home </Link>
            </div>
        );
    }
}

export default MarketData;