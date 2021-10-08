import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTab } from "../../actions/tabsAction";
import ListScreen from "./screens/ListScreen";

const ProductList = () => {
  const dispatch = useDispatch();
  const tabs = useSelector((state) => state.tabs.tabs);

  useEffect(() => {
    if (tabs.some((tab) => tab.title === "Lista productos")) return;
    dispatch(
      addTab({
        title: "Lista productos",
        component: (id) => <ListScreen tabId={id} />,
        isNewWindow: false,
      })
    );
  }, []);
  return null;
};

export default ProductList;
