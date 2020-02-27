import { Link } from 'react-router-dom';

import React from 'react';

type MProps = {
    test: boolean
};
type MState = {

};
class MarketWindow extends React.Component<MProps, MState> {
    constructor(props: any) {
        super(props);
    }
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