import React, { useState, useRef, useEffect } from "react";
import CustomModal from "../../../partials/content/custom-components/CustomModal";
import ProductListContainer from "../containers/list/ProductListContainer";
import FormComponent from "../containers/form/FormComponent";
const ListScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [product, setproduct] = useState({});
  const saveBtnRef = useRef();
  const onRowClickHandler = (row) => {
    setproduct(row);
    setShowModal(true);
  };


  return (
    <>
      <ProductListContainer {...{ onRowClickHandler }} />
      <CustomModal
        showModalFormOutSide={showModal}
        onClose={() => setShowModal(false)}
        children={<FormComponent ref={saveBtnRef} {...{ product }} />}
        title={"Editar Producto"}
        size={"md"}
        primaryBtn={{
          title: "Guardar",
           onClick: () => saveBtnRef.current.click(),
        }}
      />
    </>
  );
};

export default ListScreen;
