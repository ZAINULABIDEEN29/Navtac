import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Mail, Lock, ArrowRight, LogIn } from 'lucide-react';
import { useLogin } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();

  const { mutateAsync: login, isPending } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values,{resetForm}) => {
      try {
        await login(values);
        resetForm()
        navigate('/dashboard');
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="auth-wrapper fade-in">
      <div className="auth-card glass">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Enter your credentials to access your account</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="auth-form">
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

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>
                Forgot Password?
              </Link>
            </div>
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

          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            <LogIn size={20} />
            <span>{formik.isSubmitting ? 'Signing In...' : 'Sign In'}</span>
          </button>
        </form>

        <div style={{ marginTop: '10px' }} className="auth-footer">
          <p>
            Don't have an account? <Link to="/register" className="auth-link">Create Account <ArrowRight size={16} /></Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
