import * as React from 'react';
import MuiCard from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export default function Card({
    content=<></>,
    actions=<></>,
    color="#4fc3f7"
}) {
    return (
        <MuiCard sx={{ width: 350, height: 560, background: color}}>
          <CardContent>
            {content}
          </CardContent>
          <CardActions>
            {actions}
          </CardActions>
        </MuiCard>
      );
}
