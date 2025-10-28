import React, { useEffect,useState } from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios';
const ImportantTasks = () => {
  const [Data, setData] = useState([]);
  const headers={
      id:localStorage.getItem("id"),
      authorization:`Bearer ${localStorage.getItem("token")}`
    };
    useEffect(() => {
      const fetch=async ()=>{
        try {
        const response = await axios.get("https://your-personal-task-manager-backend.onrender.com/api/v2/get-imp-tasks", { headers });
        setData({tasks:response.data.data});
      } catch (error) {
        console.error("❌ Failed to fetch important tasks:", error.response?.data || error.message);
      }
      }
      fetch();
    },[]);
  return (
    <div><Cards home={"false"} Data={Data} setData={setData}/></div>
  )
}

export default ImportantTasks