import React from "react";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import { AuthContext } from "../../contexts/AuthProvider";
import { useState, useContext, useEffect } from "react";
import {
  getFirestore,
  updateDoc,
  setDoc,
  getDoc,
  doc,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebase";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

//Logic to do messaging will be handled here

function ChatArea(props) {
  const db = getFirestore(firebaseApp);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const reciever = props.selectedUser;
  const sender = user;
  console.log("Current user: ", sender.uid);
  console.log("Reciever: ", reciever);

  useEffect(() => {
    if (!props.selectedUser) return;
    createCollection();
  }, [props.selectedUser]);

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
    const combinedId =
      sender.uid > reciever.friendId
        ? sender.uid + reciever.friendId
        : reciever.friendId + sender.uid;

    try {
      const res = await updateDoc(doc(db, "chats", combinedId), {
        messages: arrayUnion({
          sender: user.uid,
          message: message,
        }),
        // timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function createCollection() {
    //combining the id in such a way that collection id will remain same for two users
    const combinedId =
      sender.uid > reciever.friendId
        ? sender.uid + reciever.friendId
        : reciever.friendId + sender.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        console.log("sdfsadfsadfasdf", combinedId);
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="px-12">
      {reciever && (
        <>
          <div className="flex justify-between">
            <h1>{props.selectedUser.friendName}</h1>
            <button
              className="w-[130px] py-2 border border-black rounded-[14px] self-center"
              onClick={logOut}
            >
              Sign Out
            </button>
          </div>
          <Messages friend={props.selectedUser} />
          <SendMessage handleSendMessage={sendMessage} />
        </>
      )}
    </section>
  );
}

export default ChatArea;
