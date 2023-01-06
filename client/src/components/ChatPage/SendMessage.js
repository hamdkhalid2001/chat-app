import React, { useContext, useCallback, useState } from "react";
import { SocketContext } from "../../contexts/Socket";

function SendMessage() {
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState("");

  function handleMessage(event) {
    setMessage(event.target.value);
  }
  function sendMessage() {
    console.log(message);
    socket.emit("chat message", message);
    setMessage("");
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
            className="self-center"
            onClick={sendMessage}
          />
        </div>
      </div>
    </section>
  );
}

export default SendMessage;
