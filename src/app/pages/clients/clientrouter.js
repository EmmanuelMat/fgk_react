import React from "react";
import { Route, Switch } from "react-router-dom";
import { ClientForm, ClientFormRedirect } from "./ClientForm";
import ClientList from "./ClientList";

export default function ClientRouter() {
  return (
    <>
      <Switch>
        <Route exact path="/client">
          <ClientFormRedirect />
        </Route>
        <Route path="/client/list">
          <ClientList />
        </Route>
        <Route exact path="/client/form/:id">
          <ClientForm />
        </Route>
      </Switch>
    </>
  );
}
