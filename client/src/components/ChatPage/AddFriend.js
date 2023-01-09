function AddFriend(props) {
  // email: "user3@gmail.com";
  // firstName: "User";
  // id: "A0TtqPZy4BuqdtvK58EB";
  // lastName: "3";
  // password: "123456";
  // userName: "user3";

  return (
    <div className="py-5 px-3 w-full border border-gray-300 rounded-[12px] cursor-pointer flex mb-4">
      <img
        src={require("../../assets/images/user-icon.png")}
        alt="User icon"
        className="w-[60px] h-[60px]"
      />
      <p className="self-center ml-4">{props.user.name}</p>
      <button
        className="w-[100px] border border-black rounded-[12px] text-center py-2 self-center ml-auto"
        onClick={props.handleAddFriend}
      >
        Add
      </button>
    </div>
  );
}

export default AddFriend;
