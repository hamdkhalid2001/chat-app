import React from "react";
import Messages from "./Messages";
import SendMessage from "./SendMessage";

function ChatArea(props) {
  return (
    <section className="px-12">
      <h1>User</h1>
      <Messages />
      <SendMessage />
    </section>
  );
}

export default ChatArea;
