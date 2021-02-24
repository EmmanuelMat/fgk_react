import React, { Component } from "react";
import CustomizedSnackbars from "../content/custom-components/CustomizedSnackbars";

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
    message: "",
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  sethasError = () => {
    this.setState({ hasError: false });
  };

  componentDidMount() {
    window.addEventListener("unhandledrejection", (e) => {
      this.setState({ message: e.reason.message, hasError: true });
    });
  }

  render() {
    return (
      <>
        <CustomizedSnackbars
          {...{
            show: this.state.hasError,
            message: this.state.message,
            onClose: this.sethasError,
          }}
        />
        {this.props.children}
      </>
    );
  }
}
