import React, {useRef} from "react";
import { connect } from "react-redux";
import { useForm } from "../../../../utils/useForm";
import validation from "../../validation";
import { generateComponent } from "./InputGenerator";

export const DynamicForm = ({editValues, data, btn, onSubmit }) => {

  validation();
  const form = useRef()

  const [values, handleChange, handleSubmit] = useForm(editValues, onSubmit);
  return (
    <div>
      <form ref={form}  className={"needs-validation"} onSubmit={handleSubmit}>
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
