import React from "react";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import { AuthContext } from "../../contexts/AuthProvider";
import { ChatContext } from "../../contexts/ChatProvider";
import { useContext, useEffect } from "react";
import {
  getFirestore,
  updateDoc,
  setDoc,
  getDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebase";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function ChatArea() {
  const { data } = useContext(ChatContext);
  const db = getFirestore(firebaseApp);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!data.user) return;
    createCollection();
  }, [data.user]);

  function logOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/login");
        console.log("Signed Out");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function sendMessage(message) {
    try {
      const res = await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          sender: user.uid,
          message: message,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function createCollection() {
    try {
      const res = await getDoc(doc(db, "chats", data.chatId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", data.chatId), {
          messages: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="px-12">
      {data.user && (
        <>
          <div className="flex justify-between">
            <h1>{data.user?.friendName}</h1>
            <button
              className="w-[130px] py-2 border border-black rounded-[14px] self-center"
              onClick={logOut}
            >
              Sign Out
            </button>
          </div>

          <Messages />
          <SendMessage handleSendMessage={sendMessage} />
        </>
      )}
    </section>
  );
}

export default ChatArea;
