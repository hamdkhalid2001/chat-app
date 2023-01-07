import React, { useState, useEffect } from "react";
import SideBar from "../../components/ChatPage/SideBar";
import ChatArea from "../../components/ChatPage/ChatArea";
import { collection, query, getFirestore, getDocs } from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebase";
import { logOut } from "../../firebase/auth";

function ChatPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);

  const db = getFirestore(firebaseApp);
  useEffect(() => {
    readUsers().then((res) => setUsers(res));
  }, []);
  console.log(users);
  function selectUser(id) {
    console.log("Email from Chat Page: ", id);
    setSelectedUser(id);
  }

  async function readUsers() {
    let usersData = [];
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      console.log(doc.id + "=>" + doc.data());
      usersData.push({ id: doc.id, ...doc.data() });
    });
    return usersData;
  }

  return (
    <div className="w-full p-12 flex">
      <section className="w-[25%]">
        <button
          className="w-[100px] border border-black rounded-[14px]"
          onClick={logOut}
        >
          Sign Out
        </button>
        <SideBar users={users} handleSelectUser={selectUser} />
      </section>

      <section className="w-[75%]">
        <ChatArea selectUser={selectedUser} />
      </section>
    </div>
  );
}

export default ChatPage;
