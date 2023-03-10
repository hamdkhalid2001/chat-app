import React from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useContext } from "react";

function Message(message) {
  const { user } = useContext(AuthContext);
  const text = message.message.message;
  const senderId = message.message.sender;
  const image = message.message.image;
  const styling = {
    marginLeft: senderId === user.uid ? "auto" : "0px",
    padding: "8px 20px 8px 20px",
    marginBottom: "10px",
    backgroundColor: senderId === user.uid ? "#0E3386" : "#F0F8FF",
    marginRight: senderId !== user.uid ? "auto" : "0px",
    marginTop: message.id === 0 ? "auto" : "",
    borderRadius: "14px",
    color: senderId === user.uid ? "white" : "black",
    border: "none",
  };
  return (
    <>
      {image && (
        <img
          src={image}
          alt=""
          style={{
            borderRadius: "14px",
            width: "150px",
            height: "150px",
          }}
          className={
            senderId === user.uid
              ? "my-[10px] mr-0  ml-auto"
              : "my-[10px] ml-0 mr-auto"
          }
        />
      )}
      <div style={styling} className={!text ? "hidden" : "block"}>
        {text}
      </div>
    </>
  );
}

export default Message;
