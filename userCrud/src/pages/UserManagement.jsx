import React, { useState, useMemo, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import UserHeader from '../components/users/UserHeader';
import UserFilters from '../components/users/UserFilters';
import UserList from '../components/users/UserList';
import Pagination from '../components/ui/Pagination';
import UserFormModal from '../components/users/UserFormModal';
import { useUserContext } from '../context/UserContext';
import { SearchIcon } from '../components/ui/Icons';

const UserManagementPage = () => {
  const { state, addUser, updateUser, deleteUser } = useUserContext();
  const { users, loading, error } = state;

  // Filter & Pagination States
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modal States for Add/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  // 1. Process Filtering dynamically 
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchRole = roleFilter === '' || user.role.toLowerCase() === roleFilter.toLowerCase();
      return matchSearch && matchRole;
    });
  }, [users, searchTerm, roleFilter]);

  // Reset pagination if filters are modified broadly
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter]);

  // 2. Process Pagination Slice dynamically
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  // Handlers
  const handleAddClick = () => {
    setUserToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (user) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to completely revoke access for this user? This action cannot be reversed.")) {
      await deleteUser(id);
      // Automatically pull user back one page if they delete the absolute last item on a tail page
      if (paginatedUsers.length === 1 && currentPage > 1) {
         setCurrentPage(prev => prev - 1);
      }
    }
  };

  const handleFormSubmit = async (payload) => {
    if (userToEdit) {
      await updateUser(userToEdit.id, payload);
    } else {
      await addUser(payload);
    }
  };

  return (
    <MainLayout>
      <UserHeader onAddClick={handleAddClick} />
      <UserFilters 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
        roleFilter={roleFilter} 
        onRoleChange={setRoleFilter} 
      />
      
      <div className="relative min-h-[400px]">
        {loading && !users.length ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm z-20 rounded-3xl animate-fade-in shadow-sm border border-gray-100/50">
              <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-black rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="mt-6 font-semibold tracking-wide text-sm text-gray-500 animate-pulse">Syncing Directory...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-red-50/50 border border-red-100 rounded-3xl animate-slide-up shadow-sm">
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-5 shadow-sm">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
              </div>
              <p className="font-bold text-gray-900 text-xl mb-2">Connection Interrupted</p>
              <p className="text-gray-500 font-medium max-w-md">{error}</p>
          </div>
        ) : (
          <div className={loading ? 'opacity-50 pointer-events-none transition-opacity duration-300 relative z-10' : 'transition-opacity duration-300 relative z-10'}>
              <UserList 
                 users={paginatedUsers} 
                 onEdit={handleEditClick} 
                 onDelete={handleDeleteClick} 
              />
              
              {filteredUsers.length > 0 && (
                <Pagination 
                   total={filteredUsers.length} 
                   currentPage={currentPage}
                   itemsPerPage={itemsPerPage}
                   onPageChange={setCurrentPage} 
                />
              )}
              
              {filteredUsers.length === 0 && !loading && (
                <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-[24px] border border-gray-100 shadow-sm animate-fade-in mt-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                    <SearchIcon className="w-10 h-10" />
                  </div>
                  <p className="font-bold text-gray-900 text-lg mb-2">No active members found</p>
                  <p className="text-gray-500 font-medium max-w-md">Try adjusting your directory filters or add a new team member to get started.</p>
                </div>
              )}
          </div>
        )}
      </div>

      <UserFormModal 
         isOpen={isModalOpen} 
         onClose={() => setIsModalOpen(false)} 
         user={userToEdit}
         onSubmit={handleFormSubmit}
      />
    </MainLayout>
  );
};

export default UserManagementPage;
