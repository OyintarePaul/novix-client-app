import { PropsWithChildren } from 'react'
import { useAuth } from '../providers/auth-provider'
import { Navigate } from 'react-router-dom'

const RequireAuth = ({ children }: PropsWithChildren) => {
    const { user } = useAuth()
    if (!user) return <Navigate to="/auth/login" />
    return children
}

export default RequireAuth