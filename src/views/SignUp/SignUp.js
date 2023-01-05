import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { addDataToFirebase } from "../../services/api";
import { signUp } from "../../services/auth";

function SignUp() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

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
        <Link to={"/chat-page"}>
          <button
            className="w-[450px] mt-1 rounded-[8px] text-center py-2 bg-blue-500 text-white"
            onClick={() => signUp(userData)}
          >
            SignUp
          </button>
          {/* <button
            className="w-[450px] mt-1 rounded-[8px] text-center py-2 bg-blue-500 text-white"
            onClick={() => signUp("users", userData.email, userData)}
          >
            SignUp
          </button> */}
        </Link>
      </section>
    </div>
  );
}

export default SignUp;
