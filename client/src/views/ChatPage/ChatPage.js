import React, { useState, useEffect } from "react";
import SideBar from "../../components/ChatPage/SideBar";
import ChatArea from "../../components/ChatPage/ChatArea";
import { collection, query, getFirestore, getDocs } from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebase";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function ChatPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);

  const navigate = useNavigate();

  const db = getFirestore(firebaseApp);
  useEffect(() => {
    readUsers().then((res) => setUsers(res));
  }, []);

  function addUser(user) {
    //Data to be stored
    // email: "user3@gmail.com";
    // firstName: "User";
    // id: "A0TtqPZy4BuqdtvK58EB";
    // lastName: "3";
    // password: "123456";
    // userName: "user3";
    console.log("user from Chat Page: ", user);
    setSelectedUser(user);
  }

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
        <SideBar users={users} handleSelectUser={addUser} />
      </section>

      <section className="w-[75%]">
        <button
          className="w-[100px] border border-black rounded-[14px]"
          onClick={logOut}
        >
          Sign Out
        </button>
        <ChatArea selectUser={selectedUser} />
      </section>
    </div>
  );
}

export default ChatPage;
