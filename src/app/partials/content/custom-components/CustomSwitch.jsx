import React, { useState, useEffect } from "react";
import { Grid, Switch, withStyles } from "@material-ui/core";

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);
const CustomSwitch = ({ defaultValue, name, onValueChange, label }) => {
  const [value, setvalue] = useState(defaultValue);
  const handleSwitch = ({nativeEvent}) => {
    setvalue(nativeEvent.target.checked);
    console.log(nativeEvent.target.checked);
  };
  useEffect(() => {
    if (onValueChange) onValueChange(value);
  }, [value]);

  return (
    <>
      {label && <Grid item>{label}</Grid>}
      <AntSwitch name={name} checked={value} onChange={handleSwitch} />
    </>
  );
};

export default CustomSwitch;
