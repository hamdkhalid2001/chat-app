import React, { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebase";

function Search(props) {
  const [searchText, setSearchText] = useState("");

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
        const user = { id: doc.id, ...doc.data() };
        props.handleSelectUser(user);
        console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mb-5">
      <div className="bg-gray-200 flex pr-3">
        <input
          type="text"
          className="w-[70%]"
          placeholder="Search"
          onChange={handleInput}
          onKeyDown={handleKey}
        />
        <img
          src={require(`../../assets/images/search.png`)}
          alt="Search icons"
          className="w-[25px] h-[25px] self-center ml-auto"
          onClick={() => props.handleSearch(searchText)}
        />
      </div>
    </div>
  );
}

export default Search;
