import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RxCrossCircled } from "react-icons/rx";

const InputData = ({InputDiv,setInputDiv,setData,UpdatedData,setUpdatedData}) => {
    const [formData, setFormData] = useState({title:"",desc:""});
    useEffect(() => {
      
    setFormData({title:UpdatedData.title,desc:UpdatedData.desc});
    }, [UpdatedData])
    
    const change=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value});
    }
    const submitData = async () => {
        if (formData.title === "" || formData.desc === "") {
            alert("All fields are required");
            return;
        } 
        const body = new URLSearchParams();
        body.append("title", formData.title);
        body.append("desc", formData.desc);

        const headers = {
                    id: localStorage.getItem("id"),
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/x-www-form-urlencoded",
        };

        try {
                
            await axios.post("http://localhost:1000/api/v2/create-task", body, { headers });
                
            const updated = await axios.get("http://localhost:1000/api/v2/get-all-tasks", { headers });
            setData({tasks:updated.data.data}); 

            setFormData({ title: "", desc: "" });
            setUpdatedData({id:"",title:"",desc:""});
            setInputDiv("hidden");
        } catch (err) {
            console.error("❌ Error creating task:", err.response?.data || err.message);
            alert("❌ Failed to create task.");
        }
        
    };

    const UpdateTask=async()=>{
        if (formData.title === "" || formData.desc === "") {
            alert("All fields are required");
            return;
        } 
        const body = new URLSearchParams();
        body.append("title", formData.title);
        body.append("desc", formData.desc);

        const headers = {
                id: localStorage.getItem("id"),
                authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/x-www-form-urlencoded",
        };

        try {
                
            await axios.put(`http://localhost:1000/api/v2/update-tasks/${UpdatedData.id}`, body, { headers });
                
            const updated = await axios.get("http://localhost:1000/api/v2/get-all-tasks", { headers });
            setData({tasks:updated.data.data}); 

            setFormData({title:"",desc:""});
            setUpdatedData({id:"",title:"",desc:""});
            setInputDiv("hidden");
        } catch (err) {
            console.error("❌ Error updating task:", err.response?.data || err.message);
            alert("❌ Failed to update task.");
        }
        
    };


  return (
    <>
        <div className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}>
        </div>

        
        <div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
            <div className='w-2/6 bg-gray-900 p-4 rounded '>
                <div className='flex justify-end '>
                    <button className='text-2xl hover:scale-105' onClick={()=>{
                        setInputDiv("hidden");
                        setFormData({
                            title:"",desc:""
                        });
                        setUpdatedData({
                            id:"",title:"",desc:""
                        });
                    }}>
                        <RxCrossCircled />
                    </button>
                </div>
                 <input 
                    type="text" 
                    placeholder='title' 
                    name='title' 
                    required 
                    className='px-3 py-2 rounded w-full bg-gray-700 my-3'
                    value={formData.title}
                    onChange={change}
                 />
                 <textarea 
                    name="desc" 
                    cols='30' rows='10' placeholder='Description...' className='px-3 py-2 rounded w-full bg-gray-700 my-3'
                    value={formData.desc}
                    onChange={change}
                 >

                 </textarea>
                 {UpdatedData.id===""?
                    (<button className='px-3 py-2 bg-blue-300 rounded text-black text-xl font-semibold hover:scale-105' 
                    onClick={submitData}>Submit</button>)
                 :
                    (<button 
                    className='px-3 py-2 bg-blue-300 rounded text-black text-xl font-semibold hover:scale-105' 
                    onClick={UpdateTask}>
                        Update
                </button>
                 )}
            </div>
        </div>
    </>
  )
}

export default InputData