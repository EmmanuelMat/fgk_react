import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTab } from "../../actions/tabsAction";
import InvoicesList from "./screen/InvoicesList";

const InvoiceListTab = () => {
  const dispatch = useDispatch();
  const tabs = useSelector((state) => state.tabs.tabs);

  useEffect(() => {
    if (tabs.some((tab) => tab.title === "Lista Facturas")) return;
    dispatch(
      addTab({
        title: "Lista Facturas",
        component: (id) => <InvoicesList tabId={id} />,
        isNewWindow: false,
      })
    );
  }, []);
  return null;
};

export default InvoiceListTab;
