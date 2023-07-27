import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios'
import Profile from '../components/Profile';
import demoqr from '../assets/qrcode.png'
import Navbar from '../components/Navbar';
import { Logout_whatsapp_url, profile_url, web_url } from '../contants/const';


function Home() {
  const [qrimage, setQrimage] = useState(demoqr);
  const [profile, setPofile] = useState('');

  const socket = io(web_url, {
    autoConnect: false
  });

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("connect with id : ", socket.id);
    });
    fetchprofile()

    socket.on("qr", (data) => {
      console.log("Received QR data:", data);
      setQrimage(data);
    });

    socket.on("clientready", () => {
      fetchprofile()
        });

    return () => {
      // Clean up the socket connection when the component unmounts
      socket.disconnect();
    };
  }, []); // Empty dependency array to run only once on component mount





const fetchprofile=async()=>{
  const {data}=await axios.get(profile_url)
  console.log(data)
  setPofile(data)
}

const logout =async () => {
  const {data}=await axios.post(Logout_whatsapp_url)
  console.log(data)

 };



  return (
    <>
    <Navbar/>
     { !profile&& <img src={`${qrimage}`} alt="Image description" />}
   { profile&&  <Profile profile={profile} logout={logout} />}
    </>
  );
}

export default Home;
