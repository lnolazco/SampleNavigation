import React, { Component } from 'react';

import { signOut } from '../services/auth';

class SignOut extends Component {
    componentWillMount() {
        signOut().then(() => {
            this.props.navigation.navigate('SignedOut');
        })
    }

    render() {
        return null;
    }
}

export default SignOut;
