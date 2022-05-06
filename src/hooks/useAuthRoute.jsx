import React from 'react'
import { Navigate } from 'react-router-dom'
import { getStorage, tokenKey } from '@/utils'

export default function AuthRoute({ children }) {
    const isToken = getStorage(tokenKey)
    if (isToken) {
        return <>{ children }</>
    } else {
        return <Navigate to='/login' replace />
    }
}
