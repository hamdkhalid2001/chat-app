import Search from "./Search";
import Chats from "./Chats";
import AddFriend from "./AddFriend";
import { AuthContext } from "../../contexts/AuthProvider";
import { useState, useContext, useEffect } from "react";
import {
  doc,
  getFirestore,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebase";

function SideBar() {
  const db = getFirestore(firebaseApp);

  const { user } = useContext(AuthContext);
  const [userToAdd, setUserToAdd] = useState();
  const [friends, setFriends] = useState();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      console.log("Messages: ", doc.data());
      doc.exists() && setFriends(doc.data().friends);
    });
    return () => {
      unsub();
    };
  }, []);

  function getUserToAdd(user) {
    console.log("Recieving user in Sidebar:", user);
    setUserToAdd(user);
  }
  async function addFriend() {
    try {
      await updateDoc(doc(db, "users", user.uid), {
        friends: arrayUnion({
          friendId: userToAdd.uid,
          friendEmail: userToAdd.email,
          friendName: userToAdd.name,
        }),
      });
      await updateDoc(doc(db, "users", userToAdd.uid), {
        friends: arrayUnion({
          friendId: user.uid,
          friendEmail: user.email,
          friendName: user.displayName,
        }),
      });
      setUserToAdd();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <p className="text-[28px] font-bold mb-2">
        Hey {user.displayName.split(" ")[0]}!
      </p>

      <Search handleSelectUser={getUserToAdd} />
      {userToAdd && <AddFriend user={userToAdd} handleAddFriend={addFriend} />}
      <h3 className="text-[28px] font-semibold">Friends</h3>
      <section
        className="flex flex-col gap-y-4  overflow-y-scroll"
        id="chats-parent"
      >
        {friends &&
          friends.map((friend, index) => {
            return <Chats user={friend} key={index} />;
          })}
      </section>
    </div>
  );
}

export default SideBar;
