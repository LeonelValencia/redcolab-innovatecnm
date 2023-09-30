import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Login from '../../components/userManager/login'
import SingUp from '../../components/userManager/signUp'
import Draw from '../../components/userManager/drawer'

function Red() {
  const {site} = useParams()
    return (
    <div>
      {site==='login' && (
        <Login/>
      )}
      {site ==='signUp' &&(
        <Draw>
          <SingUp />
        </Draw>
      )}
      {site}
    </div>
  )
}

export default Red