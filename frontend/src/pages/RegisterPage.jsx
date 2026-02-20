import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../utils/validators';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { token, register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (form.name.trim().length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }

    if (!validateEmail(form.email)) {
      setError('Please enter a valid email');
      return;
    }

    if (!validatePassword(form.password)) {
      setError('Password needs 8+ chars, 1 uppercase letter, and 1 number');
      return;
    }

    try {
      setLoading(true);
      await register(form);
      navigate('/dashboard');
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
        <p className="mt-1 text-sm text-slate-500">Get started with your personal dashboard.</p>
        {error && <p className="mt-4 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="w-full rounded border border-slate-300 px-3 py-2 outline-none ring-brand-500 focus:ring"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className="w-full rounded border border-slate-300 px-3 py-2 outline-none ring-brand-500 focus:ring"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              className="w-full rounded border border-slate-300 px-3 py-2 outline-none ring-brand-500 focus:ring"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-brand-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-900 disabled:opacity-60"
          >
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          Already have an account?{' '}
          <Link className="font-medium text-brand-700 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
