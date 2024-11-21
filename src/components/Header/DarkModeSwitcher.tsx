import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const DarkModeSwitcher = () => {
  const { theme, setTheme, systemTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <li>
      <label
        className={`relative m-0 block h-7.5 w-14 rounded-full ${
          currentTheme === 'dark' ? 'bg-primary' : 'bg-stroke'
        }`}
      >
        <input
          type="checkbox"
          onChange={() => {
            setTheme(currentTheme === 'light' ? 'dark' : 'light');
          }}
          className="dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
        />
        <span
          className={`absolute left-[3px] top-1/2 flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ${
            currentTheme === 'dark' && '!right-[3px] !translate-x-full'
          }`}
        >
          <span className="dark:hidden">
            <Sun size={16} className="fill-gray-400" />
          </span>
          <span className="hidden dark:inline-block">
            <Moon size={16} className="fill-gray-400" />
          </span>
        </span>
      </label>
    </li>
  );
};

export default DarkModeSwitcher;

