import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import Firebase, { FirebaseContext } from './firebase/firebase-module';
import * as serviceWorker from './serviceWorker';

const app = (
    <FirebaseContext.Provider value={new Firebase()}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </FirebaseContext.Provider>
)

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
