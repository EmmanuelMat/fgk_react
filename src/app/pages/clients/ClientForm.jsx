import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTab } from "../../actions/tabsAction";
import FormScreen from "./screens/FormScreen";


const ClientForm = () => {
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

export default ClientForm;