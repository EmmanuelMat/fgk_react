import React from "react";

const FormContainer = ({ data, handleInputChange, values }) => {
  return (
    <>
      {data.map((field, i) => {
        return (
          <div className="mb-3">
            <label className="form-label">{field.label}</label>
            <input
              type={field.type}
              className="form-control"
              name={field.name}
              type={field.type}
              readOnly={field.readonly}
              disabled={field.disabled}
              value={values[field.name]}
              onChange={handleInputChange}
            />
          </div>
        );
      })}
    </>
  );
};

export default FormContainer;
