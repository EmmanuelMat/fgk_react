import { Form } from "react-bootstrap";
import { TYPE } from "../../../../constants/contants";
import CustomSwitch from "../../custom-components/CustomSwitch";
import Input2 from "../../custom-components/Input2";
import Select from "../../custom-components/Select";
import TextArea from "../../custom-components/TextArea";

export const generateComponent = (fields, values, handleChange) => {
  return fields.map((item) => {
    if (
      item.type === "email" ||
      item.type === "password" ||
      item.type === "number" ||
      item.type === "text"
    ) {
      return genTextField(item, values, handleChange);
    } else if (item.type === "textarea") {
      return genTextArea(item, values, handleChange);
    } else if (item.type === "select") {
      return genSelect(item, values, handleChange);
    } else if (item.type === TYPE.CHECKBOX) {
      return genSwitch(item, values, handleChange);
    }
  });
};

const genSelect = (item, values, handleChange) => (
  <Select {...{ ...item, handleChange, value: [values[item.name]] }} />
);

const genTextArea = (item, values, handleChange) => (
  <TextArea
    {...{
      ...item,
      handleChange,
      value: [values[item.name]],
    }}
  />
);

const genTextField = (item, values, handleChange) => (
  <Input2
    {...{
      ...item,
      handleChange,
      value: [values[item.name]],
    }}
  />
);

const genSwitch = (item, values, handleChange) => (
  <div style={{ width: item.width, display: "flex" }}>
    <Form.Label>{item.label}</Form.Label>
    <Form.Control
      {...{
        ...item,
        value: [values[item.name]],
        onChange: handleChange,
      }}
    />
  </div>
);
