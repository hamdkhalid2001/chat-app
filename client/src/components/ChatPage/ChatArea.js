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
        <div className="flex">
          <h1>{data.user?.name}</h1>
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
            <p className="font-semibold self-center">Go Back</p>
          </button>
        </div>
        <button
          className="md:w-[130px] py-2 font-semibold md:border border-black rounded-[14px] self-center mt-2 md:mt-0 md:mr-0 mr-auto"
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
