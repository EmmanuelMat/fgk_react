import React from "react";
import _helpers from "../../../helpers/_helpers";
import dateFormat from "dateformat";
import "./style.scss";

class RecieptComponent extends React.Component {
  
render(){
  const { bill } = this.props
  return (
    <div id="invoice-POS" >
      <center id="top">
        <div style={{ fontSize: "1em" }}>
          <div>FERRETERIA GUERRERO KADEYHE SRL</div>
          <div>C/Duarte #49. Frente Altice</div>
          <div>Tel: (809) 957-5060</div>
          <div>RNC: 131-93956-2</div>
        </div>
      </center>

      <div id="mid">
        <div class="info">
          <h2>Factura:</h2>{" "}
          <div style={{ fontSize: "0.5em" }}>
            {" "}
            Fecha:{" "}
            {dateFormat(bill.createDate, "mm/dd/yyyy") +
              "  " +
              dateFormat(bill.createDate, "h:MM:ss TT")}
          </div>
          <p>
            <br />
            <strong>NCF :</strong>{" "}
            {_helpers
              .genTaxtReciept(
                bill.taxReciept.taxReciept,
                bill.taxReciept.sequence
              )
              .toUpperCase()}
            <br />
            <strong> Numero de factura :</strong> {bill.billNumer}
            <br /> <strong>TIpo de factura :</strong>{" "}
            {bill.taxReciept.taxReciept.name}
          </p>
        </div>
      </div>

      <div id="bot">
        <div id="table">
          <table>
            <tr class="tabletitle">
              <td class="item">
                <h2>cod</h2>
              </td>
              <td class="item">
                <h2>Prodt</h2>
              </td>
              <td class="Hours">
                <h2>cant</h2>
              </td>
              <td class="Rate">
                <h2>Ud price</h2>
              </td>

              <td class="Rate">
                <h2>Total</h2>
              </td>
            </tr>
            {bill.details.map((item) => (
              <tr class="service">
                <td class="tableitem">
                  <p class="itemtext">{item.product.code}</p>
                </td>
                <td class="tableitem">
                  <p class="itemtext">{item.product.name}</p>
                </td>
                <td class="tableitem">
                  <p class="itemtext">{item.quantity}</p>
                </td>
                <td class="tableitem">
                  <p class="itemtext">${_helpers.decimal2(item.sellPrice)}</p>
                </td>
                <td class="tableitem">
                  <p class="itemtext">
                    ${_helpers.decimal2(item.sellPrice * item.quantity)}
                  </p>
                </td>
              </tr>
            ))}
            <tr class="tabletitle">
              <td></td>
              <td class="Rate">
                <h2>ITEBIS</h2>
              </td>
              <td class="payment">
                <h2>${_helpers.decimal2(bill.tax)}</h2>
              </td>
            </tr>
            <tr class="tabletitle">
              <td></td>
              <td class="Rate">
                <h2>Sub tota</h2>
              </td>
              <td class="payment">
                <h2>${_helpers.decimal2(bill.totalPrice / 1.18)}</h2>
              </td>
            </tr>
            <tr class="tabletitle">
              <td></td>
              <td class="Rate">
                <h2>Total</h2>
              </td>
              <td class="payment">
                <h2>${_helpers.decimal2(bill.totalPrice)}</h2>
              </td>
            </tr>
          </table>
        </div>

        <div id="mid">
          <div class="info">
            <h2>Info cliente:</h2>
            <p>
              <br />
              <strong>Nombre : </strong>
              {bill.client.name}
              <br /> <strong>Telefono : </strong>
              {bill.client.pNumber}
              <br /> <strong>Celular : </strong>
              {bill.client.cNumber}
              <br /> <strong>Direccion : </strong>
              {bill.client.address}
            </p>
          </div>
        </div>
        {/* 
        <div id="legalcopy">
          <p class="legal">
            <strong>Thank you for your business!</strong>  Payment is expected
            within 31 days; please process this invoice within that time. There
            will be a 5% interest charge per month on late invoices.
          </p>
        </div> */}
      </div>
    </div>
  );}
};

export default RecieptComponent;
