import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

export default function ProductsRouter() {
  return (
    <>
      <Switch>
        <Route path="/product/form">
          <ProductForm />
        </Route>
        <Route path="/product/list">
          <ProductList />
        </Route>
      </Switch>
    </>
  );
}
