import React, { useContext, useEffect } from "react";
import SideBar from "../../components/ChatPage/SideBar";
import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

function ChatPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      console.log("No user");
      navigate("/", { replace: true });
    }
  }, []);
  return (
    <div className="w-full pt-12">
      {user && (
        <section className="w-[25%]">
          <SideBar />
        </section>
      )}
    </div>
  );
}

export default ChatPage;
