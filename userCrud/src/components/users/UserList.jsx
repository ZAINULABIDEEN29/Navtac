import React from 'react';
import UserTable from './UserTable';
import UserMobileCard from './UserMobileCard';

const UserList = ({ users = [], onEdit, onDelete }) => {
  return (
    <>
      <UserTable users={users} onEdit={onEdit} onDelete={onDelete} />
      
      {/* Mobile / Tablet Card View */}
      <div className="md:hidden flex flex-col gap-5 animate-slide-up">
        {users.map((user, index) => (
          <div key={user.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in fill-mode-both">
            <UserMobileCard user={user} onEdit={onEdit} onDelete={onDelete} />
          </div>
        ))}
      </div>
    </>
  );
};

export default UserList;
