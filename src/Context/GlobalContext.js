import React , {useReducer, createContext} from 'react';
import AppReducer from "./AddReducer";

const initialState = {
    user : null,
    formType: 'signUp'
}


export const GlobalContext = createContext(initialState);


export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const updateUser = (user) => {
        dispatch({
            type: "SET_USER", 
            payload : user,
        })
    }

    const updateFormType = (formType) => {
        dispatch({
            type: "SET_FORM_TYPE",
            payload: formType,
        })
    }

    return (
        <GlobalContext.Provider value = {{
            user : state.user,
            formType: state.formType,
            updateUser,
            updateFormType
        }}> {children}
        </GlobalContext.Provider>
    );
}