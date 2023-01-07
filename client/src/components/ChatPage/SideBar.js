import Search from "./Search";
import Chats from "./Chats";
import AddFriend from "./AddFriend";

function SideBar(props) {
  // console.log(user.email);
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

  return (
    <div>
      <p className="text-[28px] font-bold mb-2">Chats</p>
      <Search />
      <AddFriend />
      <h3 className="text-[28px] font-semibold">Friends</h3>

      <section
        className="flex flex-col gap-y-4 h-[35rem] overflow-y-scroll"
        id="chats-parent"
      >
        {usersArray}
      </section>
    </div>
  );
}

export default SideBar;
