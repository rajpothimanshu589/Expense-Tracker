import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Logo from "./shared/Logo";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("http://localhost:8000/api/v1/user/login", input, {

  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       withCredentials: true,
  //     }
  //     );
  //     console.log(res);

  //     if (res.data.success) {
  //       toast.success(res.data.message);
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  // }


  const submitHandler = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:8000/api/v1/user/login", input, {
      headers: { "Content-Type": "application/json" },
    });

    console.log(res);

    if (res.data.success) {
      dispatch(setAuthUser(res.data.user));
      // Store JWT token in localStorage for later use
      localStorage.setItem('token', res.data.token);

      toast.success(res.data.message);
      navigate("/");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <form onSubmit={submitHandler} className="flex flex-col items-center w-96 p-8 bg-white rounded-xl shadow-lg space-y-6">
       <  Logo />

        <div className="w-full">
          <Label>Email</Label>
          <Input type="email" name="email"
            value={input.email}
            onChange={changeHandler}
            placeholder="Enter your email" />
        </div>

        <div className="w-full">
          <Label>Password</Label>
          <Input type="password" name="password"
            value={input.password}
            onChange={changeHandler}
            placeholder="Enter your password" />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-red-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition">
          Login
        </button>
        <p className="text-sm-text-center">Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></p>
      </form>
    </div>
  );
};

export default Login;