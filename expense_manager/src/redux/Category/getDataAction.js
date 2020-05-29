import axios from 'axios'
const getDataAction = (loginid) => {
    const baseURL="http://localhost:5000"
    return (dispatch) => {
        axios.get(baseURL+'/category/'+loginid)
        .then((res) => dispatch({type:"CATEGORY_DATA",payload:res.data}))
    }
}

export default getDataAction
