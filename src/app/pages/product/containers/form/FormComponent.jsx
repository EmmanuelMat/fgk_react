import React from "react";
import { Container, Grid, Paper, makeStyles } from "@material-ui/core";
import _ from "lodash";
import DynamicForm from "../../../../partials/content/dynamics/form/DynamicForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}));

export default function FormComponent({ data }) {
  const classes = useStyles();

  return (
    <>
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <DynamicForm
                btn={
                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                }
                data={data}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
