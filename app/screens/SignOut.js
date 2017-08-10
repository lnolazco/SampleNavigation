import React, { Component } from 'react';

import { onSignOut } from '../services/auth';

class SignOut extends Component {
    componentWillMount() {
        onSignOut().then(() => {
            this.props.navigation.navigate('SignedOut');
        })
    }

    render() {
        return null;
    }
}

export default SignOut;
