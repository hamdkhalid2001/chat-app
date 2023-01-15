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
    <section className="sm:px-12 relative">
      <div className="flex justify-between h-full pb-7">
        <h1>{data.user?.name}</h1>
        <button
          className="w-[130px] py-2 border border-black rounded-[14px] self-center"
          onClick={logOut}
        >
          Sign Out
        </button>
      </div>
      {Object.keys(data.user).length <= 0 && (
        <div className="grid place-items-center text-2xl h-[50vh] w-full absolute">
          <p>Choose to start conversation</p>
        </div>
      )}
      {Object.keys(data.user).length > 0 && (
        <>
          <Messages />
          <SendMessage />
        </>
      )}
    </section>
  );
}

export default ChatArea;
