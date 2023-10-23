import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Search from '@mui/icons-material/Search';

export default function InputSearch() {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton disabled sx={{ p: '10px' }} aria-label="menu">
        <Search />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Búsqueda"
        inputProps={{ 'aria-label': 'Actualiza tu estado!' }}
        disabled
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton disabled color="primary" sx={{ p: '10px' }} aria-label="directions">
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
