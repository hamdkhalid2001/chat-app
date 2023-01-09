import React from "react";

function Chats(props) {
  // console.log("User data", props.user);
  return (
    <div
      className="py-5 px-2 w-full border border-gray-300 rounded-[12px] cursor-pointer"
      onClick={() => props.handleSelectUser(props.user)}
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
