import React, { useContext, useEffect } from "react";
import SideBar from "../../components/ChatPage/SideBar";
import ChatArea from "../../components/ChatPage/ChatArea";
import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

function ChatPage() {
  // const { user } = useContext(AuthContext);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     console.log("No user");
  //     navigate("/", { replace: true });
  //   }
  // }, []);
  return (
    <div className="w-full p-12 flex">
      <section className="w-[25%]">
        <SideBar />
      </section>

      <section className="w-[75%]">
        <ChatArea />
      </section>
    </div>
  );
}

export default ChatPage;
