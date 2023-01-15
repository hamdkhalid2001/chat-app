import Search from "./Search";
import Chats from "./Chats";
import { AuthContext } from "../../contexts/AuthProvider";
import { useState, useContext, useEffect } from "react";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebase";

function SideBar() {
  const db = getFirestore(firebaseApp);

  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState();

  useEffect(() => {
    function getChats() {
      let temp;
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        temp = doc.data();
        setChats(temp);
      });
      return () => {
        unsub();
      };
    }
    user.uid && getChats();
  }, [user.uid]);

  return (
    <div className="md:pl-2 ">
      <div className="flex mb-4">
        {user.photoURL ? (
          <img src={user.photoURL} className="w-[60px] h-[60px]" alt="" />
        ) : (
          <img
            src={require("../../assets/images/user-icon.png")}
            className="w-[60px] h-[60px]"
            alt=""
          />
        )}
        <p className="text-[28px] font-bold mb-2 ml-4 self-center mt-2">
          Hey{" "}
          {user.displayName?.includes(" ")
            ? user.displayName.split(" ")[0]
            : user.displayName}
          !
        </p>
      </div>

      <Search />
      {/* {userToAdd && <AddFriend user={userToAdd} />} */}
      <h3 className="text-[28px] font-semibold">Friends</h3>
      <section
        className="flex flex-col gap-y-4  overflow-y-scroll mt-4"
        id="chats-parent"
      >
        {chats &&
          Object.entries(chats)
            .sort((a, b) => b[1].date - a[1].date)
            .map((friend, index) => {
              return <Chats user={friend[1]} key={index} />;
            })}
      </section>
    </div>
  );
}

export default SideBar;
