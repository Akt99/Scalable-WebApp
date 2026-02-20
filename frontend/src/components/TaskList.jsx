const statusStyles = {
  todo: 'bg-slate-100 text-slate-700',
  in_progress: 'bg-amber-100 text-amber-800',
  done: 'bg-emerald-100 text-emerald-800'
};

const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (!tasks.length) {
    return (
      <div className="rounded-xl bg-white p-6 text-center text-sm text-slate-500 shadow">
        No tasks found for current filters.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task._id} className="rounded-xl bg-white p-4 shadow">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h4 className="text-base font-semibold text-slate-800">{task.title}</h4>
              <p className="mt-1 text-sm text-slate-600">{task.description || 'No description'}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[task.status]}`}>
                  {task.status.replace('_', ' ')}
                </span>
                {task.dueDate && (
                  <span className="text-xs text-slate-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onEdit(task)}
                className="rounded border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(task._id)}
                className="rounded border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
