import axios from 'axios'
const baseURL = "http://localhost:5000"

const getCategoryDetail = (loginid, categoryId, baseurl) => {
    return (dispatch) => {
        axios.get(`${baseurl}category/details/${loginid}/${categoryId}`)
            .then((res) => dispatch({ type: "GETCATEGORY_DETAILS", payload: { data: res.data, Id: categoryId } }))
    }
}

const SetMaxAmount = (value, id, cat_data) => {
    const data = { max_amount: value }
    return (dispatch) => {
        axios.post(`${baseURL}/addmaxAmount/${id}`, data)
            .then((dispatch({ type: "SET_MAXAMOUNT", payload: { categoryList: cat_data, data: value, id: id } })))
    }
}

const postDataAction = (formData, loginid, id) => {
    return (dispatch) => {
        axios.post(`${baseURL}/addCategory/details/${loginid}/${id}`, formData)
            .then((res) => dispatch({ type: "CATEGORY_DETAILS_UPDATED", payload: res.data }))
    }
}

const updateDataAction = (formData, loginid, categoryId, id) => {
    return (dispatch) => {
        axios.put(`${baseURL}/updatedetails/${loginid}/${categoryId}/${id}`, formData)
            .then((res) => dispatch({ type: "CATEGORY_DETAILS_UPDATED", payload: res.data }))
    }
}


const deleteDataAction = (loginid, categoryId, id) => {
    return (dispatch) => {
        axios.delete(`${baseURL}/deletedetails/${loginid}/${categoryId}/${id}`)
            .then((res) => dispatch({ type: "CATEGORY_DETAILS_UPDATED", payload: res.data }))
    }
}

export const categoryDetailsAction = {
    getCategoryDetail,
    SetMaxAmount,
    postDataAction,
    updateDataAction,
    deleteDataAction
}

