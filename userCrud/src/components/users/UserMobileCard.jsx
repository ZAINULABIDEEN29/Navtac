import React from 'react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { EditIcon, DeleteIcon, DotsVerticalIcon } from '../ui/Icons';

const UserMobileCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-[24px] border border-gray-200/80 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-gray-300 transition-all duration-500 ease-out relative overflow-hidden group">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 shrink-0 bg-gradient-to-br from-gray-100 to-white rounded-full flex items-center justify-center font-bold text-xl text-gray-800 shadow-sm border border-gray-200/60 group-hover:scale-110 transition-transform duration-500">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-bold text-gray-900 text-lg tracking-tight mb-0.5">{user.name}</div>
            <div className="font-medium text-gray-500 text-sm">{user.email}</div>
          </div>
        </div>
        <div className="flex gap-1 -mr-2">
          <Button variant="icon" icon={<DotsVerticalIcon className="w-5 h-5" />} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 bg-gray-50/80 rounded-2xl p-4 border border-gray-100 mb-5">
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Access Role</div>
          <div className="font-semibold text-gray-800 text-sm bg-white px-2.5 py-1 rounded-lg border border-gray-200/60 inline-flex">{user.role}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Date Joined</div>
          <div className="font-semibold text-gray-700 text-sm py-1">{user.joined}</div>
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-1">
        <Badge status={user.status} />
        
        <div className="flex gap-2.5">
          <Button 
            variant="ghost" 
            icon={<EditIcon className="w-[18px] h-[18px] text-gray-600" />} 
            className="h-10 w-10 p-0 flex items-center justify-center bg-white border border-gray-200 shadow-sm hover:shadow hover:bg-gray-50 rounded-xl transition-all" 
            onClick={() => onEdit(user)}
          />
          <Button 
            variant="ghost" 
            icon={<DeleteIcon className="w-[18px] h-[18px] text-red-500" />} 
            className="h-10 w-10 p-0 flex items-center justify-center bg-white border border-gray-200 shadow-sm hover:shadow hover:bg-red-50 hover:border-red-200 rounded-xl transition-all" 
            onClick={() => onDelete(user.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default UserMobileCard;
