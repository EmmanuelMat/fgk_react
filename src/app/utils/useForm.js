import { useState, useEffect } from "react";
import _ from "lodash";
export const useForm = (data, submitCallBack) => {
  const [state, setstate] = useState({ ...data });
  const handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    submitCallBack(state);
    setstate({});
  };


  const handleChange = (e) => {
    if (e.persist) e.persist();
    setstate({ ...state, [e.target.name]: e.target.type == "checkbox" ? e.target.checked : e.target.value });
  };

  return [state, handleChange, handleSubmit];
};
