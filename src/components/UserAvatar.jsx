import React, { useState } from 'react';

const UserAvatar = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="relative">
      {currentUser && currentUser.photoURL && (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}
          <img
            src={currentUser.photoURL}
            alt="صورة المستخدم"
            className={`rounded-full w-[90px] h-[90px] object-cover ${
              isLoading ? 'opacity-0' : 'opacity-100'
            } transition-opacity duration-300`}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </>
      )}
    </div>
  );
};

export default UserAvatar;