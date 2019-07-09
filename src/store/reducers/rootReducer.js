import { combineReducers } from "redux";
import authReducer from "./authReducer";
import barberReducer from "./barberReducer";
import couponReducer from "./couponReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    barber: barberReducer,
    coupon: couponReducer
});

export default rootReducer;