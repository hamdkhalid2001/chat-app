import React from "react";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { useState, useContext, useEffect } from "react";
import { firebaseApp } from "../../firebase/firebase";
import { ChatContext } from "../../contexts/ChatProvider";

import Message from "./Message";

function Messages() {
  const db = getFirestore(firebaseApp);
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState();
  useEffect(() => {
    function readMessages() {
      setMessages("");
      const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
      return () => {
        unsub();
      };
    }
    Object.keys(data.user).length > 0 && readMessages();
  }, [data.user]);

  return (
    <div
      className="w-full h-[68vh] flex flex-col overflow-y-scroll gap-y-0 bg-[#5c4f81] rounded-t-2xl px-2 md:px-8 mt-7"
      id="chats-parent"
    >
      {messages &&
        messages.map((message, index) => {
          return <Message message={message} key={index} id={index} />;
        })}
    </div>
  );
}

export default Messages;
