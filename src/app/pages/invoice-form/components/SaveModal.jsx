import React, { forwardRef } from "react";
import { Button } from "react-bootstrap";
import CustomModal from "../../../partials/content/custom-components/CustomModal";
import SaveIcon from "@material-ui/icons/Save";
import Printer from "../../invoice/Printer";

const SaveModal = forwardRef(({ printReciept, print, onClose, _id, showPrinterModal }, ref) => {
  return (
    <CustomModal
      showModalFormOutSide={showPrinterModal}
      children={<Printer ref={ref} {...{ _id }} />}
      onClose={onClose}
      title={"Factura"}
      size={"lg"}
      primaryBtn={{
        title: "Imprimir",
        onClick: print,
      }}
      secundaryBtn={[{
        title: "Recibo",
        onClick: printReciept,
      }]}
    />
  );
});

export default SaveModal;
