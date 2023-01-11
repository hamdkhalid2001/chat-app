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
        className="w-[90%] sm:w-full min-w-[325px] max-w-[450px] "
      />
      <span
        className={props.data.className + " text-red-500 w-[90%] sm:w-full"}
      >
        {props.data.err}
      </span>
    </>
  );
}

export default InputField;
