import { VALIDATION_MESSAGES } from "../../constants/error.messages.constant";
import React, { Component } from "react";

export class Validation2 extends Component {
  state = {
    valueLength: 0,
    element: [],
    conditions: [],
    errorMessage: "",
  };
  componentDidMount() {
    if (this.props.children.ref && this.props.children.ref.current) {
      this.setState({
        valueLength: this.props.children.ref.current.value.length,
        element: this.props.children.ref.current,
        conditions: this.props.children.props,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    this.validate(this.state.valueLength);
  }
  errorMessage = "";
  validate = () => {
    // const { conditions, valueLength, element } = this.state;
    // if (
    //   conditions.minLength > element.value.length &&
    //   element.value.length != 0
    // ) {
    //   element.classList.add("is-invalid");
    // } else {
    //   element.classList.remove("is-invalid");
    // }
    // this.setErrorMessage(VALIDATION_MESSAGES.MIN_LENGTH);
    console.log(this.props);

  };

  setErrorMessage = (errorMessage) => {
    let error = errorMessage.replace("<NAME>", this.state.conditions.name);

    if (this.state.element.classList.contains("is-invalid")) {
      error = error.replace("<MIN_LENGTH>", this.state.conditions.minLength);
    } else {
      error = "";
    }
    this.errorMessage = error;
  };
  render() {
    return (
      <>
        {this.props.children}
        <small id="passwordHelp" className="text-danger">
          {this.errorMessage}
        </small>
      </>
    );
  }
}
