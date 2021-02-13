import React, { Component } from "react";
import _ from "lodash";
import { LinearProgress } from "@material-ui/core";
import FormComponent from "../containers/form/FormComponent";
import service from "../service";
import { genConfig } from "../containers/form/config.form";
import ReactIf from "../../../helpers/ReactIf";

export default class FormScreen extends Component {
  state = { loading: true, formConfig: [] };

  componentDidMount() {
    this.getProviders();
  }


  getProviders = async () => {
    const providers = await service.getProviders();
    const formConfig = genConfig({ providers: providers.data, departments: [{_id: 1, name: ""}] });
    this.setState({ formConfig, loading: false });
  };
  
  render() {
    return (
      <>
        <ReactIf condition={!this.state.loading} Or={<LinearProgress />}>
          <FormComponent data={this.state.formConfig} />
        </ReactIf>
      </>
    );
  }
}
