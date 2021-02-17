import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  makeStyles,
  LinearProgress,
} from "@material-ui/core";
import _ from "lodash";
import DynamicForm from "../../../../partials/content/dynamics/form/DynamicForm";
import ReactIf from "../../../../helpers/ReactIf";
import service from "../../service";
import { genConfig } from "./config.form";
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

export default React.forwardRef(function FormComponent({ product }, ref) {
  const classes = useStyles();

  const [formConfig, setformConfig] = useState([]);

  const [loading, setloading] = useState(true);

  useEffect(() => {
    getProviders();
  }, []);

  const getProviders = async () => {
    const providers = await service.getProviders();
    const options = {
      providers: providers.data,
      departments: [{ _id: 1, name: "No hay" }],
    };
    const formConfig = genConfig(options);
    setformConfig(formConfig);
    setloading(false);
  };

  return (
    <>
      <ReactIf condition={!loading} Or={<LinearProgress />}>
        <Container fixed>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <DynamicForm
                  editValues={product}
                  onSubmit={
                    product ? service.put : service.post
                  }
                  btn={
                    <div
                      style={{
                        display: product
                          ? "none"
                          : "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <button
                        ref={ref}
                        type="submit"
                        className="btn btn-primary"
                      >
                        Guardar
                      </button>
                    </div>
                  }
                  data={formConfig}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </ReactIf>
    </>
  );
});
