import axios from 'axios';
import React,{useEffect, useState} from 'react'
import Autoreplytable from '../components/Autoreplytable';
import Navbar from '../components/Navbar';
import { autoreply_url } from '../contants/const';


function Autoreply() {
    const [recieve, setrecieve] = useState('');
    const [reply, setreply] = useState('');
    const [apidata,setApidata]=useState([])
  
    const handlereciveChange = (e) => {
      setrecieve(e.target.value);
    };
  
    const handlereplyChange = (e) => {
      setreply(e.target.value);
    };
  
    const handlesubmit = async() => {
      // Handle button click action here
      const data={
        receive:recieve,
        reply:reply
      }
   console.log(data);
      const res=await axios.post(autoreply_url,data)

      fetchapidata()
      setrecieve("")
      setreply("")

     
    };


    const fetchapidata=async()=>{
      const res=await axios.get(autoreply_url)
      console.log(res.data)
      setApidata(res.data)
    }

    useEffect(()=>{
fetchapidata()
    },[])
    return (
      <>
      <Navbar/>
        <div className="p-4">
          <div className="mb-4">
            <input
              type="text"
              value={recieve}
              onChange={handlereciveChange}
              placeholder="receive"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={reply}
              onChange={handlereplyChange}
              placeholder="reply"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            />
          </div>
          <button
            onClick={handlesubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add auto reply
          </button>
        </div>
        <Autoreplytable data={apidata}/>
      </>
      );
}

export default Autoreply