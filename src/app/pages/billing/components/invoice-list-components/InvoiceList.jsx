import React, { useRef, useState, useEffect } from "react";
import CustomTable from "../../../../partials/content/custom-components/CustomTable";
import service from "../../service";
import { Container, CssBaseline, LinearProgress } from "@material-ui/core";
import ReactIf from "../../../../helpers/ReactIf";
import CustomModal from "../../../../partials/content/custom-components/CustomModal";
import ListSearchPannel from "./ListSearchPannel";
const Printer = React.lazy(() => import("../../../invoice/Printer"));
const columns = [
  { label: "Codigo", value: "billNumer" },
  { label: "Cliente", value: ["client", "name"] },
  { label: "Total", value: "totalPrice" },
  { label: "Fecha Fact", value: "createDate" },
  { label: "Vence", value: "payDate" },
];

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);

  const [_id, set_id] = useState(null);

  const [isLoaded, setisLoaded] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const onRowClickHandler = (row) => {
    set_id(row._id);
    setShowModal(true);
  };

  const printRef = useRef();
  const getInvoices = async (pageNumber = 0, pageSize = 10, name) => {
    let invoices = await service.getInvoices(pageNumber, pageSize, name);
    invoices = invoices.data;
    setInvoices(invoices);
    setisLoaded(true);
  };

  const getInvoicesByClientId = async (clientId) => {
    if (!clientId) {
      getInvoices();
      return;
    }
    let invoices = await service.getInvoicesByClientId(clientId);
    invoices = invoices.data;
    setInvoices(invoices);
  };

  const getInvoicesByBillNUmber = async (billNumber) => {
    if (!billNumber) {
      getInvoices();
      return;
    }
    let invoices = await service.getInvoicesByBillNUmber(billNumber);
    invoices = invoices.data;
    setInvoices(invoices);
  };

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <>
      <CssBaseline />
      <ReactIf condition={isLoaded} Or={<LinearProgress />}>
        <CustomTable
          onClick={onRowClickHandler}
          data={invoices}
          getData={getInvoices}
          columns={columns}
          SearchPannel={() => (
            <ListSearchPannel
              getInvoicesByBillNUmber={getInvoicesByBillNUmber}
              getInvoicesByClientId={getInvoicesByClientId}
            />
          )}
        />
        <CustomModal
          showModalFormOutSide={showModal}
          onClose={() => setShowModal(false)}
          children={
            <React.Suspense fallback={<LinearProgress />}>
              <Printer ref={printRef} {...{ _id }} />
            </React.Suspense>
          }
          title={"Factura"}
          size={"lg"}
          primaryBtn={{
            title: "Imprimir",
            onClick: () => printRef.current.click(),
          }}
          secundaryBtns={[
            {
              title: "Conduce",
              variant: "primary",
              onClick: () => service.printConduce(_id),
            },
            {
              title: "Copia",
              variant: "primary",
              onClick: () => service.printCopy(_id),
            },
            {
              title: "Recibo",
              variant: "primary",

              onClick: () => service.printReciept(_id),
            },
          ]}
        />
      </ReactIf>
    </>
  );
}

export default InvoiceList;
