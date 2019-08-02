import { combineReducers } from "redux";
import authReducer from "./authReducer";
import barberReducer from "./barberReducer";
import couponReducer from "./couponReducer";
import userReducer from "./userReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    barber: barberReducer,
    coupon: couponReducer,
    user: userReducer
});

export default rootReducer;