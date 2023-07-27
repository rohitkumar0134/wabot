import React from 'react';

const MessageTable = ({ messages }) => {
  return (
    <div className="bg-white shadow-md rounded my-6">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Number</th>
            <th className="px-4 py-2">Message</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id} className="border-b border-gray-200">
              <td className="px-4 py-2">{message.id}</td>
              <td className="px-4 py-2">{message.number}</td>
              <td className="px-4 py-2">{message.message}</td>
              <td className="px-4 py-2">{message.type}</td>
              <td className="px-4 py-2">{message.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MessageTable;
