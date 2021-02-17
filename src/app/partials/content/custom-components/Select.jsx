import React from "react";
import  Dropdown from "../../content/custom-components/Dropdown";
import PropTypes from 'prop-types'
import { Form } from "react-bootstrap"


 const Select = ({ label, handleChange, width, options, name, value }) => {
  return (
    <div style={{ width, marginRight: "2%" }}>
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Dropdown defaultValue={value} name={name} onChange={handleChange} data={options} />
      </Form.Group>
    </div>
  );
}


Select.propTypes = {
    options: PropTypes.array,
    require:PropTypes.bool,
    name:PropTypes.string,
    label:PropTypes.string,
    type:PropTypes.string,
    handleChange:PropTypes.func,
    width:PropTypes.string,
}

export default Select