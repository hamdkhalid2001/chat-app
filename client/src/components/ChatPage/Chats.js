import React, { useContext } from "react";
import { ChatContext } from "../../contexts/ChatProvider";

function Chats(props) {
  const { dispatch } = useContext(ChatContext);
  return (
    <div
      className="pt-2  w-full cursor-pointer"
      onClick={() => dispatch({ type: "CHANGE_USER", payload: props.user })}
    >
      <div className="flex h-full w-full text-[#FAFCFF]">
        {props.user.photoUrl ? (
          <img src={props.user.photoUrl} alt="" className="h-[60px] w-[60px]" />
        ) : (
          <img
            src={require("../../assets/images/user-icon.png")}
            alt="User icon"
            className="w-[60px] h-[60px]"
          />
        )}
        <div className="self-center">
          <p className="ml-3 font-medium">{props.user.name}</p>
          <p className="ml-3 font-light">{props.user.lastMessage}</p>
          {/* {!props.user.lastMessage && <p className="ml-3 font-light">Image</p>} */}
        </div>
      </div>
      <hr className="my-6 opacity-20" />
    </div>
  );
}

export default Chats;
