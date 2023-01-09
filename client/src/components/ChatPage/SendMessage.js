import React, { useState } from "react";

function SendMessage(props) {
  const [message, setMessage] = useState("");

  function handleMessage(event) {
    setMessage(event.target.value);
  }

  function sendMessage(e) {
    console.log("Submitting");
    e.preventDefault();
    if (message !== " ") {
      setMessage("");
      props.handleSendMessage(message);
    }
  }

  return (
    <section className=" w-full mt-4">
      <div>
        <form action="" onSubmit={sendMessage}>
          <div className="bg-gray-200 flex pr-3 justify-between">
            <input
              type="text"
              className="w-[70%]"
              placeholder="Send Message"
              onChange={handleMessage}
              value={message}
            />
            <button type="submit">
              <img
                src={require("../../assets/images/send-icon.png")}
                alt=""
                className="self-center cursor-pointer"
              />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SendMessage;
