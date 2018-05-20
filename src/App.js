import React, { Component } from 'react';
import ReduxThunk from "redux-thunk";
import { View } from "react-native";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import reducer from './reducers';
import firebase from 'firebase';
import LoginForm  from './components/LoginForm';
import RouterComponent from './Router';

export default class App extends Component{

  componentWillMount = () => {
    const config =  {
      apiKey: "AIzaSyDKmjvA807Mhtfhr5223B6w3-g4Q9gMobo",
      authDomain: "manager-own.firebaseapp.com",
      databaseURL: "https://manager-own.firebaseio.com",
      projectId: "manager-own",
      storageBucket: "",
      messagingSenderId: "916726448595"
    };

    firebase.initializeApp(config);
  };
  

  render(){

    const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));

    return(
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    )
  }
}
