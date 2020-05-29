import axios from 'axios'
const postDataAction = (formData,loginid) => {
    const baseURL="http://localhost:5000"
    return (dispatch) => {
        axios.post(baseURL+'/addCategory/'+loginid,formData)
        .then((res) => dispatch({type:"CATEGORY_DATA",payload:res.data}))
    }
}

export default postDataAction
