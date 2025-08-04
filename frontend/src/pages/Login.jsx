import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import {authActions} from "../store/auth";
import {useDispatch,useSelector} from "react-redux";

const Login = () => {

  const [Data, setData] = useState({username:"",password:""});
  const history=useNavigate();
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
    if(isLoggedIn===true){
        history("/");
      }
  const dispatch=useDispatch();
  const change=(e)=>{
    const {name,value}=e.target;
    setData({...Data,[name]:value});
  };

  const submit = async () => {
    if (Data.username === "" ||  Data.password === "") {
      alert("All fields are required");
    } else {
      try {
        const encodedData = new URLSearchParams();
        encodedData.append("username", Data.username);
        encodedData.append("password", Data.password);

        const response = await axios.post(
          "http://localhost:1000/api/v1/log-in",
          encodedData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        setData({username:"",password:""})
        // console.log("Login successful:", response.data);
        localStorage.setItem("id",response.data.id);
        localStorage.setItem("token",response.data.token);
        dispatch(authActions.login());
        history("/");

      } catch (err) {
        console.error("Login failed:", err.response?.data || err.message);
        alert("Login failed: " + (err.response?.data?.message || err.message));
      }
    }
  };


  return (
    <div className="h-[98vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="p-6 w-full sm:w-2/6 rounded-xl bg-white bg-opacity-5 backdrop-blur-lg shadow-xl border border-white border-opacity-10">
        <div className="text-3xl font-semibold text-white mb-6 text-center">Sign-In</div>

        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={change}
          value={Data.username}
          required
          className="bg-gray-800 bg-opacity-70 text-white px-4 py-3 mb-4 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />

        

        <input
          type="password"
          placeholder="Enter your Password"
          name="password"
          onChange={change}
          value={Data.password}
          required
          className="bg-gray-800 bg-opacity-70 text-white px-4 py-3 mb-6 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />

        <div className='w-full flex items-center justify-between'>
            <button onClick={submit}className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full  transition-transform transform hover:scale-105">
                Login
           </button>
           <Link to="/signup" className='text-gray-400 hover:text-gray-200'>
                Not having an account? SignUp here
           </Link>

        </div>
      </div>
    </div>
  );
};

export default Login