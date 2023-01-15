import React from "react";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import { ChatContext } from "../../contexts/ChatProvider";
import { useContext } from "react";

import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function ChatArea() {
  const { data } = useContext(ChatContext);
  const { dispatch } = useContext(ChatContext);
  const navigate = useNavigate();

  function logOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch({ type: "DELETE_USER" });
        navigate("/login");
        console.log("Signed Out");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section className="md:px-6 xl:px-12 relative ">
      <div className="flex flex-col md:flex-row md:justify-between h-full">
        <div className="flex mt-1">
          <p className="text-[#FAFCFF] text-[28px]">{data.user?.name}</p>
          <button
            className="border-none ml-auto font-semibold flex md:hidden"
            onClick={() => {
              dispatch({ type: "DELETE_USER" });
            }}
          >
            <img
              src={require("../../assets/images/back-arrow.png")}
              alt=""
              className="inline-flex w-[25px] self-center mr-2"
            />
            <p className="font-semibold self-center text-[#FAFCFF]">Go Back</p>
          </button>
        </div>
        <button
          className="md:w-[130px] py-2 font-medium underline self-center mt-2 md:mt-0 md:mr-0 mr-auto text-[#FAFCFF]"
          onClick={logOut}
        >
          Sign Out
        </button>
      </div>
      {Object.keys(data.user).length <= 0 && (
        <div className="grid place-items-center md:text-5xl h-[60vh] w-full absolute">
          <p className="text-[#FAFCFF]">Choose to start conversation</p>
        </div>
      )}
      {Object.keys(data.user).length > 0 && (
        <div className="bg-[#5c4f81] rounded-2xl">
          <Messages />
          <hr className="opacity-5" />
          <SendMessage />
        </div>
      )}
    </section>
  );
}

export default ChatArea;
