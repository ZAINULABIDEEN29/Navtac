import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Mail, Lock, User, UserPlus, ArrowRight, ShieldCheck } from 'lucide-react';
import { useRegister } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  terms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
});

const Register = () => {
  const navigate = useNavigate();
  const { mutateAsync: register } = useRegister();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
    validationSchema: registerSchema,
    onSubmit: async (values,{resetForm}) => {
      try {
        console.log(values)
        await register(values);
        // resetForm()
        navigate("/")
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="auth-wrapper fade-in">
      <div className="auth-card glass">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join our community and start managing your products</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">User Name</label>
            <div className={`input-with-icon ${formik.touched.username && formik.errors.username ? 'input-error' : ''}`}>
              <User className="input-icon" size={20} />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="John Doe"
                {...formik.getFieldProps('username')}
              />
            </div>
            {formik.touched.username && formik.errors.username ? (
              <div className="error-message">{formik.errors.username}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className={`input-with-icon ${formik.touched.email && formik.errors.email ? 'input-error' : ''}`}>
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                {...formik.getFieldProps('email')}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="error-message">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className={`input-with-icon ${formik.touched.password && formik.errors.password ? 'input-error' : ''}`}>
                <Lock className="input-icon" size={20} />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  {...formik.getFieldProps('password')}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="error-message">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm</label>
              <div className={`input-with-icon ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'input-error' : ''}`}>
                <ShieldCheck className="input-icon" size={20} />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  {...formik.getFieldProps('confirmPassword')}
                />
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="error-message">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
          </div>

          <div className="terms-check">
            <input 
              type="checkbox" 
              id="terms" 
              name="terms"
              checked={formik.values.terms}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="terms" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              I agree to the <Link to="/terms" style={{ color: 'var(--primary)' }}>Terms & Conditions</Link>
            </label>
            {formik.touched.terms && formik.errors.terms ? (
              <div className="error-message" style={{ display: 'block', marginTop: '5px' }}>{formik.errors.terms}</div>
            ) : null}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            <UserPlus size={20} />
            <span>{formik.isSubmitting ? 'Creating Account...' : 'Create Account'}</span>
          </button>
        </form>

        <div style={{ marginTop: '10px' }} className="auth-footer">
          <p>
            Already have an account? <Link to="/" className="auth-link">Sign In <ArrowRight size={16} /></Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
