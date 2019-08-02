import Axios from "axios";
import moment from "moment";
import { url } from "../../global";

const fetchUser = (filter) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'USER',
            payload: Axios.get(`${url}/user`, {
                params: {
                    page: filter.page,
                    perpage: filter.perpage,
                    keyword: filter.keyword
                },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const saveUser = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_USER',
            payload: Axios.post(`${url}/user`, {
                name: data.name,
                email: data.email,
                phone_number: data.phone_number,
                date_of_birth: moment(data.date_of_birth).format('YYYY-MM-DD'),
                place_of_birth: data.place_of_birth,
                gender: data.gender,
                photo: data.photo,
                photo_file: data.photo_file,
                password: data.password,
                password_confirmation: data.password_confirmation,
                role_id: data.role_id
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const getUser = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_USER',
            payload: Axios.get(`${url}/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const updateUser = (id, data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_USER',
            payload: Axios.put(`${url}/user/${id}`, {
                name: data.name,
                email: data.email,
                phone_number: data.phone_number,
                date_of_birth: moment(data.date_of_birth).format('YYYY-MM-DD'),
                place_of_birth: data.place_of_birth,
                gender: data.gender,
                photo: data.photo,
                photo_file: data.photo_file,
                password: data.password,
                password_confirmation: data.password_confirmation,
                role_id: data.role_id
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}


const deleteUser = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_USER',
            payload: Axios.delete(`${url}/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

export { fetchUser, saveUser, getUser, updateUser, deleteUser };