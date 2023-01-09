import React from "react";
import { getFirestore, getDoc, doc, onSnapshot } from "firebase/firestore";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { firebaseApp } from "../../firebase/firebase";
import Message from "./Message";

function Messages(props) {
  const db = getFirestore(firebaseApp);
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState();
  useEffect(() => {
    console.log("Clear messages");
    setMessages("");
  }, []);

  useEffect(() => {
    if (!props.friend) return;
    console.log("Sender id: ", user.uid);
    console.log("Reciever id: ", props.friend.friendId);
    const combinedId =
      user.uid > props.friend.friendId
        ? user.uid + props.friend.friendId
        : props.friend.friendId + user.uid;
    console.log(combinedId);

    const unsub = onSnapshot(doc(db, "chats", combinedId), (doc) => {
      console.log("Messages: ", doc.data());
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [props.friend]);

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

// const styles = {
//   marginLeft: item.sender === user.uid ? "auto" : "0px",
//   padding: "8px 20px 8px 20px",
//   marginBottom: "2px",
//   backgroundColor:
//     item.sender === user.uid
//       ? "rgba(29, 78, 216, 1)"
//       : "rgba(255, 255, 255, 1)",
//   marginRight: item.sender !== user.uid ? "auto" : "0px",
//   marginTop: index === 0 ? "auto" : "",
//   borderRadius: "14px",
//   color: item.sender === user.uid ? "white" : "black",
//   border: item.sender !== user.uid ? "1px solid black" : "",
// };
