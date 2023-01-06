import React from "react";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import { SocketContext, socket } from "../../contexts/Socket";

function ChatArea() {
  return (
    <section className="px-12">
      <h1>User</h1>
      <Messages />
      <SocketContext.Provider value={socket}>
        <SendMessage />
      </SocketContext.Provider>
    </section>
  );
}

export default ChatArea;
