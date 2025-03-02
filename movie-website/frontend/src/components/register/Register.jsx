import React, { useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../service/firebase.js";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../service/firebase.js";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SocialSignIn from "../socialLogin/SocialLogin.jsx";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const onChangeHandler = (event) => {
    setRegisterInfo({
      ...registerInfo,
      [event.target.name]: event.target.value,
    });
  };

  //   validation function
  const validateInput = () => {
    if (registerInfo.firstName.trim().length < 5) {
      toast.error("First Name should be at least 5 characters long");
      return false;
    }
    if (registerInfo.lastName.trim().length < 2) {
      toast.error("Last Name should be at least 2 characters long");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(registerInfo.email)) {
      toast.error("Enter a valid email address");
      return false;
    }
    if (registerInfo.username.trim().length < 3) {
      toast.error("Username should be at least 3 characters long");
      return false;
    }
    if (registerInfo.password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return false;
    }
    return true;
  };

  const registerHandler = async (event) => {
    event.preventDefault();

    // validating the user inputs
    if (!validateInput()) return;

    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerInfo.email,
        registerInfo.password
      );
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: registerInfo.email,
          firstName: registerInfo.firstName,
          lastName: registerInfo.lastName,
          username: registerInfo.username,
          favorites: [],
        });
      }
      navigate("/login");
      toast.success("User Registered Successfully");
    } catch (error) {
      toast.error(error.message.split("Firebase: "));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      onSubmit={registerHandler}
      className="flex flex-col gap-4 bg-neutral-700 p-6 max-w-lg  md:p-8 rounded-2xl border border-neutral-600 mx-2"
    >
      <h1 className="font-black text-2xl my-4">Create an account</h1>
      <SocialSignIn />
      <div className="name flex gap-4 flex-col md:flex-row">
        <div className="first-name-input-field flex flex-col gap-2 my-1">
          <label htmlFor="firstName" className="text-sm font-medium">
            Your First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            className="outline-none w-full bg-neutral-800 border border-neutral-600 rounded-md p-2"
            onChange={onChangeHandler}
            value={registerInfo.firstName}
          />
        </div>
        <div className="last-name-input-field flex flex-col gap-2 my-1">
          <label htmlFor="lastName" className="text-sm font-medium">
            Your Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            className="outline-none w-full bg-neutral-800 border border-neutral-600 rounded-md p-2"
            onChange={onChangeHandler}
            value={registerInfo.lastName}
          />
        </div>
      </div>
      <div className="email-input-field flex flex-col gap-2 my-1">
        <label htmlFor="email" className="text-sm font-medium">
          Your Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="name@company.com"
          className="outline-none w-full bg-neutral-800 border border-neutral-600 rounded-md p-2 md:min-w-md"
          onChange={onChangeHandler}
          value={registerInfo.email}
        />
      </div>
      <div className="username-input-field flex flex-col gap-2 my-1">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="user name"
          className="outline-none w-full bg-neutral-800 border border-neutral-600 rounded-md p-2 md:min-w-md"
          onChange={onChangeHandler}
          value={registerInfo.username}
        />
      </div>
      <div className="password-input-field flex flex-col gap-2 my-1">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="outline-none w-full bg-neutral-800 border border-neutral-600 rounded-md p-2 md:min-w-md"
          onChange={onChangeHandler}
          value={registerInfo.password}
        />
      </div>
      <button
        type="submit"
        className="bg-emerald-600 p-2 rounded-md my-2 font-medium cursor-pointer hover:bg-emerald-700 flex gap-2 justify-center items-center"
      >
        Create an account{" "}
        {isLoading ? <LuLoaderCircle className="text-xl animate-spin" /> : ""}{" "}
      </button>
      <div className="flex flex-wrap gap-1 text-sm text-neutral-400">
        <div className="text-nowrap">Already have an account?</div>
        <Link to={"/login"}>
          <span className="text-emerald-600 font-medium hover:underline cursor-pointer">
            Login
          </span>
        </Link>
      </div>
    </form>
  );
}

export default Register;
