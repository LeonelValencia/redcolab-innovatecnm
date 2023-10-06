import React from 'react'
import { useParams } from 'react-router-dom'
//import Login from '../../components/userManager/login'
import SingUp from '../../components/userManager/singUp'
//import Draw from '../../components/userManager/drawer'

function Red() {
  const {site} = useParams()
    return (
    <div>
      {site ==='signUp' &&(
        <SingUp />
      )}
    </div>
  )
}

export default Red