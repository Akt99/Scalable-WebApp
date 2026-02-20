import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail } from '../utils/validators';
import ThemeToggle from '../components/ThemeToggle';

const LoginPage = () => {
  const navigate = useNavigate();
  const { token, login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!validateEmail(form.email)) {
      setError('Please enter a valid email');
      return;
    }

    if (!form.password) {
      setError('Password is required');
      return;
    }

    try {
      setLoading(true);
      await login(form);
      navigate('/dashboard');
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
        <p className="mt-1 text-sm text-slate-500">Sign in to access your dashboard.</p>
        {error && <p className="mt-4 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className="w-full rounded border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 outline-none ring-brand-500 focus:ring"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                className="w-full rounded border border-slate-300 px-3 py-2 pr-12 text-slate-900 placeholder-slate-400 outline-none ring-brand-500 focus:ring"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2">
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.7a3 3 0 004.2 4.2" />
                    <path d="M9.9 5.1A10.5 10.5 0 0112 5c7 0 10 7 10 7a17.7 17.7 0 01-4 4.9" />
                    <path d="M6.6 6.7C3.6 8.4 2 12 2 12s3 7 10 7a10.4 10.4 0 005.2-1.3" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-brand-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-900 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          No account?{' '}
          <Link className="font-medium text-brand-700 hover:underline" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
