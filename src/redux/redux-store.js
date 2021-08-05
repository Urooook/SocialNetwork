import { applyMiddleware, combineReducers, createStore } from "redux";
import AuthReducer from "./auth-reducer";
import dialogReducer from "./dialog-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import AppReducer from "./app-reducer";
import WeatherReducer from "./weather-reducer";


let reducers = combineReducers({
    ProfilePage:profileReducer,
    DialogPage:dialogReducer,
    sidebar:sidebarReducer,
    UsersPage:usersReducer,
    Weather:WeatherReducer,
    auth:AuthReducer,
    form:formReducer,
    app:AppReducer
});

let store = createStore(reducers,applyMiddleware(thunkMiddleware));

window.store = store;

export default store;