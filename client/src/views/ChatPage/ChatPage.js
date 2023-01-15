import React, { useState, useEffect, useContext } from "react";
import SideBar from "../../components/ChatPage/SideBar";
import ChatArea from "../../components/ChatPage/ChatArea";
import { collection, query, getFirestore, getDocs } from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebase";
import { ChatContext } from "../../contexts/ChatProvider";

function ChatPage() {
  const { data } = useContext(ChatContext);

  const [users, setUsers] = useState([]);
  const [showChats, setShowChats] = useState(false);

  const db = getFirestore(firebaseApp);
  useEffect(() => {
    readUsers().then((res) => setUsers(res));
  }, []);

  useEffect(() => {
    console.log("Selected user", Object.entries(data.user).length);
    console.log(data);
    console.log("changing");
    if (Object.entries(data.user).length > 0) {
      setShowChats(true);
    } else {
      setShowChats(false);
    }
    console.log(showChats);
  }, [data]);

  async function readUsers() {
    let usersData = [];
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      usersData.push(doc.data());
    });
    return usersData;
  }

  return (
    <div className="w-full py-14 flex md:flex-row flex-col items-center md:items-start relative">
      <section
        className={
          showChats
            ? "hidden md:block md:w-[35%] xl:w-[25%] w-[90%]"
            : "block md:w-[35%] xl:w-[25%]  w-[90%]"
        }
      >
        <SideBar users={users} />
      </section>

      <section
        className={
          !showChats
            ? "hidden md:block md:w-[65%] xl:w-[75%] w-[90%]"
            : "block md:w-[65%] xl:w-[75%] w-[90%]"
        }
      >
        <ChatArea />
      </section>
    </div>
  );
}

export default ChatPage;
