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
      return genSelect(item, handleChange);
    }
  });
};

const genSelect = (item, handleChange) => (
  <Select
    key={item.name}
    label={item.label}
    handleChange={handleChange}
    width={item.width}
    options={item.options}
    name={item.name}
  />
);

const genTextArea = (item, values, handleChange) => (
  <TextArea
    key={item.name}
    value={values[item.name]}
    require={item.require}
    name={item.name}
    label={item.label}
    type={item.type}
    handleChange={handleChange}
    width={item.width}
    rows={item.rows}
  />
);

const genTextField = (item, values, handleChange) => (
  <Input2
    key={item.name}
    value={values[item.name]}
    require={item.require}
    name={item.name}
    label={item.label}
    type={item.type}
    handleChange={handleChange}
    width={item.width}
  />
);
