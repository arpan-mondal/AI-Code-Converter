import { FC } from 'react';

interface Props {
  language: string;
  onChange: (language: string) => void;
}

export const NaturalLanguageSelect: FC<Props> = ({ language, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex justify-center items-center">
      <svg width="28" height="28" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path fill="#06b6d4" fill-rule="evenodd" d="M8 14.5c.23 0 .843-.226 1.487-1.514c.306-.612.563-1.37.742-2.236H5.771c.179.866.436 1.624.742 2.236C7.157 14.274 7.77 14.5 8 14.5ZM5.554 9.25a14.444 14.444 0 0 1 0-2.5h4.892a14.452 14.452 0 0 1 0 2.5H5.554Zm6.203 1.5c-.224 1.224-.593 2.308-1.066 3.168a6.525 6.525 0 0 0 3.2-3.168h-2.134Zm2.623-1.5h-2.43a16.019 16.019 0 0 0 0-2.5h2.429a6.533 6.533 0 0 1 0 2.5Zm-10.331 0H1.62a6.533 6.533 0 0 1 0-2.5h2.43a15.994 15.994 0 0 0 0 2.5Zm-1.94 1.5h2.134c.224 1.224.593 2.308 1.066 3.168a6.525 6.525 0 0 1-3.2-3.168Zm3.662-5.5h4.458c-.179-.866-.436-1.624-.742-2.236C8.843 1.726 8.23 1.5 8 1.5c-.23 0-.843.226-1.487 1.514c-.306.612-.563 1.37-.742 2.236Zm5.986 0h2.134a6.526 6.526 0 0 0-3.2-3.168c.473.86.842 1.944 1.066 3.168ZM5.31 2.082c-.473.86-.842 1.944-1.066 3.168H2.109a6.525 6.525 0 0 1 3.2-3.168ZM8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Z" clip-rule="evenodd"/>
      </svg>
      <select
        className="flex-1 rounded-md bg-[#1F2937] px-4 py-2 ml-2 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#1F2937]"
        value={language}
        onChange={handleChange}
      >
        {naturalLanguages
          .sort((a, b) => a.label.localeCompare(b.label))
          .map((language) => (
            <option key={language.value} value={language.value}>
              {language.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export const naturalLanguages = [
  { value: 'English', label: 'English' },
  { value: 'Português', label: 'Português' },
  { value: 'فارسی', label: 'فارسی' },
  { value: 'Deutsch', label: 'Deutsch' },
  { value: 'Français', label: 'Français' },
  { value: 'Русский', label: 'Русский' },
  { value: 'Italiano', label: 'Italiano' },
  { value: 'Español', label: 'Español' },
];