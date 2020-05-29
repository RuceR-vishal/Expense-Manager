import React from 'react'
import Login from '../Components/Login/Login'
import Category from '../Components/Category/Category'
import Categorydetails from './categoryDetailsContainer/Categorydetails'
import { BrowserRouter, Route,Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ExpenseManager = () => {
    const loggedIn = useSelector(state => state.login.loggedin)
    const redirectHandler = (props) => {
        const location = props.location.pathname
        switch (location) {
            case '/categories':
                return (loggedIn ? <Category /> : (<Redirect to="/" />))
            case '/categoriesdetails':
                return (loggedIn ? <Categorydetails /> : (<Redirect to="/" />))
            default:
                break;
        }
    }
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/categories" exact render={redirectHandler} />
            <Route path="/categoriesdetails" exact component={redirectHandler} />
        </BrowserRouter>
    //      <BrowserRouter>
    //      <Route path="/" exact component={Login} />
    //      <Route path="/categories" exact component={Category} />
    //      <Route path="/categoriesdetails" exact component={Categorydetails} />
    //  </BrowserRouter>
    )
}

export default ExpenseManager

