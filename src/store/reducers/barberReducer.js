const initState = {
	fetching: false,
	fetched: false,
	error: null,
	payload: {},
	saved: false,
	message: null,
	barber: {},
	isDeleted: false,
};

const barberReducer = (state = initState, action) => {
	switch (action.type) {
		case 'BARBER_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'BARBER_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'BARBER_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				payload: action.payload.data,
				error: null,
				saved: false,
				isDeleted: false
			};
		case 'SAVE_BARBER_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'SAVE_BARBER_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'SAVE_BARBER_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'GET_BARBER_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'GET_BARBER_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'GET_BARBER_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				barber: action.payload.data,
				error: null,
				saved: false,
			};
		case 'UPDATE_BARBER_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'UPDATE_BARBER_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'UPDATE_BARBER_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'DELETE_BARBER_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'DELETE_BARBER_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'DELETE_BARBER_FULFILLED':
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

export default barberReducer;
