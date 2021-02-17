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
  disabled,
  alwaysShowMask,
  maskChar
}) {
  return (
    <InputMask
      alwaysShowMask={alwaysShowMask}
      maskChar={maskChar}
      onKeyDown={onKeyDown}
      required={required}
      mask={mask}
      onChange={onChange}
      value={value}
      readOnly={readOnly}
      formatChars={formatChars}
      disabled={disabled}
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
