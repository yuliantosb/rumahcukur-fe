const initState = {
	fetching: false,
	fetched: false,
	error: null,
	payload: {},
	saved: false,
	message: null,
	price: {},
	isDeleted: false,
};

const priceReducer = (state = initState, action) => {
	switch (action.type) {
		case 'PRICE_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'PRICE_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'PRICE_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				payload: action.payload.data,
				error: null,
				saved: false,
				isDeleted: false
			};
		case 'SAVE_PRICE_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'SAVE_PRICE_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'SAVE_PRICE_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
            };
        default:
            return state;
    }
};
    
export default priceReducer;