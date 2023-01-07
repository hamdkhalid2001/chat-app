import Search from "./Search";
import Chats from "./Chats";
import AddFriend from "./AddFriend";
import { useState } from "react";

function SideBar(props) {
  const [userToAdd, setUserToAdd] = useState();
  const usersArray = props.users.map((item, index) => {
    return (
      <Chats
        name={item.firstName + " " + item.lastName}
        email={item.email}
        handleSelectUser={props.handleSelectUser}
        key={item.id}
        id={item.id}
      />
    );
  });
  function getUserToAdd(user) {
    console.log("Recieving user in Sidebar:", user);
    setUserToAdd(user);
    props.handleSelectUser(user);
  }

  return (
    <div>
      <p className="text-[28px] font-bold mb-2">Chats</p>
      <Search handleSelectUser={getUserToAdd} />
      {userToAdd && <AddFriend user={userToAdd} />}
      <h3 className="text-[28px] font-semibold">Friends</h3>

      {!userToAdd && (
        <section
          className="flex flex-col gap-y-4 h-[35rem] overflow-y-scroll"
          id="chats-parent"
        >
          {usersArray}
        </section>
      )}
    </div>
  );
}

export default SideBar;
