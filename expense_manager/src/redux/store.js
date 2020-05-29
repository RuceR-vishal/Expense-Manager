import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import loginReducer from './Login/LoginReducer'
import categoryReducer from './Category/CategoryReducer'
import categoryDetailsReducer from './CategoryDetail/categoryDetailsReducer';
const masterReducer = combineReducers({
    login: loginReducer,
    category: categoryReducer,
    categorydetails: categoryDetailsReducer
})
const store = createStore(
    masterReducer,
    composeWithDevTools(applyMiddleware(thunk)))

export default store