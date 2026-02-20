import useTheme from '../hooks/useTheme';

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`relative h-10 w-20 rounded-full bg-slate-200 p-1 transition-colors duration-300 dark:bg-slate-700 ${className}`}
    >
      <span
        className={`absolute top-1 h-8 w-8 rounded-full bg-white shadow-lg transition-all duration-300 ${
          isDark ? 'left-11 bg-slate-900' : 'left-1'
        }`}
      />
      <span
        className={`absolute left-3 top-2 text-slate-700 transition-all duration-300 dark:text-slate-200 ${
          isDark ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      </span>
      <span
        className={`absolute right-3 top-2 text-slate-200 transition-all duration-300 ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2">
          <path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" />
        </svg>
      </span>
    </button>
  );
};

export default ThemeToggle;
