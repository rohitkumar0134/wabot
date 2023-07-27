/* src/Navbar.js */
import React, { useEffect } from 'react';
import { checkToken } from '../hooks/checkToken';

const Navbar = () => {
  useEffect(() => {
    checkToken();
  }, []);
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-xl">whatsbot</div>
          <ul className="flex space-x-4">
            <li><a className="text-white hover:text-gray-200" href="/">Home</a></li>
            <li><a className="text-white hover:text-gray-200" href="/sentmsg">Sent msg</a></li>
            <li><a className="text-white hover:text-gray-200" href="/autoreply">Auto reply</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
