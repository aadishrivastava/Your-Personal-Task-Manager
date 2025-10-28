import React, { useEffect, useState } from 'react'
import {CgNotes} from "react-icons/cg";
import { MdNotificationImportant } from "react-icons/md";
import { BiCheckDouble } from "react-icons/bi";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';

const Sidebar = () => {
    const history=useNavigate();
    const dispatch=useDispatch();
    const data=[
        {
            title:"All Tasks",
            icon:<CgNotes/>,
            link:"/",
        },
        {
            title:"Important Tasks",
            icon:<MdNotificationImportant />,
            link:"/importantTasks",
        },
        {
            title:"Completed Tasks",
            icon:<BiCheckDouble/>,
            link:"/completedTasks",
        },
        {
            title:"Incompleted Tasks",
            icon:<TbNotebookOff />,
            link:"/incompletedTasks",
        },
    ];

    const [Data, setData] = useState();

    const logout=()=>{
        dispatch(authActions.logout());
        localStorage.removeItem("id");
        localStorage.removeItem("token");

        history("/signup")
    };
    const headers={
        id:localStorage.getItem("id"),authorization:`Bearer ${localStorage.getItem("token")}`

    };
    useEffect(() => {
      const fetch=async ()=>{
        const response=await axios.get("https://your-personal-task-manager-backend.onrender.com/api/v2/user",{
            headers
        });
        setData(response.data.data);
      }
    
      if(localStorage.getItem("id") && localStorage.getItem("token")){
      fetch();
    }
    },[]);
    


  return (
    <>

        {Data && <div className='flex flex-col max-w-full break-words text-white' >
            <h2 className='break-all text-xl font-semibold'>{Data.username}</h2>
            <h4 className='break-all mb-1 text-gray-400  '>{Data.email}</h4>
            <hr />
        </div>}
        <div>
            {data.map((items,i)=>(
                <Link to={items.link} key={i} className='my-2 flex items-center hover:bg-gray-600 p-2 rounded  transition-all duration-300 '>
                    {items.icon}&nbsp;{items.title}
                </Link>
            ))}
        </div>
        <div>
            <button className='bg-gray-600 w-full p-2 rounded' onClick={logout}>logout</button>
        </div>
    </>
  )
}

export default Sidebar;