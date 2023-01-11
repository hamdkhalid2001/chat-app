import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebase";
import { AuthContext } from "../../contexts/AuthProvider";
import AddFriend from "./AddFriend";

function Search(props) {
  const db = getFirestore(firebaseApp);
  const { user } = useContext(AuthContext);

  const [searchText, setSearchText] = useState("");
  const [userToAdd, setUserToAdd] = useState("");
  function handleInput(event) {
    setSearchText(event.target.value);
  }
  function handleKey(event) {
    if (event.code === "Enter") {
      searchUsers();
    }
  }

  async function searchUsers() {
    try {
      const db = getFirestore(firebaseApp);

      const q = query(
        collection(db, "users"),
        where("email", "==", searchText)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const userToAdd = { uid: doc.uid, ...doc.data() };
        // props.handleSelectUser(user);
        setUserToAdd(userToAdd);
        console.log(doc.uid, " => ", doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function addFriend() {
    console.log("Adding Friend");
    const combinedId =
      user.uid > userToAdd.uid
        ? user.uid + userToAdd.uid
        : userToAdd.uid + user.uid;
    try {
      //create chats collection
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        console.log("Creating chats collection");
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });
      }
      //create user chats collection for current user
      console.log("Creating userChats collection");

      const res2 = await setDoc(
        doc(db, "userChats", user.uid),
        {
          [combinedId + ".chatInfo"]: {
            uid: userToAdd.uid,
            name: userToAdd.name,
            email: userToAdd.email,
            date: serverTimestamp(),
          },
        },
        { merge: true }
      );
      //create user chats collection for friend
      console.log("Creating friendChats collection");

      const res3 = await setDoc(
        doc(db, "userChats", userToAdd.uid),
        {
          [combinedId + ".chatInfo"]: {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            date: serverTimestamp(),
          },
        },
        { merge: true }
      );
      setUserToAdd(null);
      setSearchText("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="bg-gray-200 flex pr-3 mb-5">
        <input
          type="text"
          className="w-[70%]"
          placeholder="Search"
          onChange={handleInput}
          onKeyDown={handleKey}
          value={searchText}
        />
        <img
          src={require(`../../assets/images/search.png`)}
          alt="Search icons"
          className="w-[25px] h-[25px] self-center ml-auto"
          onClick={addFriend}
        />
      </div>
      {userToAdd && <AddFriend handleAddFriend={addFriend} user={userToAdd} />}
    </div>
  );
}

export default Search;
