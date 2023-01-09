import React, { useState, useEffect } from "react";
import SideBar from "../../components/ChatPage/SideBar";
import ChatArea from "../../components/ChatPage/ChatArea";
import { collection, query, getFirestore, getDocs } from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebase";

function ChatPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

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

  //The purpose of this function is to store user which is selected to do chat
  function addUser(user) {
    console.log("user from Chat Page: ", user);
    setSelectedUser(user);
  }

  return (
    <div className="w-full p-12 flex">
      <section className="w-[25%]">
        <SideBar users={users} handleSelectUser={addUser} />
      </section>

      <section className="w-[75%]">
        <ChatArea selectedUser={selectedUser} />
      </section>
    </div>
  );
}

export default ChatPage;
