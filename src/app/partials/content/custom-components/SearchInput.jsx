import React, { useEffect, useMemo, useState } from "react";
import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "./styles.css";

const SearchInput = ({
  label,
  getData,
  onSelect,
  outerValue,
  borderBottom,
  onKeyDown = () => {},
}) => {
  const [data, setData] = useState([]);
  const [value, setvalue] = useState([]);

  const handleSelect = (val) => {
    setvalue(val);
  };

  const fetchData = async (value) => {
    setvalue(value);
    if (!value) {
      setData([]);
    } else {
      const res = await getData(value, null);
      setData(res.data);
    }
  };

  useEffect(() => {
    if (data.length === 1) {
      onSelect(data[0]);
    }
  }, [data]);

  useEffect(() => {
    if (outerValue?.name) {
      setData([outerValue]);
      setvalue(outerValue.name);
    }
  }, [outerValue]);

  return (
    <div>
      {!borderBottom && <Form.Label>{label}</Form.Label>}
      <InputGroup className="mb-3">
        <Form.Control
          onKeyDown={onKeyDown}
          placeholder={borderBottom ? label : ""}
          className={borderBottom && "input-border-bottom"}
          disabled={value?._id || false}
          type="text"
          value={value || ""}
          onChange={(e) => fetchData(e.target.value)}
          required
          list="data"
          onSelect={(e) => handleSelect(e.target.value)}
        />
        {data.map ? (
          <datalist id="data">
            {data.map((item, key) => (
              <option data-test={item._id} key={key} value={item.name} />
            ))}
          </datalist>
        ) : (
          <div />
        )}
      </InputGroup>
    </div>
  );
};

export default SearchInput;
