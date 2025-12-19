import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Protected({ children, authentication = true }) {
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Protected page + user NOT logged in
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        }

        // Public page + user IS logged in
        else if (!authentication && authStatus !== authentication) {
            navigate('/')
        }

        setLoading(false)
    }, [authentication, navigate, authStatus])

    return (
        loading ? <h1>Loading...</h1> : <>{children}</>
    )
}

export default Protected

// This will dipaly 'loading' text or gif, if the components are still in render phase

// Uses: 
