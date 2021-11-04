import React, { useState, useRef, useEffect } from "react";
import CustomModal from "../../../partials/content/custom-components/CustomModal";
import ClientsListContainer from "../containers/list/ClientsListContainer";
import FormComponent from "../containers/form/FormComponent";

const ListScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [client, setClient] = useState({});
  
  const saveBtnRef = useRef();

  const onRowClickHandler = (row) => {
    setClient(row);
    setShowModal(true);
  };


  return (
    <>
      <ClientsListContainer {...{ onRowClickHandler }} />
      <CustomModal
        showModalFormOutSide={showModal}
        onClose={() => setShowModal(false)}
        children={<FormComponent ref={saveBtnRef} {...{ client }} />}
        title={"Editar cliente"}
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
