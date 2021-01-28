import React, { Component } from "react";
import { Container, CssBaseline, LinearProgress } from "@material-ui/core";
import ReactIf from "../../../helpers/ReactIf";
import InvoiceList from "../components/invoice-list-components/InvoiceList";

export default class InvoicesList extends Component {
  render() {
    return (
      <>
       <InvoiceList />
      </>
    );
  }
}
