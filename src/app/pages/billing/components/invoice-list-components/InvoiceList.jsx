import React, { useRef, useState, useEffect } from "react";
import CustomTable from "../../../../partials/content/custom-components/CustomTable";
import service from "../../service";
import { Container, CssBaseline, LinearProgress } from "@material-ui/core";
import ReactIf from "../../../../helpers/ReactIf";
import CustomModal from "../../../../partials/content/custom-components/CustomModal";
const Printer = React.lazy(() =>
  import("../../../invoice/Printer")
);
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
  const getInvoices = async (pageNumber, pageSize, name) => {
    let invoices = await service.getInvoices(pageNumber, pageSize, name);
    invoices = invoices.data;
    setInvoices(invoices);
    setisLoaded(true);
  };
  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <>
      <CssBaseline />
      <Container fixed>
        <ReactIf condition={isLoaded} Or={<LinearProgress />}>
          <CustomTable
            onClick={onRowClickHandler}
            data={invoices}
            getData={getInvoices}
            columns={columns}
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
            secundaryBtn={{
              title: "Recibo",
              // onClick: () => printReciept(_id),
            }}
          />
        </ReactIf>
      </Container>
    </>
  );
}

export default InvoiceList;
