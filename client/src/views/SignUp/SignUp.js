import React, { useState } from "react";
import { addDataToFirebase } from "../../firebase/api";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import InputField from "../../components/InputField";

function SignUp() {
  const storage = getStorage();
  const [userData, setUserData] = useState({
    uid: "",
    name: "",
  });
  const [profileImg, setProfileImg] = useState();
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();

    //Authenticating user
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(
        auth,
        authData.email,
        authData.password
      );
      const user = res.user;
      //In case user uploaded no img
      if (!profileImg) {
        signUp(user);
      } else {
        //User will upload the image as well as store user in db
        uploadImage(user);
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use")
        setErr("This email is already taken");
      setLoading(false);
    }
  }

  async function uploadImage(user) {
    const storageRef = ref(storage, user.uid);
    const uploadTask = uploadBytesResumable(storageRef, profileImg);
    uploadTask.on(
      (error) => {
        setErr("Error while image was uploading");
        console.log("Error while image was uploading: ", error);
      },
      async () => {
        //Uploading img and adding user
        const imgPath = await getDownloadURL(uploadTask.snapshot.ref);
        signUp(user, imgPath);
      }
    );
  }

  async function signUp(user, imgPath) {
    try {
      await addDataToFirebase(user.uid, {
        ...userData,
        uid: user.uid,
        email: authData.email,
        photoUrl: imgPath || null,
      });
      await updateProfile(auth.currentUser, {
        displayName: userData.name,
        photoURL: imgPath,
      });
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(event) {
    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        [event.target.name]: event.target.value,
      };
    });
  }
  function handleImage(event) {
    setProfileImg(event.target.files[0]);
  }
  function handleAuthData(event) {
    setAuthData((prevUserData) => {
      return {
        ...prevUserData,
        [event.target.name]: event.target.value,
      };
    });
  }
  const signUpFormData = [
    {
      type: "text",
      name: "name",
      id: "name",
      placeholder: "Name",
      onChange: handleChange,
      value: userData.name,
      pattern: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
      err: "Name shouldn't include special characters or numbers!",
      className: "input1",
    },
    {
      type: "email",
      name: "email",
      id: "email",
      placeholder: "Email",
      onChange: handleAuthData,
      value: authData.email,
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
      err: "It should be a valid email address!",
      className: "input2",
    },
    {
      type: "password",
      name: "password",
      id: "password",
      placeholder: "Password",
      onChange: handleAuthData,
      value: authData.password,
      pattern: "^(?=.*[a-z])(?=.*[0-9]).{8,16}$",
      err: "Password should be minimum 8 characters long and atleast one letter and one number!",
      className: "input3",
    },
  ];

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <form
        onSubmit={handleSignUp}
        method="POST"
        className="w-full grid place-items-center"
      >
        <section className="mt-8 grid gap-y-4  place-items-center sign-up-form">
          <h1 className="text-[30px] sm:text-[40px] mb-2 text-[#FAFCFF]">
            Sign up to Get Started
          </h1>
          {signUpFormData.map((element, index) => {
            return <InputField data={element} key={index} />;
          })}
          <label className="custom-file-upload">
            <input
              type="file"
              name="img"
              onChange={handleImage}
              className="border-none"
            />
            <p className="text-[#FAFCFF]">Add Avatar</p>
          </label>
          <button
            type="submit"
            className="w-[340px] sm:w-[450px] mt-1 rounded-[8px] text-center py-2 bg-blue-500 text-white btn-form disabled:bg-blue-400"
            disabled={loading}
          >
            <span className="relative">
              SignUp
              {loading && (
                <img
                  src={require("../../assets/images/loading.png")}
                  alt=""
                  className="w-[20px] h-[20px] inline-flex absolute left-[66px] top-[1px] animate-spin"
                />
              )}
            </span>
          </button>
          {err && <p className="text-red-500 font-bold text-center">{err}</p>}
        </section>
      </form>
    </div>
  );
}

export default SignUp;
