const initialState = {
    category_data:
    sessionStorage.getItem("category_data")&&
        sessionStorage.getItem("category_data").length !== 0 ?
            JSON.parse(sessionStorage.getItem("category_data")) : [],
    getData: ""
}

const CategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CATEGORY_DATA':
            if (action.payload.length !== 0) {
                sessionStorage.setItem("category_data", JSON.stringify(action.payload));
                return {
                    category_data: action.payload,
                    getData: "done"
                }
            }
            else {
                return {
                    ...state,
                    getData: "done"
                }
            }
        case 'LOGOUT':
            debugger
            sessionStorage.setItem("category_data", []);
            return {
                category_data:[],
                getData:""
            }
        default:
            return state
    }
}

export default CategoryReducer
