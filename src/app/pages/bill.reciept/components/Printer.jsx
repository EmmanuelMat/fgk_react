import { PrintOutlined } from "@material-ui/icons";
import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ReactToPrint from "react-to-print";
import ReactIf from "../../../helpers/ReactIf";
import Bill from "../../billing/classes/Bill";
import BillComponent from "./Invoice";

export default class Example2 extends React.Component {
  constructor() {
    super();
    this.bill = new Bill();
    this.state = { show: false };
  }

  componentDidMount() { 
    const _id = this.props.location.state._id;
    this.bill.get(_id).then((res) => {
      this.setState({ show: res });
      const btn = document.querySelector("#test");
      btn.click();
     this.props.history.push('/billing');
    });
  }

  render() {
    return (
      <ReactIf condition={this.state.show}>
        <div style={{ display: "none" }}>
          <ReactToPrint
            trigger={() => (
              <Button id="test" size="sm" variant="outline-danger">
                <PrintOutlined />
              </Button>
            )}
            content={() => this.componentRef}
          />
          <div style={{ display: "none" }}>
            <BillComponent
              bill={this.bill}
              ref={(el) => (this.componentRef = el)}
            />
          </div>
        </div>
      </ReactIf>
    );
  }
}
