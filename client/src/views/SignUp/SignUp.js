import React, { useState } from "react";
import { addDataToFirebase } from "../../firebase/api";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import InputField from "../../components/InputField";

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
  const [err, setErr] = useState(false);

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
      if (error.code === "auth/email-already-in-use") setErr(true);
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
        onSubmit={signUp}
        method="POST"
        className="w-[70%] grid place-items-center"
      >
        <section className="mt-8 grid gap-y-4 w-[375px] place-items-center sign-up-form">
          <h1>Sign up to Get Started</h1>
          {signUpFormData.map((element, index) => {
            return <InputField data={element} key={index} />;
          })}
          <button
            type="submit"
            className="w-[450px] mt-1 rounded-[8px] text-center py-2 bg-blue-500 text-white btn-form"
          >
            SignUp
          </button>
          {err && (
            <p className="text-red-500 font-bold">
              This email is already taken
            </p>
          )}
        </section>
      </form>
    </div>
  );
}

export default SignUp;
