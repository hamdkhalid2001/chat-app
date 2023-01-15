import React, { useState } from "react";
import {
  getFirestore,
  updateDoc,
  setDoc,
  doc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebase";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { ChatContext } from "../../contexts/ChatProvider";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

function SendMessage(props) {
  const storage = getStorage();
  const db = getFirestore(firebaseApp);
  const { data } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  async function sendMessage(event) {
    event.preventDefault();
    try {
      setMessage("");

      if (image) {
        const storageRef = ref(storage, data.chatId + Date.now().toString());
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          (error) => {
            console.log("Error while image was uploading: ", error);
          },
          async () => {
            //Uploading img and adding user
            const imgPath = await getDownloadURL(uploadTask.snapshot.ref);
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                sender: user.uid,
                message: message,
                image: imgPath,
              }),
            });
          }
        );
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            sender: user.uid,
            message: message,
          }),
        });
      }
      await setDoc(
        doc(db, "userChats", user.uid),
        {
          [data.chatId + ".chatInfo"]: {
            lastMessage: message,
            date: serverTimestamp(),
          },
        },
        { merge: true }
      );
      await setDoc(
        doc(db, "userChats", data.user.uid),
        {
          [data.chatId + ".chatInfo"]: {
            lastMessage: message,
            date: serverTimestamp(),
          },
        },
        { merge: true }
      );
      setImage(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="w-full py-2">
      <div>
        <form action="" onSubmit={sendMessage}>
          <div className="flex pr-3 justify-between bg-[#5c4f81] text-[#FAFCFF] rounded-b-2xl px-2 md:px-6">
            <input
              type="text"
              className="w-[70%] bg-[#5c4f81] text-[#FAFCFF]"
              placeholder="Send Message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <div className="flex">
              <div className="self-center">
                <label htmlFor="file-input">
                  <img
                    src={require("../../assets/images/upload-img.png")}
                    alt=""
                    className="cursor-pointer"
                  />
                </label>

                <input
                  id="file-input"
                  type="file"
                  className="invisible w-0 h-0 "
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <button type="submit" className="ml-2">
                <img
                  src={require("../../assets/images/send-icon.png")}
                  alt=""
                  className="self-center cursor-pointer h-[23px]"
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SendMessage;
