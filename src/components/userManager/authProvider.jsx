import React, {useContext, createContext, useState, useEffect } from 'react'

const USER_CONTEXT = createContext({
    isAuth: false
})

export default function AuthProvider({children}) {
    const [isAuth, setAuth] = useState(false)
    return (
    <USER_CONTEXT.Provider value={{isAuth: isAuth}}  >
        {children}
    </USER_CONTEXT.Provider>)
}

export const useUserContext = () => useContext(USER_CONTEXT)