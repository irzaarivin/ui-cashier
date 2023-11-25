// ./src/app/components/Sidebar.js
import React from 'react';

const Sidebar = ({ categories, onSelectCategory }) => {
  return (
    <div className="bg-gray-200 p-4 h-screen">
      <h2 className="text-lg font-semibold mb-4">Kategori</h2>
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            className="mb-2 cursor-pointer text-blue-500 hover:text-blue-700 transition duration-300"
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
