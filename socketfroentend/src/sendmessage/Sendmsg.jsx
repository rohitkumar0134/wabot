import React, { useEffect, useState } from 'react';
import MessageTable from '../components/MessageTable';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Sendmsg = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch data from your API or data source
    // For example, using fetch or axios
    const fetchMessages = async () => {
      const response = await axios.get(sentmsg_url); // Replace with your API endpoint
      setMessages(response.data);
    };

    fetchMessages();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Message Table</h1>
      <MessageTable messages={messages} />
    </div>
    </>
  );
};

export default Sendmsg;
