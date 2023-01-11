import React, { useState } from "react";

function InputField(props) {
  const [focused, setFocused] = useState(false);
  function handleFocus() {
    setFocused(true);
  }
  return (
    <>
      <input
        type={props.data.type}
        name={props.data.name}
        id={props.data.id}
        placeholder={props.data.placeholder}
        onChange={props.data.onChange}
        value={props.data.value}
        required
        pattern={props.data.pattern}
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span className={props.data.className + " text-red-500"}>
        {props.data.err}
      </span>
    </>
  );
}

export default InputField;
