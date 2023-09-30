import React, { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useUserContext } from './authProvider'
import Layout from '../layout'


export default function ProtectedRoute() {
  const USER = useUserContext()
  return USER.isAuth ? <Layout ><Outlet /></Layout> : <Navigate to="/login" />
}
