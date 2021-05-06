import React, {createContext, useState} from 'react'
import UsersAPI from '../api/UsersAPI'

export const GlobalState = createContext()

export const DataProvider = ({children}) =>{
    
    const [token, setToken] = useState(false)




    const state = {
        token: [token, setToken],
        usersAPI :UsersAPI()
    }
    
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}