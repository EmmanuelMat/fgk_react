import "./style.css";
import "./print.css";
import dateFormat from "dateformat";
import React, { Component } from "react";
import _ from "lodash";
import logo from './images/logo.jpg';

import _helpers from "../../helpers/_helpers";
export default class Invoice extends Component {
  render() {
    const { bill } = this.props;
    const details = bill.details.map((item) => {
      item.sellPrice = parseFloat(item.sellPrice).toFixed(2);
      item.total = item.sellPrice * item.quantity;
      return item;
    });
    return (
      <div id="page-wrap">
        <div id="header">Factura</div>

        <div id="identity">
          <div id="address">
            <div><strong>Ferreteria Guerrero KADEYHE SRL</strong></div>
            <div>C/Duarte #49. Frente Altice.</div>
            <div>Tel: (809) 957-5060</div>
            <div>Email: ferreteriaguerrerokadeyhe@gmail.com</div>
            <div>RNC: 131-93956-2</div>
          </div>

          <div id="logo">
            {/* <img width="60" height="60" id="image" src={logo} alt="logo" /> */}
          </div>
        </div>

        <div style={{ clear: "both" }}></div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: 315,
            }}
          >
            <div>Valida para {bill.taxReciept.taxReciept.name}</div>

            <div>
              NCF:{" "}
              {_helpers
                .genTaxtReciept(
                  bill.taxReciept.taxReciept,
                  bill.taxReciept.sequence
                )
                .toUpperCase()}
            </div>
          </div>
        </div>
        <div id="customer">
          <div id="customer-title">{bill.client.name}</div>

          <table id="meta">
            <tr>
              <td className="meta-head">No.</td>
              <td>
                <div>{bill.billNumer}</div>
              </td>
            </tr>
            <tr>
              <td className="meta-head">Fecha</td>
              <td>
                <div id="date">{dateFormat(bill.createDate, "mm/dd/yyyy")}</div>
              </td>
            </tr>
            <tr>
              <td className="meta-head">Expira</td>
              <td>
                <div id="date">{dateFormat(bill.createDate, "mm/dd/yyyy")}</div>
              </td>
            </tr>
          </table>
        </div>

        <table id="items">
          <tr>
            <th>Codigo</th>
            <th>Description</th>
            <th>Precio Ud</th>
            <th>Cantida</th>
            <th>Precio total</th>
          </tr>
          {details.map((item) => (
            <tr className="item-row">
              <td className="item-name">
                <div className="delete-wpr">
                  <div>{item.code}</div>
                  <a className="delete" title="Remove row">
                    X
                  </a>
                </div>
              </td>
              <td className="description">
                <div>{item.name}</div>
              </td>
              <td>
                <div className="cost">${item.sellPrice}</div>
              </td>
              <td>
                <div className="qty">{item.quantity}</div>
              </td>
              <td>
                <span className="price">${item.quantity * item.sellPrice}</span>
              </td>
            </tr>
          ))}
          <tr>
            <td
              style={{ paddingBottom: 1, paddingTop: 1 }}
              colspan="2"
              className="blank"
            ></td>
            <td
              style={{ paddingBottom: 1, paddingTop: 1 }}
              colspan="2"
              className="total-line"
            >
              Subtotal
            </td>
            <td
              style={{ paddingBottom: 1, paddingTop: 1 }}
              className="total-value"
            >
              <div id="subtotal">
                ${_helpers.decimal2(bill.totalPrice / 1.18)}
              </div>
            </td>
          </tr>
          <tr>
            <td
              style={{ paddingBottom: 1, paddingTop: 1 }}
              colspan="2"
              className="blank"
            ></td>
            <td
              style={{ paddingBottom: 1, paddingTop: 1 }}
              colspan="2"
              className="total-line"
            >
              ITBIS (18%)
            </td>
            <td
              style={{ paddingBottom: 1, paddingTop: 1 }}
              className="total-value"
            >
              <div id="subtotal">${_helpers.decimal2(bill.tax)}</div>
            </td>
          </tr>

          {bill.discount > 0 && (
            <tr>
              <td
                style={{ paddingBottom: 1, paddingTop: 1 }}
                colspan="2"
                className="blank"
              ></td>
              <td
                style={{ paddingBottom: 1, paddingTop: 1 }}
                colspan="2"
                className="total-line"
              >
                Discount ({parseInt(bill.discount)}%)
              </td>
              <td
                style={{ paddingBottom: 1, paddingTop: 1 }}
                className="total-value"
              >
                <div id="subtotal">
                  {" "}
                  ${_helpers.decimal2(bill.totalPrice * (bill.discount / 100))}
                </div>
              </td>
            </tr>
          )}
          <tr>
            <td
              style={{ paddingBottom: 1, paddingTop: 1 }}
              colspan="2"
              className="blank"
            >
              {" "}
            </td>
            <td
              style={{ paddingBottom: 1, paddingTop: 1 }}
              colspan="2"
              className="total-line"
            >
              Total
            </td>
            <td
              style={{ paddingBottom: 1, paddingTop: 1 }}
              className="total-value"
            >
              <div id="total">${_helpers.decimal2(bill.totalPrice)}</div>
            </td>
          </tr>
          {bill.totalPaid && (
            <tr>
              <td
                style={{ paddingBottom: 1, paddingTop: 1 }}
                colspan="2"
                className="blank"
              >
                {" "}
              </td>
              <td
                style={{ paddingBottom: 1, paddingTop: 1 }}
                colspan="2"
                className="total-line"
              >
                Total Pagado
              </td>

              <td
                style={{ paddingBottom: 1, paddingTop: 1 }}
                className="total-value"
              >
                <div id="paid">$0.00</div>
              </td>
            </tr>
          )}
          <tr>
            <td
              style={{ paddingBottom: 1, paddingTop: 1 }}
              colspan="2"
              className="blank"
            >
              {" "}
            </td>
            <td
              style={{ paddingBottom: 1, paddingTop: 1 }}
              colspan="2"
              className="total-line balance"
            >
              A pagar
            </td>
            <td
              style={{ paddingBottom: 1, paddingTop: 1 }}
              className="total-value balance"
            >
              <div className="due">${bill.balanceDue || 0}</div>
            </td>
          </tr>
        </table>

        <div id="terms">
          <h5>Terminos</h5>
          <div>
            Gracias Por su compra.
          </div>
        </div>
      </div>
    );
  }
}
