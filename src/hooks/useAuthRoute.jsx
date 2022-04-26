import React from 'react'
import { Navigate } from 'react-router-dom'

export default function AuthRoute({ children }) {
    const isToken = '1111'
    if (isToken) {
        return <>{ children }</>
    } else {
        return <Navigate to='/login' replace />
    }
}
