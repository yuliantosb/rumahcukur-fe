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

const saveCoupon = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_COUPON',
            payload: Axios.post(`${url}/coupon`, {
                name: data.name,
                value: data.value,
                start_period: moment(data.start_period).format('YYYY-MM-DD'),
                end_period: moment(data.end_period).format('YYYY-MM-DD'),
                type: data.type
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
                value: data.value,
                start_period: moment(data.start_period).format('YYYY-MM-DD'),
                end_period: moment(data.end_period).format('YYYY-MM-DD'),
                type: data.type
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