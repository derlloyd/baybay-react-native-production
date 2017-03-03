import React, { Component } from 'react';
// import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyDKI64j7v4UwZQfcFbNf6r0ixhs595NH10',
            authDomain: 'baybay-6dacb.firebaseapp.com',
            databaseURL: 'https://baybay-6dacb.firebaseio.com/'
        };

        firebase.initializeApp(config);
    }

    render() {
        // 3rd arg is for store enhancer, thunk middleware
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
