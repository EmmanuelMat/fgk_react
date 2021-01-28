import React from "react";
import { Form } from "react-bootstrap";
import InputMask from "react-input-mask";

export default function InputFields({
  value,
  onChange,
  readOnly,
  mask,
  placeholder,
  name,
  required,
  onKeyDown,
  formatChars,
}) {
  return (
    <InputMask
      onKeyDown={onKeyDown}
      required={required}
      mask={mask}
      onChange={onChange}
      value={value}
      readOnly={readOnly}
      formatChars={formatChars}
    >
      {(inputProps) => {
        return <Form.Control {...inputProps} />;
      }}
    </InputMask>
  );
}

/*
mask: "9999"
formatChars={{
"9": "[0-3]",
"a": "[A-Za-z]",
"*": "[A-Za-z0-9]",
}}
**/
