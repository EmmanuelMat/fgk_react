import React, { useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import {
  Tabs,
  AppBar,
  Tab,
  Typography,
  Box,
  makeStyles,
} from "@material-ui/core";
import ReactDOM from "react-dom";
import "./styles.css";
import { addTab, removeTab, setActiveTab } from "../../../actions/tabsAction";
import { connect, useDispatch, useSelector } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function TabsBaseComponent({activeTab, tabs}) {
  const classes = useStyles();
  

  const [localTabs, setLocalTabs] = React.useState(tabs);
  const [value, setValue] = React.useState();
  const [container, setContainer] = React.useState(
    document.createElement("div")
  );

  const [contentContainer, setContentContainer] = React.useState(
    document.createElement("div")
  );
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    event.persist()
    setValue(newValue);
    dispatch(setActiveTab(newValue));
  };

  useLayoutEffect(() => {
    const cont = document.getElementById("tabs-portal");
    const content = document.getElementById("tabs-content-portal");
    if (cont) {
      setContainer(cont);
    }
    if (content) {
      setContentContainer(content);
    }
  }, []);

  useEffect(() => {
    setLocalTabs(tabs)
  }, [tabs])

  const handleTabClose = (event, id) => {
    const index = tabs.findIndex((tab) => tab.id === id);
    let newTabs = tabs;
    newTabs.splice(index, 1);
    dispatch(removeTab(newTabs));

  };


  return ReactDOM.createPortal(
    <div className={`${classes.root} tabs-component`}>
      <AppBar position="static">
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          {localTabs.map((item) => {
            return (
              <Tab
                key={item.id}
                value={item.id}
                label={item.title}
                wrapped
                {...a11yProps(item.id)}
                icon={
                  <a className="close-button" onClick={(e) => handleTabClose(e, item.id)}>x</a>
                }
              />
            );
          })}
        </Tabs>
      </AppBar>
      {ReactDOM.createPortal(
        <div>
          {localTabs.map((item, i) => {
           
            return (
              <TabPanel
                className="tab-panel"
                key={item.id}
                value={value}
                index={item.id}
              >
                <div className="m-4">{item.component(item.id, handleTabClose)}</div>
              </TabPanel>
            );
          })}
        </div>,
        contentContainer
      )}
    </div>,
    container
  );
}
const mapStateToProps = (state) => ({
  tabs:state.tabs.tabs,
  activeTab: state.tabs.active
});

export default connect(mapStateToProps)(TabsBaseComponent); ;
