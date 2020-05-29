const LogoutAction = () => {
    return (dispatch) => {
        dispatch({ type: "LOGOUT", payload: false })
    }
}

export default LogoutAction
