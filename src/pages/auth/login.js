import React, { Component } from 'react';

import  { FirebaseContext } from '../../firebase/firebase-module';

import LoginForm from '../../components/auth/loginForm'

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    emailChange = (event) => {
        this.setState({email: event.target.value})
    }

    passwordChange = (event) => {
        this.setState({password: event.target.value})
    }

    render(){
        return(
            <FirebaseContext.Consumer>
                {firebase => {
                    return  <LoginForm firebase={firebase}
                                       emailChange={this.emailChange}
                                       passwordChange={this.passwordChange}
                            />
                }}
            </FirebaseContext.Consumer>
        )
    }
}

