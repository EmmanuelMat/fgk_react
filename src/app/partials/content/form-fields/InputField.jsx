import React from "react";

export default function InputField({
  onChange,
  type,
  name,
  value,
  label,
  message,
  classNameContainer,
  classNameLabel,
  classNameMessage,
  classNameInput,
  ariaDescribedby,
}) {
  return (
    <div className={classNameContainer}>
      <label className={classNameLabel}>{label}</label>
      <input
        onChange={onChange}
        type={type}
        name={name}
        value={value}
        className={classNameInput}
        aria-describedby={ariaDescribedby}
      />
      <div className={classNameMessage}>{message}</div>
    </div>
  );
}
  

