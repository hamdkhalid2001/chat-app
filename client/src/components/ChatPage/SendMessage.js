import React from "react";

function SendMessage() {
  return (
    <section className=" w-full">
      <div>
        <div className="bg-gray-200 flex pr-3 justify-between">
          <input type="text" className="w-[70%]" placeholder="Send Message" />
          <img
            src={require("../../assets/images/send-icon.png")}
            alt=""
            className="self-center"
          />
        </div>
      </div>
    </section>
  );
}

export default SendMessage;
