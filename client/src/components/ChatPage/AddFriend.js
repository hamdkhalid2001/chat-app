function AddFriend(props) {
  return (
    <div className="py-5 w-full rounded-[12px] cursor-pointer flex mb-4">
      {props.user.photoUrl ? (
        <img src={props.user.photoUrl} alt="" className="h-[60px] w-[60px]" />
      ) : (
        <img
          src={require("../../assets/images/user-icon.png")}
          alt=""
          className="w-[60px] h-[60px]"
        />
      )}
      <p className="self-center ml-4 text-[#FAFCFF]">{props.user.name}</p>
      <button
        className="w-[100px] border  rounded-[12px] text-center py-2 self-center ml-auto text-[#FAFCFF]"
        onClick={props.handleAddFriend}
      >
        Add
      </button>
    </div>
  );
}

export default AddFriend;
