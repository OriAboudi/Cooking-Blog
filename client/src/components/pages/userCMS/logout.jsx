import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MyUsers } from '../../../context/userContext'

function Logout() {

    const nav = useNavigate()
    const { logout } = MyUsers()
    useEffect(() => {
        logout()
        nav('/login')
    }, [])

    return (
        <React.Fragment>

        </React.Fragment>
    )
}

export default Logout