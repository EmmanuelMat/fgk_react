import React, { Component } from "react";
import _ from "lodash";
import _helpers from "../../../helpers/_helpers";
import dateFormat from "dateformat";
import { Col, Divider, Row, Table } from "antd";

export default class Invoice extends React.Component {
  render() {
    const { bill } = this.props;
    const details = _.map(bill.details, (item) => {
      item.sellPrice = parseFloat(item.sellPrice).toFixed(2);
      item.total = item.sellPrice * item.quantity;
      return item;
    });
    return (
      <div className="container">
        <div className="card">
          <div className="card-header">
            Invoice
            <strong>{bill.billNumer}</strong>
            <span className="float-right">
              <strong>Status:</strong> Pending
            </span>
          </div>
          <div className="card-body  col-12 row d-flex justify-content-end ">
            <div className="">
              <h6 className="mb-3">Valida para:</h6>
              <div>{bill.taxReciept.taxReciept.name}</div>
              <div>
                NCF:{" "}
                {_helpers
                  .genTaxtReciept(
                    bill.taxReciept.taxReciept,
                    bill.taxReciept.sequence
                  )
                  .toUpperCase()}
              </div>
              <div>
                Fecha:{" "}
                {dateFormat(bill.createDate, "mm/dd/yyyy") +
                  "  " +
                  dateFormat(bill.createDate, "h:MM:ss TT")}
              </div>
              <div>Vence: {dateFormat(bill.createDate, "mm/dd/yyyy")}</div>
            </div>
          </div>
          <div className="card-body">
            <div className="row mb-4">
              <div className="col-sm-6">
                <h6 className="mb-3">From:</h6>
                <div>
                  <strong>FERRETERIA GUERRERO KADEYHE SRL.</strong>
                </div>
                <div>C/Duarte #49. Frente Altice.</div>
                <div>Tel: (809) 957-5060</div>
                <div>Email: info@webz.com.pl</div>
                <div>RNC: 131-93956-2</div>
              </div>

              <div className="col-sm-6">
                <h6 className="mb-3">To:</h6>
                <div>
                  <strong>{bill.client.name}</strong>
                </div>
                <div>{bill.client.address}</div>
                <div>Tel: {bill.client.pNumber}</div>
                <div>Email: {bill.client.email}</div>
                <div>RNC: {bill.client.taxId}</div>
              </div>
            </div>

            <div className="table-responsive-sm">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Articulo</th>

                    <th className="right">Precio unidad</th>
                    <th className="center">Cantidad</th>
                    <th className="right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {details &&
                    details.map((item) => (
                      <tr>
                        <td className="center">{item.code}</td>
                        <td className="left strong">{item.product.name}</td>
                        <td className="left">{item.sellPrice}</td>
                        <td className="right">{item.quantity}</td>
                        <td className="center">
                          {item.quantity * item.sellPrice}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <Row style={{ marginTop: 48 }}>
              <Col span={8} offset={16}>
                <table style={{ fontSize: 12 }}>
                  <tbody>
                    <tr>
                      <td className="left">
                        <strong>Subtotal</strong>
                      </td>
                      <td className="right">
                        ${_helpers.decimal2(bill.totalPrice / 1.18)}
                      </td>
                    </tr>
                    <tr>
                      <td className="left">
                        <strong>Discount ({parseInt(bill.discount)}%)</strong>
                      </td>
                      <td className="right">
                        $
                        {_helpers.decimal2(
                          bill.totalPrice * (bill.discount / 100)
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="left">
                        <strong>ITBIS (18%)</strong>
                      </td>
                      <td className="right">${_helpers.decimal2(bill.tax)}</td>
                    </tr>
                    <tr>
                      <td className="left">
                        <strong>Total</strong>
                      </td>
                      <td className="right">
                        <strong>${_helpers.decimal2(bill.totalPrice)}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
