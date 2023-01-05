import React from "react";
import { Link } from "react-router-dom";
import { readSingleDataFromFirebase } from "../../services/api";
import { signIn } from "../../services/auth";

function Login() {
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    setLoginData((prevUserData) => {
      return {
        ...prevUserData,
        [event.target.name]: event.target.value,
      };
    });
  }

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <h1>Sign in to Get Started</h1>
      <section className="mt-8 grid gap-y-4">
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <Link to={"/chat-page"}>
          <button
            className="w-[450px] mt-5 rounded-[8px] text-center py-2 bg-blue-500 text-white"
            onClick={() => signIn(loginData)}
          >
            Login
          </button>
        </Link>
      </section>
      <p className="underline mt-6 text-[18px]">Forget Your Password?</p>
      <Link to={"sign-up"}>
        <button className="w-[450px] mt-10 rounded-[8px] text-center py-2 bg-gray-200 font-bold">
          Create New Account
        </button>
      </Link>
    </div>
  );
}

export default Login;
