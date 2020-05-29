import React from 'react'
import './Categorydetails.css'
import CategoryList from '../../Components/Category-details/categoryList/CategoryList';
import CategoryExpenseDetails from '../../Components/Category-details/categoryAddExpense/CategoryExpenseDetails';

const Categorydetails = () => {
    return (
        <div className="container-fluid h-100">
            <div className="row h-100">
                <CategoryList />
                <CategoryExpenseDetails />               
            </div>
        </div>
    )
}

export default Categorydetails

