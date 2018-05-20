import {
    EMAIL_CHANGED,
    PASS_CHANGED,
    LOGIN_USER_SUCCESS,
    CREATE_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from './types';
import firebase from 'firebase';
import { Actions } from "react-native-router-flux";

export const emailChanged=(text)=> {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged=(password)=>{
    return {
        type: PASS_CHANGED,
        payload: password
    }
}

export const loginUser = ({email, password}) => {
    return (dispatch) => {
        dispatch({type: LOGIN_USER})
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(user => loginUserSuccess(dispatch, user)).catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(user => createUserSuccess(dispatch, user))
            .catch(() => loginUserFail(dispatch));
        });
    };
};

const loginUserFail = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAIL
    })
}

const  loginUserSuccess = (dispatch,user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    Actions.employeeList();
}

const createUserSuccess = (dispatch, user) => {
    dispatch({
        type: CREATE_USER_SUCCESS,
        payload: user
    })
}