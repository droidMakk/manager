import {
    EMAIL_CHANGED,
    PASS_CHANGED,
    LOGIN_USER_SUCCESS,
    CREATE_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from '../actions/types';

const INITIAL_STATE = { email: '',password: '',user: null,error: '',login_type: '', loading: false };

export default (state=INITIAL_STATE, action) => {
    switch(action.type){

        case EMAIL_CHANGED:
            return {...state, email: action.payload };
        case PASS_CHANGED:
            return {...state, password: action.payload};
        case LOGIN_USER_SUCCESS:
            return {...state, user: action.payload, error: '', login_type: 'login', loading: false};
        case CREATE_USER_SUCCESS:
            return{...state, user: action.payload,error:'', login_type: 'create', loading: false};
        case LOGIN_USER_FAIL:
            return{...state, error: 'Login User Failed', loading: false,password: ''}
        case LOGIN_USER:
            return{...state, loading: true, error: '',login_type: ''}
        default:
            return state;
    }
}
