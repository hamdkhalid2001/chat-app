import React, { useContext } from "react";
import { ChatContext } from "../../contexts/ChatProvider";

function Chats(props) {
  const { dispatch } = useContext(ChatContext);

  return (
    <div
      className="py-5 px-2 w-full border border-gray-300 rounded-[12px] cursor-pointer"
      onClick={() => dispatch({ type: "CHANGE_USER", payload: props.user })}
      // onClick={() => props.handleSelectUser(props.user)}
    >
      <div className="flex h-full w-full">
        <img
          src={require("../../assets/images/user-icon.png")}
          alt="User icon"
          className="w-[60px] h-[60px]"
        />
        <div className="self-center">
          <p className="ml-3 font-bold">{props.user.name}</p>
          <p className="ml-3 font-light">{props.user.lastMessage}</p>
        </div>
      </div>
    </div>
  );
}

export default Chats;
