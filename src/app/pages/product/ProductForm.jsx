import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTab } from "../../actions/tabsAction";
import FormScreen from "./screens/FormScreen";

const ProductForm = () => {
const dispatch = useDispatch();
  useEffect(() => {
      
    dispatch(
      addTab({
        title: "Nuevo producto",
        component: () => <FormScreen />,
        isNewWindow: false,
      })
    );
  }, []);

  return null;
};

export default ProductForm;