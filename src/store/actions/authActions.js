import axios from "axios";
import { url } from '../../global';

export const login = (creds) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'LOGIN',
            payload: axios.post(`${url}/login-admin`, {
                email: creds.email,
                password: creds.password
            })
        })
    }
}