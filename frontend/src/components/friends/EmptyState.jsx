import React from 'react';

const EmptyState = ({ icon, title, description }) => (
  <div className="col-span-full text-center py-16">
    <div className="mx-auto w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mb-6 text-3xl">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-500 text-lg">{description}</p>
  </div>
);

export default EmptyState;
