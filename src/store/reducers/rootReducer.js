import { combineReducers } from "redux";
import authReducer from "./authReducer";
import barberReducer from "./barberReducer";
import couponReducer from "./couponReducer";
import userReducer from "./userReducer";
import priceReducer from "./priceReducer";
import roleReducer from "./roleReducer";
import permissionReducer from "./permissionReducer";
import orderReducer from "./orderReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    barber: barberReducer,
    coupon: couponReducer,
    user: userReducer,
    price: priceReducer,
    role: roleReducer,
    permission: permissionReducer,
    order: orderReducer
});

export default rootReducer;