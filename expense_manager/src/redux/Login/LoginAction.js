import axios from 'axios'

const LoginAction = (username,password) => {
const baseURL="http://localhost:5000"
    return (dispatch) => {
        axios.post(baseURL+'/login',{username,password})
        .then((res) => dispatch({type:"CREDENTIALS_CHECK",payload:res.data}))
    }
}

export default LoginAction
