import Axios from "axios";
import { url } from "../../global";
import moment from "moment";

const fetchOrder = (filter) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'ORDER',
            payload: Axios.get(`${url}/statement`, {
                params: {
                    page: filter.page,
                    perpage: filter.perpage,
                    keyword: filter.keyword,
                    ordering: filter.ordering,
                    date_from: moment(filter.date_from).format('YYYY-MM-DD'),
                    date_to: moment(filter.date_to).format('YYYY-MM-DD')
                },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const saveOrder = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_ORDER',
            payload: Axios.post(`${url}/statement`, {
                name: data.name,
                address: data.address,
                latitude: data.latitude,
                longitude: data.longitude,
                province: data.province,
                regency: data.regency,
                district: data.district,
                village: data.village,
                city: data.city,
                phone: data.phone,
                email: data.email,
                status: data.status,
                photo: data.photo,
                photo_file: data.photo_file,
                id_card: data.id_card,
                id_card_file: data.id_card_file,
                gender: data.gender,
                is_hijab: data.is_hijab
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const getOrder = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_ORDER',
            payload: Axios.get(`${url}/statement/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const updateOrder = (id, data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'UPDATE_ORDER',
            payload: Axios.put(`${url}/statement/${id}`, {
                name: data.name,
                address: data.address,
                latitude: data.latitude,
                longitude: data.longitude,
                province: data.province,
                regency: data.regency,
                district: data.district,
                village: data.village,
                city: data.city,
                phone: data.phone,
                email: data.email,
                status: data.status,
                photo: data.photo,
                photo_file: data.photo_file,
                id_card: data.id_card,
                id_card_file: data.id_card_file,
                gender: data.gender,
                is_hijab: data.is_hijab
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}


const deleteOrder = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_ORDER',
            payload: Axios.delete(`${url}/statement/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

export { fetchOrder, saveOrder, getOrder, updateOrder, deleteOrder };