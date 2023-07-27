import React from 'react';



const Autoreplytable = ({data}) => {
  return (
    <div className="container mx-auto p-4">
     <h1> ALL Auto-Reply</h1>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">recieve</th>
            <th className="px-4 py-2">reply</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.receive}</td>
              <td className="border px-4 py-2">{item.reply}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Autoreplytable;
