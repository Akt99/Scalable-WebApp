import { useEffect, useState } from 'react';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { validateEmail } from '../utils/validators';
import ThemeToggle from '../components/ThemeToggle';

const DashboardPage = () => {
  const { user, logout, setUser, fetchProfile } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const [profileForm, setProfileForm] = useState({ name: '', email: '' });
  const [profileLoading, setProfileLoading] = useState(false);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/tasks', {
        params: {
          q: query || undefined,
          status: statusFilter || undefined,
          limit: 100
        }
      });
      setTasks(response.data.data.items);
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [query, statusFilter]);

  useEffect(() => {
    const syncProfile = async () => {
      const profile = user || (await fetchProfile());
      if (profile) {
        setProfileForm({
          name: profile.name || '',
          email: profile.email || ''
        });
      }
    };
    syncProfile();
  }, [user]);

  const handleTaskSubmit = async (taskPayload) => {
    try {
      setSubmitLoading(true);
      setError('');

      if (editingTask) {
        await api.patch(`/api/tasks/${editingTask._id}`, taskPayload);
      } else {
        await api.post('/api/tasks', taskPayload);
      }

      setEditingTask(null);
      await loadTasks();
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Failed to save task');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/api/tasks/${taskId}`);
      await loadTasks();
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    setError('');

    if (profileForm.name.trim().length < 2) {
      setError('Profile name must be at least 2 characters');
      return;
    }

    if (!validateEmail(profileForm.email)) {
      setError('Please enter a valid email');
      return;
    }

    try {
      setProfileLoading(true);
      const response = await api.patch('/api/users/me', profileForm);
      setUser(response.data.data);
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Profile update failed');
    } finally {
      setProfileLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-brand-50 px-4 py-6 transition-colors dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-xl bg-white p-5 shadow">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-sm text-slate-500">Manage your profile and tasks in one place.</p>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                type="button"
                onClick={logout}
                className="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {error && <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <section className="rounded-xl bg-white p-5 shadow">
          <h2 className="text-lg font-semibold text-slate-800">Profile</h2>
          <form className="mt-4 grid gap-3 sm:grid-cols-3" onSubmit={handleProfileUpdate}>
            <input
              type="text"
              value={profileForm.name}
              onChange={(event) => setProfileForm((prev) => ({ ...prev, name: event.target.value }))}
              className="rounded border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 outline-none ring-brand-500 focus:ring"
              placeholder="Name"
              required
            />
            <input
              type="email"
              value={profileForm.email}
              onChange={(event) => setProfileForm((prev) => ({ ...prev, email: event.target.value }))}
              className="rounded border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 outline-none ring-brand-500 focus:ring"
              placeholder="Email"
              required
            />
            <button
              type="submit"
              disabled={profileLoading}
              className="rounded bg-brand-700 px-4 py-2 text-sm font-medium text-white hover:bg-brand-900 disabled:opacity-60"
            >
              {profileLoading ? 'Saving...' : 'Update Profile'}
            </button>
          </form>
        </section>

        <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <TaskForm
            onSubmit={handleTaskSubmit}
            isSubmitting={submitLoading}
            editingTask={editingTask}
            onCancel={() => setEditingTask(null)}
          />
          <div className="space-y-4">
            <div className="rounded-xl bg-white p-4 shadow">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="rounded border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 outline-none ring-brand-500 focus:ring"
                  placeholder="Search by title/description"
                />
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="rounded border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-brand-500 focus:ring"
                >
                  <option value="">All Status</option>
                  <option value="todo">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>
            {loading ? (
              <div className="rounded-xl bg-white p-5 text-sm text-slate-500 shadow">Loading tasks...</div>
            ) : (
              <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDelete} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
