export default (state, action) => {
    switch(action.type) {
        case "SET_USER":
            return {
                ...state, 
                user: action.payload
            }
        case "SET_FORM_TYPE":
            return {
                ...state,
                formType: action.payload
            }
    }
}