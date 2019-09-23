const initState = {
	fetching: false,
	fetched: false,
	error: null,
	payload: {},
	saved: false,
	message: null,
	role: {},
	isDeleted: false,
};

const roleReducer = (state = initState, action) => {
	switch (action.type) {
		case 'ROLE_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'ROLE_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'ROLE_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				payload: action.payload.data,
				error: null,
				saved: false,
				isDeleted: false
			};
		case 'SAVE_ROLE_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'SAVE_ROLE_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'SAVE_ROLE_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'GET_ROLE_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'GET_ROLE_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'GET_ROLE_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				role: action.payload.data,
				error: null,
				saved: false,
			};
		case 'UPDATE_ROLE_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'UPDATE_ROLE_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'UPDATE_ROLE_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'DELETE_ROLE_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'DELETE_ROLE_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'DELETE_ROLE_FULFILLED':
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

export default roleReducer;
