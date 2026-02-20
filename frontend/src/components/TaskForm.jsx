import { useEffect, useState } from 'react';
import { validateTaskTitle } from '../utils/validators';

const initialTask = {
  title: '',
  description: '',
  status: 'todo',
  dueDate: ''
};

const TaskForm = ({ onSubmit, isSubmitting, editingTask, onCancel }) => {
  const [task, setTask] = useState(initialTask);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTask({
        title: editingTask.title || '',
        description: editingTask.description || '',
        status: editingTask.status || 'todo',
        dueDate: editingTask.dueDate ? editingTask.dueDate.slice(0, 10) : ''
      });
    } else {
      setTask(initialTask);
    }
  }, [editingTask]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!validateTaskTitle(task.title)) {
      setError('Title must be at least 3 characters');
      return;
    }

    await onSubmit({
      ...task,
      dueDate: task.dueDate || null
    });

    if (!editingTask) {
      setTask(initialTask);
    }
  };

  return (
    <form className="space-y-3 rounded-xl bg-white p-5 shadow" onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold text-slate-800">{editingTask ? 'Edit Task' : 'Create Task'}</h3>
      {error && <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={task.title}
          onChange={handleChange}
          className="w-full rounded border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 outline-none ring-brand-500 focus:ring"
          placeholder="Plan sprint tasks"
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={task.description}
          onChange={handleChange}
          className="w-full rounded border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 outline-none ring-brand-500 focus:ring"
          placeholder="Optional details..."
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full rounded border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-brand-500 focus:ring"
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="dueDate">
            Due Date
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={task.dueDate}
            onChange={handleChange}
            className="w-full rounded border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-brand-500 focus:ring"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-brand-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-900 disabled:opacity-60"
        >
          {isSubmitting ? 'Saving...' : editingTask ? 'Update Task' : 'Create Task'}
        </button>
        {editingTask && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
