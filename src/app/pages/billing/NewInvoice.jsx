import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { addTab } from "../../actions/tabsAction";
import InvoiceFormComponent from "../invoice-form/InvoiceFormComponent";


export const NewInvoiceRefirect = () => {
  const rand =  Math.floor(1000 + Math.random() * 9000);
  return <Redirect to={`/billing/fac/${rand}`} /> ;
};


export const NewInvoice = () => {
 const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      addTab({
        title: "Nueva factura",
        component: (activeTab, closeTab) => <InvoiceFormComponent {...{activeTab, closeTab}} />,
        isNewWindow: false,
      })
    );
  }, []);

  return null;
};

