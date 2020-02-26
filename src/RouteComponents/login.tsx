import { Link } from 'react-router-dom';

import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <div>
                <h1>Log in page</h1>
                <Link to="../Hpage/home"> Back to home </Link>
            </div>
        );
    }
}

export default Login;