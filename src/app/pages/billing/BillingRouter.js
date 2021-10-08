import React from "react";
import { Route, Switch } from "react-router-dom";
import _ from "lodash";
import {NewInvoice, NewInvoiceRefirect} from "./NewInvoice";
import InvoiceListTab from "./InvoiceListTab";


export const BillingRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/billing" component={NewInvoiceRefirect} />
        <Route path="/billing/list" component={InvoiceListTab} />
        <Route exact path="/billing/fac/:id" component={NewInvoice} />
      </Switch>
    </div>
  );
};
