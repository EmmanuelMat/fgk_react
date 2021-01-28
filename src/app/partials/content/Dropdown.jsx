import React from "react";
import { Form } from "react-bootstrap";

export default function Dropdown({ data, onChange }) {
  return (
    <Form.Control  onChange={e => onChange(e.target.value)} as="select">
      {data.map((option, i) => (
        <option value={option._id} key={i}>{option.name}</option>
      ))}
    </Form.Control>
  );
}
