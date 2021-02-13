import { useState } from "react";

export const useForm = (submitCallBack) => {
  const [state, setstate] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.nativeEvent)
    submitCallBack();
  };
  const handleChange = (e) => {
    if (e.persist) e.persist();
    setstate({ ...state, [e.target.name]: e.target.value });
  };

  return [state, handleChange, handleSubmit];
};
