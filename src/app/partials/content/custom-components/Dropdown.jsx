import React from "react";
import { Form } from "react-bootstrap";

export default function Dropdown({ data, onChange, name }) {
  return (
    <Form.Control name={name}  onChange={onChange} as="select">
      {data.map((option, i) => (
        <option value={option._id} key={i}>{option.name}</option>
      ))}
    </Form.Control>
  );
}
