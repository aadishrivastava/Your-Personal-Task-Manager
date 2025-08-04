import React,{ useState,useEffect } from 'react';
import Cards from '../components/Home/Cards';
import { MdAddCircle } from "react-icons/md";
import InputData from '../components/Home/InputData';
import axios from 'axios';

const AllTasks = () => {
  const [InputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState();
  const [UpdatedData, setUpdatedData] = useState({id:"",title:"",desc:""})
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`
  };
  useEffect(() => {
    const fetch=async ()=>{
      const response=await axios.get("http://localhost:1000/api/v2/get-all-tasks",{
        headers
      });
      
      setData({tasks:response.data.data});
    }
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      fetch();
    }
  },[]);
  return (
    <>
        <div>
        <div className='w-full flex justify-end px-4 py-2'>
            <button onClick={()=>setInputDiv("fixed")}>
                <MdAddCircle className='text-4xl text-gray-400 hover:text-gray-50 transition-all  duration-300 hover:scale-105' />
            </button>

        </div>
        {Data && (<Cards home={"true"} InputDiv={InputDiv} setInputDiv={setInputDiv} Data={Data} setData={setData} setUpdatedData={setUpdatedData}/>)}
       </div>
       <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} setData={setData} UpdatedData={UpdatedData} setUpdatedData={setUpdatedData}/>
    </>
  )
}

export default AllTasks;