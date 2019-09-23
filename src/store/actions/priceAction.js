import Axios from "axios";
import { url } from "../../global";

const fetchPrice = (filter) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'PRICE',
            payload: Axios.get(`${url}/price`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const savePrice = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_PRICE',
            payload: Axios.post(`${url}/price`, {
                price_per_km: data.price_per_km,
                price_male: data.price_male,
                price_female: data.price_female
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

export { fetchPrice, savePrice }