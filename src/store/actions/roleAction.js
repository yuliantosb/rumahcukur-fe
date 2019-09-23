import Axios from "axios";
import { url } from "../../global";

const fetchRole = (filter) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'ROLE',
            payload: Axios.get(`${url}/role`, {
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

const saveRole = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_ROLE',
            payload: Axios.post(`${url}/role`, {
                description: data.description,
                name: data.name,
                permissions: data.checked,
                is_admin: data.is_admin,
                can_access_admin_panel: data.can_access_admin_panel
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const getRole = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_ROLE',
            payload: Axios.get(`${url}/role/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const updateRole = (id, data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'UPDATE_ROLE',
            payload: Axios.put(`${url}/role/${id}`, {
                description: data.description,
                name: data.name,
                permissions: data.checked,
                is_admin: data.is_admin,
                can_access_admin_panel: data.can_access_admin_panel
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}


const deleteRole = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_ROLE',
            payload: Axios.delete(`${url}/role/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

export { fetchRole, saveRole, getRole, updateRole, deleteRole };