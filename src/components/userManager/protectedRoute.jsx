import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useUserContext } from './authProvider'
import Layout from '../layout'


export default function ProtectedRoute() {
  const USER = useUserContext()
  if(USER.getRefreshToken() && !USER.isAuth){
    USER.checkAuth()
    return <Layout >loading</Layout>
  }
  return USER.isAuth ? <Layout ><Outlet /></Layout> : <Navigate to="/login" />
}
