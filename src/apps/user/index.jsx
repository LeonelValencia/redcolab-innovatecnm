import React from 'react'
import { useUserContext } from '../../components/userManager/authProvider'

export default function User() {
  const UserContext = useUserContext()
  const {name,email}= UserContext.getUser()
  return (
    <div>User:{" "+name}</div>
  )
}
