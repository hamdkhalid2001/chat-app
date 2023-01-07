import React from "react";

function AddFriend() {
  return (
    <div className="py-5 px-3 w-full border border-gray-300 rounded-[12px] cursor-pointer flex mb-4">
      <img
        src={require("../../assets/images/user-icon.png")}
        alt="User icon"
        className="w-[60px] h-[60px]"
      />
      <p className="self-center ml-4">Hamd Khalid</p>
      <button className="w-[100px] border border-black rounded-[12px] text-center py-2 self-center ml-auto">
        Add
      </button>
    </div>
  );
}

export default AddFriend;