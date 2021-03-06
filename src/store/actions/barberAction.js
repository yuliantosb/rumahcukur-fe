import Axios from "axios";
import { url } from "../../global";

const fetchBarber = (filter) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'BARBER',
            payload: Axios.get(`${url}/barber`, {
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

const saveBarber = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_BARBER',
            payload: Axios.post(`${url}/barber`, {
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

const getBarber = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_BARBER',
            payload: Axios.get(`${url}/barber/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const updateBarber = (id, data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'UPDATE_BARBER',
            payload: Axios.put(`${url}/barber/${id}`, {
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


const deleteBarber = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_BARBER',
            payload: Axios.delete(`${url}/barber/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

export { fetchBarber, saveBarber, getBarber, updateBarber, deleteBarber };