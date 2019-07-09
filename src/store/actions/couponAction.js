import Axios from "axios";
import moment from "moment";
import { url } from "../../global";

const fetchCoupon = (filter) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'COUPON',
            payload: Axios.get(`${url}/coupon`, {
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

const saveCoupon = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_COUPON',
            payload: Axios.post(`${url}/coupon`, {
                name: data.name,
                place_of_birth: data.place_of_birth,
                date_of_birth: moment(data.date_of_birth).format('YYYY-MM-DD'),
                email: data.email,
                phone_number: data.phone_number,
                address: data.address,
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const getCoupon = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_COUPON',
            payload: Axios.get(`${url}/coupon/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const updateCoupon = (id, data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_COUPON',
            payload: Axios.put(`${url}/coupon/${id}`, {
                name: data.name,
                place_of_birth: data.place_of_birth,
                date_of_birth: moment(data.date_of_birth).format('YYYY-MM-DD'),
                email: data.email,
                phone_number: data.phone_number,
                address: data.address,
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}


const deleteCoupon = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_COUPON',
            payload: Axios.delete(`${url}/coupon/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

export { fetchCoupon, saveCoupon, getCoupon, updateCoupon, deleteCoupon };