import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';

const UserSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Must be at least 2 characters').max(50, 'Cannot exceed 50 characters').required('First name is required'),
  lastName: Yup.string().min(2, 'Must be at least 2 characters').max(50, 'Cannot exceed 50 characters').required('Last name is required'),
  email: Yup.string().email('Please enter a valid email structure (e.g., name@domain.com)').required('Corporate email is strictly required'),
  role: Yup.string().oneOf(['admin', 'manager', 'user']).required('Security role assignment is required'),
});

const UserFormModal = ({ isOpen, onClose, user, onSubmit }) => {
  const isEditing = !!user;

  const formik = useFormik({
    initialValues: {
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ').slice(1).join(' ') || '',
      email: user?.email || '',
      role: user?.role?.toLowerCase() || 'user',
    },
    enableReinitialize: true,
    validationSchema: UserSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        role: values.role
      };
      
      if (isEditing) payload.id = user.id;

      await onSubmit(payload);
      setSubmitting(false);
      resetForm();
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Modify Member Access' : 'Provision New Member'}>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">First Name</label>
            <Input 
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="E.g. Jane" 
              className={formik.touched.firstName && formik.errors.firstName ? 'border-red-300 ring-2 ring-red-100 bg-red-50/30' : ''}
              disabled={formik.isSubmitting}
            />
            {formik.touched.firstName && formik.errors.firstName && <div className="text-red-500 text-xs font-semibold mt-2">{formik.errors.firstName}</div>}
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Last Name</label>
            <Input 
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Doe"
              className={formik.touched.lastName && formik.errors.lastName ? 'border-red-300 ring-2 ring-red-100 bg-red-50/30' : ''}
              disabled={formik.isSubmitting}
            />
            {formik.touched.lastName && formik.errors.lastName && <div className="text-red-500 text-xs font-semibold mt-2">{formik.errors.lastName}</div>}
          </div>
        </div>

        <div>
           <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Corporate Email Address</label>
           <Input 
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="jane.doe@navtac.com"
              className={formik.touched.email && formik.errors.email ? 'border-red-300 ring-2 ring-red-100 bg-red-50/30' : ''}
              disabled={formik.isSubmitting}
           />
           {formik.touched.email && formik.errors.email && <div className="text-red-500 text-xs font-semibold mt-2">{formik.errors.email}</div>}
        </div>

        <div>
           <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">System Access Privilege</label>
           <div className="relative group">
             <select 
               name="role"
               value={formik.values.role}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               disabled={formik.isSubmitting}
               className="w-full px-5 py-3.5 bg-white border border-gray-200/80 rounded-2xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-[3px] focus:ring-black/5 focus:border-gray-400 transition-all shadow-sm hover:border-gray-300 appearance-none cursor-pointer"
             >
                <option value="admin">Root Administrator (L3)</option>
                <option value="manager">Section Manager (L2)</option>
                <option value="user">Standard User (L1)</option>
             </select>
             <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none text-gray-400">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="miter" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
             </div>
           </div>
        </div>

        <div className="pt-6 mt-6 flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-gray-100">
          <Button variant="ghost" type="button" onClick={onClose} disabled={formik.isSubmitting} className="font-semibold px-6 w-full sm:w-auto">Cancel</Button>
          <Button variant="primary" type="submit" disabled={formik.isSubmitting} className="px-8 shadow-md w-full sm:w-auto">
             {formik.isSubmitting ? 'Syncing...' : (isEditing ? 'Save Changes' : 'Provision User')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UserFormModal;
