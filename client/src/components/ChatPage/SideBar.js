import React from "react";
import Search from "./Search";
import Chats from "./Chats";
import { logOut } from "../../firebase/auth";
function SideBar() {
  return (
    <div>
      <p className="text-[28px] font-bold mb-2">Chats</p>
      <Search />
      <Chats />

      {/* <button className="w-[100px] py-4" onClick={logOut}>
        Log Out
      </button> */}
    </div>
  );
}

export default SideBar;
