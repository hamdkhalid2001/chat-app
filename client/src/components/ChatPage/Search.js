import React, { useContext, useState, useEffect, useMemo } from "react";
import {
  collection,
  query,
  getDoc,
  getDocs,
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebase";
import { AuthContext } from "../../contexts/AuthProvider";
import AddFriend from "./AddFriend";

function Search() {
  const db = getFirestore(firebaseApp);
  const { user } = useContext(AuthContext);

  const [searchText, setSearchText] = useState("");
  const [allUsers, setAllUsers] = useState("");

  const searchedUsers = useMemo(() => {
    if (!searchText || !allUsers) {
      return "";
    }
    if (searchText === " ") return;
    return allUsers.filter((user) => {
      return user.name.toLowerCase().includes(searchText.toLowerCase());
    });
  }, [searchText, allUsers]);

  useEffect(() => {
    async function getAllUsers() {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setAllUsers((prevValue) => {
          return [...prevValue, doc.data()];
        });
      });
    }
    getAllUsers();
  }, []);

  function handleInput(event) {
    setSearchText(event.target.value);
  }

  async function addFriend(userToAdd) {
    setSearchText("");
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
            photoUrl: userToAdd.photoUrl,
            date: Date.now(),
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
            photoUrl: user.photoURL,
            date: Date.now(),
          },
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="bg-[#5c4f81] flex pr-3 mb-5">
        <input
          type="text"
          className="w-[70%] bg-[#5c4f81] text-[#FAFCFF]"
          placeholder="Search with email"
          onChange={handleInput}
          // onKeyDown={handleKey}
          value={searchText}
        />
        <img
          src={require(`../../assets/images/search.png`)}
          alt="Search icons"
          className="w-[25px] h-[25px] self-center ml-auto"
          // onClick={searchUsers}
        />
      </div>
      {searchedUsers &&
        searchedUsers.map((user, index) => {
          return (
            <AddFriend handleAddFriend={addFriend} user={user} key={index} />
          );
        })}
      {/* {searchedUsers && (
      )} */}
    </div>
  );
}

export default Search;
