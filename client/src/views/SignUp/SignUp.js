import React, { useState } from "react";
import { addDataToFirebase } from "../../firebase/api";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

function SignUp() {
  const [userData, setUserData] = useState({
    uid: "",
    name: "",
    email: "",
  });
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const auth = getAuth();

  const navigate = useNavigate();

  async function signUp(e) {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        authData.email,
        authData.password
      );
      const user = res.user;
      updateProfile(auth.currentUser, {
        displayName: userData.name,
      });
      console.log("User while signing up: ", user);
      addDataToFirebase(user.uid, {
        ...userData,
        uid: user.uid,
        email: user.email,
      });
      navigate("/");
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
  function handleAuthData(event) {
    setAuthData((prevAuthData) => {
      return {
        ...prevAuthData,
        [event.target.name]: event.target.value,
      };
    });
  }

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <h1>Sign up to Get Started</h1>
      <form onSubmit={signUp} method="POST">
        <section className="mt-8 grid gap-y-4">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleAuthData}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleAuthData}
          />
          <button
            type="submit"
            className="w-[450px] mt-1 rounded-[8px] text-center py-2 bg-blue-500 text-white"
          >
            SignUp
          </button>
        </section>
      </form>
    </div>
  );
}

export default SignUp;
