import React,{useState,useEffect} from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios';
const CompletedTasks = () => {
  const [Data, setData] = useState([]);
  const headers={
      id:localStorage.getItem("id"),
      authorization:`Bearer ${localStorage.getItem("token")}`
    };
    useEffect(() => {
      const fetch=async ()=>{
        try {
        const response = await axios.get("http://localhost:1000/api/v2/get-complete-tasks", { headers });
        setData({tasks:response.data.data});
      } catch (error) {
        console.error("❌ Failed to fetch completed tasks:", error.response?.data || error.message);
      }
      }
      fetch();
    },[]);
  return (
    
    <div>
      <Cards home={"false"} Data={Data} setData={setData}/>
    </div>
  )
}

export default CompletedTasks