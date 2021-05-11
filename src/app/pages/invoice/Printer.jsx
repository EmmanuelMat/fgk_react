import { PrintOutlined } from "@material-ui/icons";
import React, { useRef, useState, useEffect, forwardRef } from "react";
import { Button } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import ReactIf from "../../helpers/ReactIf";
import Bill from "../billing/classes/Bill";
import Invoice from "./Invoice"
import InvoiceKadehe from "./InvoiceKadehe"

const pageStyle = `

`;

const Printer = forwardRef(({ _id }, ref) => {
  const [bill, setBill] = useState(new Bill());
  const [show, setShow] = useState(false);
  const componentRef = useRef();

  useEffect(() => {
    getBill();
  }, [_id]);

  const getBill = () => {
    bill.get(_id).then((res) => {
      setShow(true);
    });
  };

  return (
    <ReactIf condition={show}>
      <ReactToPrint
        trigger={() => (
          <div style={{ display: "none" }}>
            <Button ref={ref} id="test" size="sm" variant="outline-danger">
              <PrintOutlined />
            </Button>
          </div>
        )}
        content={() => componentRef.current.lastChild}
      />
      <div ref={componentRef}>
        <Invoice bill={bill} />
      </div>
    </ReactIf>
  );
});

export default Printer;
