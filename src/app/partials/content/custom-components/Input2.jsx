import React from 'react'
import PropTypes from 'prop-types'
import { Form } from "react-bootstrap"
const Input2 = ({ value, require, name, label, type, handleChange, width }) => (
    <div style={{ width, marginRight: "2%" }}>
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          name={name}
          value={value || ""}
          onChange={handleChange}
          type={type}
          required={require}
        />
      </Form.Group>
    </div>
  );

Input2.propTypes = {
    value: PropTypes.string,
    require:PropTypes.bool,
    name:PropTypes.string,
    label:PropTypes.string,
    type:PropTypes.string,
    handleChange:PropTypes.func,
    width:PropTypes.string,
}

export default Input2

