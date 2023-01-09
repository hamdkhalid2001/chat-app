import React from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useState, useContext, useEffect } from "react";

function Message(message) {
  const { user } = useContext(AuthContext);
  const text = message.message.message;
  const senderId = message.message.sender;
  const styling = {
    marginLeft: senderId === user.uid ? "auto" : "0px",
    padding: "8px 20px 8px 20px",
    marginBottom: "10px",
    backgroundColor:
      senderId === user.uid ? "rgba(29, 78, 216, 1)" : "rgba(255, 255, 255, 1)",
    marginRight: senderId !== user.uid ? "auto" : "0px",
    marginTop: message.id === 0 ? "auto" : "",
    borderRadius: "14px",
    color: senderId === user.uid ? "white" : "black",
    border: senderId !== user.uid ? "1px solid black" : "",
  };
  return <div style={styling}>{text}</div>;
}

export default Message;
