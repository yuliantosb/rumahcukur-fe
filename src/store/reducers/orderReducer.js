const initState = {
	fetching: false,
	fetched: false,
	error: null,
	payload: {},
	saved: false,
	message: null,
	order: {},
	isDeleted: false,
};

const orderReducer = (state = initState, action) => {
	switch (action.type) {
		case 'ORDER_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'ORDER_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'ORDER_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				payload: action.payload.data,
				error: null,
				saved: false,
				isDeleted: false
			};
		case 'SAVE_ORDER_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'SAVE_ORDER_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'SAVE_ORDER_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'GET_ORDER_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'GET_ORDER_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'GET_ORDER_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				order: action.payload.data,
				error: null,
				saved: false,
			};
		case 'UPDATE_ORDER_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'UPDATE_ORDER_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'UPDATE_ORDER_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'DELETE_ORDER_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'DELETE_ORDER_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'DELETE_ORDER_FULFILLED':
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

export default orderReducer;
