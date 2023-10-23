import React from 'react'
import InputActivity from './input'
import RevCard from './revCard'
import Box from '@mui/material/Box'

export default function Activity({user}) {
  return (
    <Box
    sx={{
        marginTop: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
        <InputActivity user={user} />
        <br />
        <RevCard user={user} />
    </Box>
  )
}
