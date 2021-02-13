import React from 'react'
import PropTypes from 'prop-types'
import { Form } from "react-bootstrap"

const TextArea = ({
    value,
    require,
    name,
    label,
    type,
    handleChange,
    width,
    rows,
  }) => (
    <div style={{ width, marginRight: "2%" }}>
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          name={name}
          value={value || ""}
          onChange={handleChange}
          as={type}
          required={require}
          rows={rows}
        />
      </Form.Group>
    </div>
  );

TextArea.propTypes = {
    value: PropTypes.string,
    require:PropTypes.bool,
    name:PropTypes.string,
    label:PropTypes.string,
    type:PropTypes.string,
    handleChange:PropTypes.func,
    width:PropTypes.string,
    rows:PropTypes.string
}

export default TextArea

