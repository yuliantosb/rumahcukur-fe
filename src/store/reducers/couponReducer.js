const initState = {
	fetching: false,
	fetched: false,
	error: null,
	payload: {},
	saved: false,
	message: null,
	coupon: {},
	isDeleted: false,
};

const couponReducer = (state = initState, action) => {
	switch (action.type) {
		case 'COUPON_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'COUPON_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'COUPON_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				payload: action.payload.data,
				error: null,
				saved: false,
				isDeleted: false
			};
		case 'SAVE_COUPON_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'SAVE_COUPON_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'SAVE_COUPON_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'GET_COUPON_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'GET_COUPON_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'GET_COUPON_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				coupon: action.payload.data,
				error: null,
				saved: false,
			};
		case 'UPDATE_COUPON_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'UPDATE_COUPON_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'UPDATE_COUPON_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'DELETE_COUPON_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'DELETE_COUPON_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'DELETE_COUPON_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				isDeleted: true
			};
		default:
			return state;
	}
};

export default couponReducer;
