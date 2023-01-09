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
  getDoc,
} from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebase";

function SideBar(props) {
  const db = getFirestore(firebaseApp);

  const { user } = useContext(AuthContext);
  const [userToAdd, setUserToAdd] = useState();
  const [friends, setFriends] = useState();
  const [noFriendsErr, setNoFriendsErr] = useState(false);

  useEffect(() => {
    getFriends();
  }, []);
  useEffect(() => {
    console.log(friends);
  }, [friends]);

  async function getFriends() {
    getDoc(doc(db, "users", user.uid))
      .then((res) => {
        let data = res.data().friends.map((element, index) => {
          return (
            <Chats
              user={element}
              key={index}
              handleSelectUser={props.handleSelectUser}
            />
          );
        });
        setFriends(data);
      })
      .catch((err) => console.log(err));
  }
  function getUserToAdd(user) {
    console.log("Recieving user in Sidebar:", user);
    setUserToAdd(user);
    props.handleSelectUser(user);
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
      getFriends();
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
        {friends}
      </section>
    </div>
  );
}

export default SideBar;
