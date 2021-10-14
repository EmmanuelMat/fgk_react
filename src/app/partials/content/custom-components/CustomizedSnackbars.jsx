import React, {useEffect} from "react";
import {Snackbar,makeStyles} from "@material-ui/core/";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars({ message, show, onClose, severity }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);



  const handleClose = (event, reason) => {
    onClose(false)
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setOpen(show)
  }, [show])
  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity || "error"}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
