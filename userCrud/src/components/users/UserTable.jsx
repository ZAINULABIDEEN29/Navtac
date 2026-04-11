import React from 'react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { EditIcon, DeleteIcon } from '../ui/Icons';

const UserTable = ({ users = [], onEdit, onDelete }) => {
  return (
    <div className="hidden md:block bg-white rounded-[24px] border border-gray-200/70 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden animate-fade-in relative z-10 transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50/60 border-b border-gray-100">
              <th className="py-5 px-7 font-bold text-[11px] text-gray-500 uppercase tracking-widest w-1/3">Profile Details</th>
              <th className="py-5 px-7 font-bold text-[11px] text-gray-500 uppercase tracking-widest">Access Role</th>
              <th className="py-5 px-7 font-bold text-[11px] text-gray-500 uppercase tracking-widest">Date Joined</th>
              <th className="py-5 px-7 font-bold text-[11px] text-gray-500 uppercase tracking-widest text-center">Status</th>
              <th className="py-5 px-7 font-bold text-[11px] text-gray-500 uppercase tracking-widest text-right">Manage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100/80 bg-white">
            {users.map((user, index) => (
              <tr 
                key={user.id} 
                className="hover:bg-gray-50/50 transition-colors duration-200 group"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <td className="py-4 px-7">
                  <div className="flex items-center gap-4">
                    <div className="h-[42px] w-[42px] shrink-0 bg-gradient-to-br from-gray-100 to-white rounded-full flex items-center justify-center font-bold text-gray-800 shadow-sm border border-gray-200/50 group-hover:scale-105 transition-transform">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-[15px] text-gray-900 group-hover:text-black transition-colors">{user.name}</div>
                      <div className="text-gray-500 font-medium text-[13px] mt-0.5">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-7">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-50 text-gray-700 text-xs font-semibold border border-gray-200/60">{user.role}</span>
                </td>
                <td className="py-4 px-7 text-gray-600 font-medium text-[14px]">
                  {user.joined}
                </td>
                <td className="py-4 px-7 text-center">
                  <Badge status={user.status} />
                </td>
                <td className="py-4 px-7 text-right">
                  <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button 
                      variant="ghost" 
                      icon={<EditIcon className="w-4 h-4 text-gray-600" />} 
                      title="Modify Access" 
                      className="p-2.5 shadow-sm bg-white border border-gray-200/50 hover:bg-gray-50" 
                      onClick={() => onEdit(user)}
                    />
                    <Button 
                      variant="ghost" 
                      icon={<DeleteIcon className="w-4 h-4 text-red-500" />} 
                      title="Revoke Access" 
                      className="p-2.5 shadow-sm bg-white border border-gray-200/50 hover:border-red-200 hover:bg-red-50" 
                      onClick={() => onDelete(user.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
