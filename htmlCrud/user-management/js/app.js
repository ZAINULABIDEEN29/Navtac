// State Management
let users = [];
let isEditing = false;
let currentUserId = null;

// DOM Elements
const userTableBody = document.getElementById('userTableBody');
const loadingIndicator = document.getElementById('loadingIndicator');
const emptyState = document.getElementById('emptyState');
const userModal = document.getElementById('userModal');
const userForm = document.getElementById('userForm');
const modalTitle = document.getElementById('modalTitle');
const userIdInput = document.getElementById('userIdInput');
const searchInput = document.getElementById('searchInput');
const addUserBtn = document.getElementById('addUserBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelBtn = document.getElementById('cancelBtn');
const toast = document.getElementById('toast');

// Stats Elements
const totalUsersCount = document.getElementById('totalUsersCount');
const verifiedEmailsCount = document.getElementById('verifiedEmailsCount');

// API Configuration
const BASE_URL = 'https://dummyjson.com/users';

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
    setupEventListeners();
});

function setupEventListeners() {
    // Modal controls
    addUserBtn.addEventListener('click', () => openModal());
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Close modal on escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !userModal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Form submission
    userForm.addEventListener('submit', handleFormSubmit);

    // Search functionality
    let timeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            searchUsers(e.target.value);
        }, 500);
    });

    // Delegated Action Buttons (Edit/Delete)
    userTableBody.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target) return;

        const id = parseInt(target.dataset.id);
        if (target.classList.contains('edit-btn')) {
            handleEditClick(id);
        } else if (target.classList.contains('delete-btn')) {
            handleDeleteClick(id);
        }
    });
}

// --- API Operations ---

async function fetchUsers() {
    toggleLoading(true);
    try {
        const response = await fetch(`${BASE_URL}?limit=10`);
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        users = data.users;
        renderUsers(users);
        updateStats();
    } catch (error) {
        showToast('Error', error.message, 'error');
    } finally {
        toggleLoading(false);
    }
}

async function searchUsers(query) {
    if (!query.trim()) {
        fetchUsers();
        return;
    }
    
    toggleLoading(true);
    try {
        const response = await fetch(`${BASE_URL}/search?q=${query}`);
        if (!response.ok) throw new Error('Search failed');
        const data = await response.json();
        users = data.users;
        renderUsers(users);
    } catch (error) {
        showToast('Search Error', error.message, 'error');
    } finally {
        toggleLoading(false);
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(userForm);
    const userData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone')
    };

    toggleLoading(true);
    try {
        if (isEditing) {
            // Update User
            const response = await fetch(`${BASE_URL}/${currentUserId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            if (!response.ok) throw new Error('Failed to update user');
            const data = await response.json();
            
            // Manual UI Update (as dummyjson doesn't persist)
            const index = users.findIndex(u => u.id === currentUserId);
            if (index !== -1) users[index] = { ...users[index], ...userData };
            
            showToast('Success', 'Profile updated successfully', 'success');
        } else {
            // Add User
            const response = await fetch(`${BASE_URL}/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            if (!response.ok) throw new Error('Failed to create user');
            const data = await response.json();
            
            // Manual UI Update
            const newUser = { ...data, id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1 };
            users = [newUser, ...users];
            
            showToast('User Created', 'New account has been registered', 'success');
        }

        renderUsers(users);
        updateStats();
        closeModal();
    } catch (error) {
        showToast('Action Failed', error.message, 'error');
    } finally {
        toggleLoading(false);
    }
}

async function handleDeleteClick(id) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    toggleLoading(true);
    try {
        const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete user');
        
        // Manual UI Update
        users = users.filter(u => u.id !== id);
        renderUsers(users);
        updateStats();
        showToast('Deleted', 'User record has been removed', 'success');
    } catch (error) {
        showToast('Delete Error', error.message, 'error');
    } finally {
        toggleLoading(false);
    }
}

// --- UI Logic ---

function renderUsers(usersToRender) {
    userTableBody.innerHTML = '';
    
    if (usersToRender.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    usersToRender.forEach(user => {
        const row = document.createElement('tr');
        row.className = 'group transition-all duration-300 hover:bg-slate-50 border-transparent';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-400">#${user.id}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-inner ring-2 ring-white">
                        ${user.firstName.charAt(0)}${user.lastName.charAt(0)}
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-bold text-slate-800">${user.firstName} ${user.lastName}</div>
                        <div class="text-xs text-slate-400 font-medium">Joined April 2026</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-slate-600">${user.email}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-slate-600">${user.phone}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right space-x-2">
                <button data-id="${user.id}" class="edit-btn p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Edit Profile">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button data-id="${user.id}" class="delete-btn p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete User">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

function handleEditClick(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;
    
    openModal(user);
}

function openModal(user = null) {
    isEditing = !!user;
    currentUserId = user ? user.id : null;
    modalTitle.innerText = isEditing ? 'Edit User Profile' : 'Add New User';
    
    if (user) {
        document.getElementById('firstName').value = user.firstName;
        document.getElementById('lastName').value = user.lastName;
        document.getElementById('email').value = user.email;
        document.getElementById('userPhone').value = user.phone;
    } else {
        userForm.reset();
    }
    
    userModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    userModal.classList.add('hidden');
    userForm.reset();
    document.body.style.overflow = 'auto';
}

function toggleLoading(isLoading) {
    if (isLoading) {
        loadingIndicator.classList.remove('hidden');
        userTableBody.classList.add('opacity-50');
    } else {
        loadingIndicator.classList.add('hidden');
        userTableBody.classList.remove('opacity-50');
    }
}

function updateStats() {
    totalUsersCount.innerText = users.length;
    // Mock metric for design
    verifiedEmailsCount.innerText = users.filter((_, i) => i % 2 === 0).length;
}

function showToast(title, message, type = 'success') {
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');

    toastTitle.innerText = title;
    toastMessage.innerText = message;

    if (type === 'success') {
        toast.className = 'fixed bottom-8 right-8 z-50 transform transition-all duration-300 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border border-emerald-100 bg-white translate-y-0 opacity-100';
        toastIcon.className = 'w-8 h-8 rounded-full flex items-center justify-center bg-emerald-500 text-white';
        toastIcon.innerHTML = '<i class="fa-solid fa-check"></i>';
    } else {
        toast.className = 'fixed bottom-8 right-8 z-50 transform transition-all duration-300 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border border-red-100 bg-white translate-y-0 opacity-100';
        toastIcon.className = 'w-8 h-8 rounded-full flex items-center justify-center bg-red-500 text-white';
        toastIcon.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
    }

    setTimeout(() => {
        toast.classList.add('translate-y-20');
        toast.classList.remove('opacity-100');
    }, 4000);
}
