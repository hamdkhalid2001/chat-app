import React from "react";
import { SocketContext, socket } from "../../contexts/Socket";
function SendMessage() {
  return (
    <section className=" w-full">
      <SocketContext.Provider value={socket}>
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
      </SocketContext.Provider>
    </section>
  );
}

export default SendMessage;
