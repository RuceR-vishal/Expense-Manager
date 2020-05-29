const initialState = {
    categoryDetailsData: [],
    selectedCategoryID:
        sessionStorage.getItem("selectedCategoryID") &&
            sessionStorage.getItem("selectedCategoryID").length !== 0 ?
            JSON.parse(sessionStorage.getItem("selectedCategoryID")) : [],
    categoryList: ""
}


const categoryDetailsReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GETCATEGORY_DETAILS':
            sessionStorage.setItem("selectedCategoryID", JSON.stringify(action.payload.Id));
            return {
                ...state,
                categoryDetailsData: action.payload.data,
                selectedCategoryID: action.payload.Id
            }
        case 'SET_MAXAMOUNT':
            const index = action.payload.categoryList.findIndex(data => data.id === action.payload.id)
            action.payload.categoryList[index].max_amount = action.payload.data
            return state

        case 'CATEGORY_DETAILS_UPDATED':
            return {
                ...state,
                categoryDetailsData: action.payload
            }
        case 'LOGOUT':
            sessionStorage.setItem("selectedCategoryID", []);
            return {
                categoryDetailsData: [],
                selectedCategoryID: [],
                categoryList: ""
            }

        default:
            return state
    }
}

export default categoryDetailsReducer