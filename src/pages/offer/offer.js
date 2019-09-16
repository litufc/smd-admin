import React, { Component } from 'react';
import  { FirebaseContext } from '../../firebase/firebase-module';

export default class Offer extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <FirebaseContext.Consumer>
                {firebase => {
                    return <div>I've access to Firebase and render something.</div>;
                }}
            </FirebaseContext.Consumer>
        )
    }
}