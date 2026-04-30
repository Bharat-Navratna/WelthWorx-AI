import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className='flex justify-center items-start pt-24 sm:pt-32 min-h-screen px-4'>
      {children}
    </div>
  );
};

export default AuthLayout;
