import React, { useEffect, useState } from "react";
import Search from "./Search";
import Chats from "./Chats";

function SideBar(props) {
  const usersArray = props.users.map((user, index) => {
    return (
      <Chats
        name={user.firstName + " " + user.lastName}
        email={user.email}
        handleSelectUser={props.handleSelectUser}
        key={index}
      />
    );
  });
  return (
    <div>
      <p className="text-[28px] font-bold mb-2">Chats</p>
      <Search />
      <section
        className="flex flex-col gap-y-4 h-[35rem] overflow-y-scroll"
        id="chats-parent"
      >
        {usersArray}
      </section>

      {/* <button className="w-[100px] py-4" onClick={logOut}>
        Log Out
      </button> */}
    </div>
  );
}

export default SideBar;
