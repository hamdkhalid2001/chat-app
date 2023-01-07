import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
// import { signUp } from "../../firebase/auth";
// import { AuthContext } from "../../contexts/AuthProvider";
import { addDataToFirebase } from "../../firebase/api";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function SignUp() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
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
        userData.email,
        userData.password
      );
      const user = res.user;
      console.log(user);
      addDataToFirebase("users", userData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  console.log("Sign Up component called");

  function handleChange(event) {
    setUserData((prevUserData) => {
      return {
        ...prevUserData,
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
            name="firstName"
            id="firstName"
            placeholder="First Name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="userName"
            id="username"
            placeholder="User Name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
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
