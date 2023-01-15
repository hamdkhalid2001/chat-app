import React, { useState, useEffect } from "react";
import SideBar from "../../components/ChatPage/SideBar";
import ChatArea from "../../components/ChatPage/ChatArea";
import { collection, query, getFirestore, getDocs } from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebase";

function ChatPage() {
  const [users, setUsers] = useState([]);
  const [chatsView, setChatsView] = useState(false);

  const db = getFirestore(firebaseApp);
  useEffect(() => {
    readUsers().then((res) => setUsers(res));
  }, []);

  async function readUsers() {
    let usersData = [];
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      usersData.push(doc.data());
    });
    return usersData;
  }

  return (
    <div className="w-full py-8 flex sm:flex-row flex-col items-center sm:items-start relative">
      <section
        className={
          chatsView
            ? "hidden sm:block sm:w-[25%] w-[90%]"
            : "block sm:w-[25%] w-[90%]"
        }
      >
        <SideBar users={users} />
      </section>

      <section
        className={
          !chatsView
            ? "hidden sm:block sm:w-[75%] w-[90%]"
            : "block sm:w-[75%] w-[90%]"
        }
      >
        <ChatArea />
      </section>
    </div>
  );
}

export default ChatPage;
