import React from "react";
import { Route, Switch, } from "react-router-dom";
import ClientForm from "./ClientForm";
import ClientList from "./ClientList";

export default function ClientRouter() {
  return (
    <>
      <Switch>
        <Route path="/client/form">
          <ClientForm />
        </Route>
        <Route path="/client/list">
          <ClientList />
        </Route>
      </Switch>
    </>
  );
}
