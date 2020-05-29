const initialState = {
    email: "",
    password: "",
    id: sessionStorage.getItem("id"),
    loggedin: sessionStorage.getItem("id"),
    dependency: true
}

const LoginReducer = (state = initialState, action) => {
    if (action.type === 'CREDENTIALS_CHECK') {
        if (action.payload === "invalid credentials") {
            sessionStorage.setItem("credentials", false);
            return {
                ...state,
                credentials: false,
                dependency: !state.dependency
            }
        }
        else {
            sessionStorage.setItem("id", action.payload[0].ID);
            sessionStorage.setItem("credentials", true);
            sessionStorage.setItem("loggedin", true);
            return {
                ...state,
                id: action.payload[0].ID,
                credentials: true,
                loggedin: true,
                dependency: !state.dependency
            }
        }
    }
    if (action.type === 'LOGOUT') {
        sessionStorage.setItem("id", "");
        sessionStorage.setItem("credentials", "");
        sessionStorage.setItem("loggedin", false);
        return {
            email: "",
            password: "",
            id:"",
            loggedin: false,
            dependency: true
        }
    }
    return state;
}

export default LoginReducer;