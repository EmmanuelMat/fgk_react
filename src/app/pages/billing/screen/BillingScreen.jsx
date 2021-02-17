import BillingComoponent from "../components/invoive-form/BillingComoponent";

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Bill from "../classes/Bill";
import _ from "lodash";

function BillingScreen() {
  const [table, settable] = useState([]);
  const [bill, setbill] = useState(new Bill());

  return (
    <>
      <BillingComoponent {...{ table, settable, bill, setbill }} />
    </>
  );
}

export default BillingScreen;
