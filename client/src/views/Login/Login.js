import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import InputField from "../../components/InputField";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(false);

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
    } catch (error) {
      console.log("Error Code: ", error.code, " ", error.message);
      if (error.code === "auth/user-not-found") setErr(true);
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

  const loginFormData = [
    {
      type: "email",
      name: "email",
      id: "email",
      placeholder: "Email",
      onChange: handleChange,
      value: loginData.email,
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
      className: "hidden",
    },
    {
      type: "password",
      name: "password",
      id: "password",
      placeholder: "Password",
      onChange: handleChange,
      value: loginData.password,
      pattern: "^(?=.*[a-z])(?=.*[0-9]).{8,16}$",
      className: "hidden",
    },
  ];

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <form onSubmit={signIn} className="w-full">
        <section className="mt-8 grid gap-y-4 w-full place-items-center">
          <h1 className="text-[30px] sm:text-[40px] mb-2">Sign in</h1>
          {loginFormData.map((element, index) => {
            return <InputField data={element} key={index} />;
          })}
          <button
            type="submit"
            className="w-[340px] sm:w-[450px] mt-5 rounded-[8px] text-center py-2 bg-blue-500 text-white"
          >
            Login
          </button>
          {err && (
            <p className="text-red-500 font-bold text-center">
              The email or password maybe incorrect
            </p>
          )}
        </section>
      </form>
      <p className="underline mt-6 text-[18px]">Forget Your Password?</p>
      <Link to={"/sign-up"}>
        <button className="w-[340px] sm:w-[450px] mt-10 rounded-[8px] text-center py-2 bg-gray-200 font-bold">
          Create New Account
        </button>
      </Link>
    </div>
  );
}

export default Login;
