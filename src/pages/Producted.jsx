import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Producted({children}) {

    const isAuthendicated = localStorage.getItem('userEmail')
    return isAuthendicated ? children : <Navigate to={'/'} />
  
}