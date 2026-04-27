import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className='container mx-auto px-4 mt-20 sm:mt-24 mb-16 sm:mb-24'>
      {children}
    </div>
  );
};

export default MainLayout;
