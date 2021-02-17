import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import FormScreen from "./screens/FormScreen";
import ListScreen from "./screens/ListScreen";

export default function ProductsRouter() {
  return (
    <>
      <Switch>
        <Route path="/product/form">
          <FormScreen />
        </Route>
        <Route path="/product/list">
          <ListScreen />
        </Route>
      </Switch>
    </>
  );
}
