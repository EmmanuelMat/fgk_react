import React from "react";
import { connect } from "react-redux";
import { useForm } from "../../../../utils/useForm";
import validation from "../../validation";
import { generateComponent } from "./InputGenerator";

export const DynamicForm = ({ data, btn }) => {
  const register = () => {
    console.log(values);
  };
  validation();
  const [values, handleChange, handleSubmit] = useForm(register);
  return (
    <div>
      <form className={"needs-validation"} onSubmit={handleSubmit}>
        <div className="d-flex flex-wrap">
          {generateComponent(data, values, handleChange)}
        </div>
        {btn}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DynamicForm);
