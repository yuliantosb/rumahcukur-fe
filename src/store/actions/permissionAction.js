import Axios from "axios";
import { url } from "../../global";

const fetchPermission = (filter) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'PERMISSION',
            payload: Axios.get(`${url}/permission`, {
                params: {
                    page: filter.page,
                    perpage: filter.perpage,
                    keyword: filter.keyword,
                    ordering: filter.ordering
                },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const savePermission = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_PERMISSION',
            payload: Axios.post(`${url}/permission`, {
                description: data.description,
                name: data.name,
                parent_id: data.parent_id,
                parent_name: data.parent_name,
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const getPermission = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_PERMISSION',
            payload: Axios.get(`${url}/permission/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const updatePermission = (id, data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'UPDATE_PERMISSION',
            payload: Axios.put(`${url}/permission/${id}`, {
                description: data.description,
                name: data.name,
                parent_id: data.parent_id,
                parent_name: data.parent_name,
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}


const deletePermission = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_PERMISSION',
            payload: Axios.delete(`${url}/permission/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

export { fetchPermission, savePermission, getPermission, updatePermission, deletePermission };