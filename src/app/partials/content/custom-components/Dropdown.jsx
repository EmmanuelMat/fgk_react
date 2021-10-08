import React from "react";
import { Form } from "react-bootstrap";

export default function Dropdown({ data, onChange, name, defaultValue, disabled }) {
  return (
    <Form.Control disabled={disabled} value={defaultValue} name={name}  onChange={onChange} as="select">
      {data.map((option, i) => (
        <option value={option._id} key={i}>{option.name}</option>
      ))}
    </Form.Control>
  );
}
