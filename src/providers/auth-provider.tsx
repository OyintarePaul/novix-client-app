import { onAuthStateChanged, User } from "firebase/auth"
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { auth } from "../firebase/config"
interface AuthContext {
    user: User | null
}
const AuthContext = createContext<AuthContext>({user: null})

const AuthProvider = ({children}: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null)
    useEffect(() =>{
        onAuthStateChanged(auth, (user) => {
            setUser(user)
        })
    }, [])

  return (
    <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext)
}