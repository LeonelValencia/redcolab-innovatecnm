import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Interest() {
  return (
    <div>
      <div>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit backgroundColor: "#FF5522" */}
          <Grid container spacing={2}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="caption">
                      Type
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                      Heading
                    </Typography>
                    <Typography variant="body2">
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button size="small">Select</Button>
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
      <div>hola</div>
    </div>
  );
}
