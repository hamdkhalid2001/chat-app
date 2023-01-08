import Search from "./Search";
import Chats from "./Chats";
import AddFriend from "./AddFriend";
import { AuthContext } from "../../contexts/AuthProvider";
import { addDataToFirebase } from "../../firebase/api";

import { useState, useContext } from "react";
import { doc, getFirestore, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { firebaseApp } from "../../firebase/firebase";

function SideBar(props) {
  const db = getFirestore(firebaseApp);

  const { user } = useContext(AuthContext);
  const [userToAdd, setUserToAdd] = useState();

  const usersArray = props.users.map((item, index) => {
    return (
      <Chats
        name={item.name}
        email={item.email}
        handleSelectUser={props.handleSelectUser}
        key={item.uid}
        id={item.uid}
      />
    );
  });
  function getUserToAdd(user) {
    console.log("Recieving user in Sidebar:", user);
    setUserToAdd(user);
    props.handleSelectUser(user);
  }

  async function addFriend() {
    try {
      await updateDoc(doc(db, "users", user.uid), {
        friends: arrayUnion(userToAdd.uid),
      });
      await updateDoc(doc(db, "users", userToAdd.uid), {
        friends: arrayUnion(user.uid),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <p className="text-[28px] font-bold mb-2">Chats</p>
      <Search handleSelectUser={getUserToAdd} />
      {userToAdd && <AddFriend user={userToAdd} handleAddFriend={addFriend} />}
      <h3 className="text-[28px] font-semibold">Friends</h3>
      <section
        className="flex flex-col gap-y-4 h-[35rem] overflow-y-scroll"
        id="chats-parent"
      >
        {usersArray}
      </section>
    </div>
  );
}

export default SideBar;
