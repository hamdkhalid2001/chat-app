import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  async function signIn(e) {
    e.preventDefault();
    try {
      console.log("login");
      const auth = getAuth();
      const res = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      navigate("/");
      console.log("res", res);
    } catch (error) {
      console.log("Error Code: ", error.code, " ", error.message);
    }
  }

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
      <form onSubmit={signIn}>
        <section className="mt-8 grid gap-y-4">
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
            className="w-[450px] mt-5 rounded-[8px] text-center py-2 bg-blue-500 text-white"
          >
            Login
          </button>
        </section>
      </form>
      <p className="underline mt-6 text-[18px]">Forget Your Password?</p>
      <Link to={"/sign-up"}>
        <button className="w-[450px] mt-10 rounded-[8px] text-center py-2 bg-gray-200 font-bold">
          Create New Account
        </button>
      </Link>
    </div>
  );
}

export default Login;
