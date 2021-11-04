import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTab } from "../../actions/tabsAction";
import ListScreen from "./screens/ListScreen";

const ClientList = () => {
  const dispatch = useDispatch();
  const tabs = useSelector((state) => state.tabs.tabs);

  useEffect(() => {
    if (tabs.some((tab) => tab.title === "Lista clientes")) return;
    dispatch(
      addTab({
        title: "Lista clientes",
        component: () => <ListScreen />,
        isNewWindow: false,
      })
    );
  }, []);
  return null;
};

export default ClientList;
