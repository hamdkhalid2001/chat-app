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
    setMessages("");
    if (!data.user) return;

    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [data.user]);

  return (
    <div className="w-full h-[70vh] flex flex-col">
      {messages &&
        messages.map((message, index) => {
          return <Message message={message} key={index} id={index} />;
        })}
    </div>
  );
}

export default Messages;
