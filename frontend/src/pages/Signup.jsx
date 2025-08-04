import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios";
import {useSelector } from 'react-redux';

const Signup = () => {
  const history=useNavigate();
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
  if(isLoggedIn===true){
      history("/");
    }
  const [Data, setData] = useState({username:"",email:"",password:""});

  const change=(e)=>{
    const {name,value}=e.target;
    setData({...Data,[name]:value});
  };

  const submit = async () => {
  if (Data.username === "" || Data.email === "" || Data.password === "") {
    alert("All fields are required");
  } else {
    try {
      const encodedData = new URLSearchParams();
      encodedData.append("username", Data.username);
      encodedData.append("email", Data.email);
      encodedData.append("password", Data.password);

      const response = await axios.post(
        "http://localhost:1000/api/v1/sign-in",
        encodedData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setData({username:"",email:"",password:""})
      console.log("Signup successful:", response.data);
      history("/login");
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
      alert("Signup failed: " + (err.response?.data?.message || err.message));
    }
  }
  };
  return (
    <div className="h-[98vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="p-6 w-full sm:w-2/6 rounded-xl bg-white bg-opacity-5 backdrop-blur-lg shadow-xl border border-white border-opacity-10">
        <div className="text-3xl font-semibold text-white mb-6 text-center">Signup</div>

        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={change}
          value={Data.username}
          className="bg-gray-800 bg-opacity-70 text-white px-4 py-3 mb-4 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />

        <input
          type="email"
          placeholder="email:xyz@example.com"
          name="email"
          required
          onChange={change}
          value={Data.email}
          className="bg-gray-800 bg-opacity-70 text-white px-4 py-3 mb-4 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />

        <input
          type="password"
          placeholder="Enter your Password"
          name="password"
          required
          onChange={change}
          value={Data.password}
          className="bg-gray-800 bg-opacity-70 text-white px-4 py-3 mb-6 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />

        <div className='w-full flex items-center justify-between'>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full  transition-transform transform hover:scale-105" onClick={submit}>
                SignUp
           </button>
           <Link to="/login" className='text-gray-400 hover:text-gray-200'>
                Already have an account? Login here
           </Link>

        </div>
      </div>
    </div>
  );
};

export default Signup;