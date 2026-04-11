import React from 'react';
import Button from '../ui/Button';
import { PlusIcon } from '../ui/Icons';

const UserHeader = ({ onAddClick }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-[40px] leading-tight font-extrabold tracking-tight text-gray-900">
          Team Directory
        </h1>
        <p className="text-gray-500 font-medium text-sm md:text-[15px] max-w-xl leading-relaxed">
          Manage your organization's members centrally. Invite teammates, assign privileges, and monitor access statuses in real-time.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Button variant="secondary" className="w-full sm:w-auto font-semibold">
          Export Database
        </Button>
        <Button 
          variant="primary" 
          icon={<PlusIcon className="w-[18px] h-[18px] stroke-[2.5]" />}
          className="w-full sm:w-auto font-bold px-6 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]"
          onClick={onAddClick}
        >
          Add New User
        </Button>
      </div>
    </div>
  );
};

export default UserHeader;
