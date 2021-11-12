import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { addTab } from "../../actions/tabsAction";
import FormScreen from "./screens/FormScreen";


export const ClientFormRedirect = () => {
  const rand =  Math.floor(1000 + Math.random() * 9000);
  return <Redirect to={`/client/form/${rand}`} /> ;
};


export const ClientForm = () => {
const dispatch = useDispatch();
  useEffect(() => {
      
    dispatch(
      addTab({
        title: "Nuevo cliente",
        component: () => <FormScreen />,
        isNewWindow: false,
      })
    );
  }, []);

  return null;
};

