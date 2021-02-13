import React from "react";
import { render } from "react-dom";
import dateFormat from "dateformat";

import { Col, Divider, Row, Table } from "antd";
// import { Table } from "react-bootstrap";
import "antd/dist/antd.css";
import _helpers from "../../../helpers/_helpers";

class BillComponent extends React.Component {
  render() {
    const { bill } = this.props;
    return (
      <div style={{ padding: 20, fontSize: 14 }}>
        <Row>
          <Col>
            <Divider>Factura</Divider>
          </Col>
        </Row>

        <Row gutter={24} style={{ marginTop: 32 }}>
          <Col span={8}>
            <h3>FERRETERIA GUERRERO KADEYHE SRL.</h3>
            <div>C/Duarte #49. Frente Altice.</div>
            <div>Tel: (809) 957-5060</div>
            <div>RNC: 131-93956-2</div>
          </Col>
          <Col span={8} offset={8}>
            <table style={{ fontSize: 12 }}>
              <tbody>
                <tr>
                  <th>Factura # :</th>
                  <td>{bill.billNumer}</td>
                </tr>
                <tr>
                  <th>Sec. vence :</th>
                  <td>31/12/2021</td>
                </tr>
                <tr>
                  <th>NCF :</th>
                  <td>
                    {_helpers
                      .genTaxtReciept(
                        bill.taxReciept.taxReciept,
                        bill.taxReciept.sequence
                      )
                      .toUpperCase()}
                  </td>
                </tr>
                
                <tr>
                  <th>Fecha :</th>
                  <td>
                    {dateFormat(bill.createDate, "mm/dd/yyyy") +
                      "  " +
                      dateFormat(bill.createDate, "h:MM:ss TT")}
                  </td>
                </tr>
                <tr>
                  <th>Expiracion :</th>
                  <td>{dateFormat(bill.createDate, "mm/dd/yyyy")}</td>
                </tr>
                <tr>
                  <th>Valida para :</th>
                  <td>{bill.taxReciept.taxReciept.name}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>

        <Row style={{ marginTop: 48 }}>
          <Col span={8}>
            <div>
              Cliente: <strong>{bill.client.name}</strong>
            </div>
            <div>
              Tel: <strong>{bill.client.pNumber}</strong>
            </div>
            <div>
              Cel: <strong>{bill.client.cNumber}</strong>
            </div>
            <div>
              RNC: <strong>{bill.client.taxId}</strong>
            </div>
          </Col>
        </Row>

        <Row style={{ marginTop: 48, fontSize: 11 }}>
          {/* <Table width="400px" striped bordered >
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Quantity</th>
                <th>Precio Unit</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {bill.details.map((item) => (
                <tr>
                  <td>{item.code}</td>
                  <td>{item.product.name}</td>
                  <td>{item.quantity}</td>
                  <td>{_helpers.decimal2(item.sellPrice)}</td>
                  <td>{_helpers.decimal2(item.sellPrice * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </Table> */}

<Row style={{ marginTop: 48 }}>
        <Table dataSource={[{
            id: 1,
            name: 'Accommodation (Single Occupancy)',
            description: 'Accommodation',
            price: 1599,
            quantity: 1
        }]}
        pagination={false}
        >
          <Table.Column title="Items" dataIndex='name' />
          <Table.Column title="Description" dataIndex='description' />
          <Table.Column title="Quantity" dataIndex='quantity' />
          <Table.Column title="Price" dataIndex='price' />
          <Table.Column title="Line Total" />
        </Table>
      </Row>

        </Row>

        <Row style={{ marginTop: 48 }}>
          <Col span={8} offset={16}>
            <table style={{ fontSize: 14 }}>
              <tbody>
                <tr>
                  <th>Sub Total :</th>
                  <td>${_helpers.decimal2(bill.totalPrice / 1.18)}</td>
                </tr>
                <tr>
                  <th>ITEBIS 18% :</th>
                  <td>${_helpers.decimal2(bill.tax)}</td>
                </tr>
                <tr>
                  <th>Total:</th>
                  <td>${_helpers.decimal2(bill.totalPrice)}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>

        <Row style={{ fontSize: 14, marginTop: 48, textAlign: "center" }}>
          {bill.notes ? bill.notes: ""}
        </Row>
      </div>
    );
  }
}

export default BillComponent;


