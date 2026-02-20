import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-slate-50 to-emerald-100 px-4 py-10 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Scalable Web App</h1>
          <ThemeToggle />
        </header>

        <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur dark:bg-slate-900/70">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300">Starter</p>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Auth + Dashboard + CRUD</h2>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            Build and test registration, login, protected routes, profile updates, and task management in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/login"
              className="rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-900"
            >
              Go to Login
            </Link>
            <Link
              to="/register"
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Create Account
            </Link>
            <Link
              to="/dashboard"
              className="rounded-lg border border-brand-300 px-5 py-2.5 text-sm font-medium text-brand-800 transition hover:bg-brand-50 dark:border-brand-500 dark:text-brand-300 dark:hover:bg-slate-800"
            >
              Open Dashboard
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
