import React, { useState, useEffect, useContext } from "react";
import SideBar from "../../components/ChatPage/SideBar";
import ChatArea from "../../components/ChatPage/ChatArea";
import { collection, query, getFirestore, getDocs } from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebase";
import { ChatContext } from "../../contexts/ChatProvider";

function ChatPage() {
  const { data } = useContext(ChatContext);

  const [users, setUsers] = useState([]);

  const db = getFirestore(firebaseApp);
  useEffect(() => {
    readUsers().then((res) => setUsers(res));
  }, []);

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
          Object.entries(data.user).length > 0
            ? "hidden md:block md:w-[35%] xl:w-[25%] w-[90%]"
            : "block md:w-[35%] xl:w-[25%]  w-[90%]"
        }
      >
        <SideBar users={users} />
      </section>

      <section
        className={
          Object.entries(data.user).length <= 0
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
