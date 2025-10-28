import axios from "axios";
import React from "react";
import { useLocation } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";
import { MdEditNote } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { MdAddCircle } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

const Cards = ({home,setInputDiv,Data={},setData,setUpdatedData}) => {
    
    const location = useLocation();
    const handleCompleteTask = async (id,newStatus) => {
    try {
        const headers = {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        };

        const body = new URLSearchParams();
        body.append("complete",newStatus);
        await axios.put(
            `https://your-personal-task-manager-backend.onrender.com/api/v2/update-complete-task/${id}`,
            {},
            { headers }
        );
        let fetchUrl = "https://your-personal-task-manager-backend.onrender.com/api/v2/get-all-tasks";
        if (location.pathname === "/importantTasks") {
            fetchUrl = "https://your-personal-task-manager-backend.onrender.com/api/v2/get-imp-tasks";
        } else if (location.pathname === "/completedTasks") {
            fetchUrl = "https://your-personal-task-manager-backend.onrender.com/api/v2/get-complete-tasks";
        } else if (location.pathname === "/incompletedTasks") {
            fetchUrl = "https://your-personal-task-manager-backend.onrender.com/api/v2/get-incomplete-tasks";
        }

        const updated = await axios.get(fetchUrl, { headers });
        setData({tasks:updated.data.data});
        
    } catch (err) {
        console.error("❌Error updating task:", err.response?.data || err.message);
    }
    };

    const handleImportant = async (id,newStatus) => {
        try {
            const headers = {
                id: localStorage.getItem("id"),
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/x-www-form-urlencoded",
            };

            const body = new URLSearchParams();
            body.append("important",newStatus);
            const res=await axios.put(
                `https://your-personal-task-manager-backend.onrender.com/api/v2/update-imp-task/${id}`,
                {},
                { headers }
            );
            
             
            let fetchUrl = "https://your-personal-task-manager-backend.onrender.com/api/v2/get-all-tasks";
            if (location.pathname === "/importantTasks") {
            fetchUrl = "https://your-personal-task-manager-backend.onrender.com/api/v2/get-imp-tasks";
            } else if (location.pathname === "/completedTasks") {
            fetchUrl = "https://your-personal-task-manager-backend.onrender.com/api/v2/get-complete-tasks";
            } else if (location.pathname === "/incompletedTasks") {
            fetchUrl = "https://your-personal-task-manager-backend.onrender.com/api/v2/get-incomplete-tasks";
            }

            const updated = await axios.get(fetchUrl, { headers });
            setData({ tasks: updated.data.data });
        
            console.log(res);
        } catch (err) {
            console.error("❌Error updating task:", err.response?.data || err.message);
        }
    };


    const handleUpdate= (id,title,desc)=>{
        const headers = {
                id: localStorage.getItem("id"),
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/x-www-form-urlencoded",
            };
        setInputDiv("fixed");
        setUpdatedData({id:id,title:title,desc:desc});
    }

    const deleteTask = async (id) => {
  try {
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const res = await axios.delete(
      `https://your-personal-task-manager-backend.onrender.com/api/v2/delete-tasks/${id}`,
      { headers }
    );

    let fetchUrl = "https://your-personal-task-manager-backend.onrender.com/api/v2/get-all-tasks";
    if (location.pathname === "/importantTasks") {
      fetchUrl = "https://your-personal-task-manager-backend.onrender.com/api/v2/get-imp-tasks";
    } else if (location.pathname === "/completedTasks") {
      fetchUrl = "https://your-personal-task-manager-backend.onrender.com/api/v2/get-complete-tasks";
    } else if (location.pathname === "/incompletedTasks") {
      fetchUrl = "https://your-personal-task-manager-backend.onrender.com/api/v2/get-incomplete-tasks";
    }


    const updated = await axios.get(fetchUrl, { headers });
    setData({ tasks: updated.data.data });

  } catch (err) {
    console.error("❌ Error deleting task:", err.response?.data || err.message);
  }
};



    return (
      <div className='grid grid-cols-3 gap-4 p-4'>
        {Array.isArray(Data.tasks) &&  (Data.tasks.map((items,i)=>(
            <div key={items._id|| i} className='flex flex-col justify-between bg-gray-800 rounded-sm p-4 '>
                <div >
                    <h3 className='text-xl font-semibold'>{items.title}</h3>
                    <p className='text-gray-300 my-2'>{items.desc}</p>
                    
                </div>
                <div className='mt-4 w-full flex items-center'>
                        <button className={`${items.complete===false?"bg-red-400":"bg-green-700"} p-2 rounded flex-1 min-w-0 text-sm sm:text-base whitespace-normal break-words hover:scale-105 transition-all duration-300  text-center`}
                        onClick={()=>handleCompleteTask(items._id,!items.complete)} >{items.complete===true?"Completed":"Incomplete"}</button>
                        <div className='text-white  p-2 w-3/6 text-2xl flex justify-around '>
                            <button className='hover:scale-105 transition-all duration-300' onClick={()=>handleImportant(items._id,!items.important)}>
                                {items.important=== false?<CiHeart />:<FaHeart className="text-red-600 " /> }
                            
                            </button>
                            {home !== "false" && (<button className='hover:scale-105 transition-all duration-300'
                            onClick={()=>handleUpdate(items._id,items.title,items.desc)}>
                                <MdEditNote />
                            </button>
                            )}
                            <button onClick={()=>deleteTask(items._id)}className='hover:scale-105 transition-all duration-300'>
                                <MdDeleteForever />
                            </button>
                        </div>
                </div>
            </div>
            ))
        )}
            {home==="true" && (
                <button className='flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 cursor-pointer transition-all duration-300' onClick={()=>setInputDiv("fixed")}>
                <MdAddCircle className='text-5xl'/>
                <h2 className='text-2xl mt-4'>Add Task</h2>
                </button>
            )}
        
      </div>
  )
}

export default Cards