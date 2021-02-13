import React from "react";
import dateFormat from "dateformat";
import _ from "lodash";
import { Col, Divider, Row, Table } from "antd";
import "antd/dist/antd.css";
import _helpers from "../../../helpers/_helpers";
class BillComponent extends React.Component {
  render() {
    const { bill } = this.props;
    const details = _.map(bill.details, (item) => {
      item.sellPrice = parseFloat( item.sellPrice).toFixed(2);
      item.total = item.sellPrice * item.quantity;
      return item;
    });

    return (
      <div style={{ padding: 20 }}>
        <Row>
          <Col>
            <Divider>Invoice</Divider>
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
            <table>
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
          <Col>
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

        <Row style={{ marginTop: 48 }}>
          <Table dataSource={details} pagination={false}>
            <Table.Column title="Items" dataIndex="code" />
            <Table.Column title="Description" dataIndex={["product", "name"]} />
            <Table.Column title="Quantity" dataIndex="quantity" />
            <Table.Column title="Price" dataIndex="sellPrice" />
            <Table.Column title="Price" dataIndex="total" />
          </Table>
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

        <Row style={{ marginTop: 48, textAlign: "center" }}>notes</Row>
      </div>
    );
  }
}
export default BillComponent;
