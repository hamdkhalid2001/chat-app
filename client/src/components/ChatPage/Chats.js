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
        <p className="self-center ml-3">{props.user.friendName}</p>
      </div>
    </div>
  );
}

export default Chats;
