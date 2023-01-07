import React, { useContext, useCallback, useState } from "react";

function SendMessage() {
  const [message, setMessage] = useState("");

  function handleMessage(event) {
    setMessage(event.target.value);
  }

  return (
    <section className=" w-full">
      <div>
        <div className="bg-gray-200 flex pr-3 justify-between">
          <input
            type="text"
            className="w-[70%]"
            placeholder="Send Message"
            onChange={handleMessage}
          />
          <img
            src={require("../../assets/images/send-icon.png")}
            alt=""
            className="self-center cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
}

export default SendMessage;
