import type { FC } from 'react';

interface Props {
  language: string;
  onChange: (language: string) => void;
}

export const LanguageSelect: FC<Props> = ({ language, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex justify-center items-center">
      <select
        className="flex-1 rounded-md bg-[#1F2937] px-4 py-2 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#1F2937]"
        value={language}
        onChange={handleChange}
      >
        {languages
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

export const languages = [
  { value: '-- Select --', label: '-- Select --' },
  { value: 'Automatic detection', label: 'Automatic detection' },
  { value: 'Pascal', label: 'Pascal' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'Python', label: 'Python' },
  { value: 'TSX', label: 'TSX' },
  { value: 'JSX', label: 'JSX' },
  { value: 'Vue', label: 'Vue' },
  { value: 'Go', label: 'Go' },
  { value: 'C', label: 'C' },
  { value: 'C++', label: 'C++' },
  { value: 'Java', label: 'Java' },
  { value: 'C#', label: 'C#' },
  { value: 'Visual Basic .NET', label: 'Visual Basic .NET' },
  { value: 'SQL', label: 'SQL' },
  { value: 'Assembly Language', label: 'Assembly Language' },
  { value: 'PHP', label: 'PHP' },
  { value: 'Ruby', label: 'Ruby' },
  { value: 'Swift', label: 'Swift' },
  { value: 'SwiftUI', label: 'SwiftUI' },
  { value: 'Kotlin', label: 'Kotlin' },
  { value: 'R', label: 'R' },
  { value: 'Objective-C', label: 'Objective-C' },
  { value: 'Perl', label: 'Perl' },
  { value: 'SAS', label: 'SAS' },
  { value: 'Scala', label: 'Scala' },
  { value: 'Dart', label: 'Dart' },
  { value: 'Rust', label: 'Rust' },
  { value: 'Haskell', label: 'Haskell' },
  { value: 'Lua', label: 'Lua' },
  { value: 'Groovy', label: 'Groovy' },
  { value: 'Elixir', label: 'Elixir' },
  { value: 'Clojure', label: 'Clojure' },
  { value: 'Lisp', label: 'Lisp' },
  { value: 'Julia', label: 'Julia' },
  { value: 'Matlab', label: 'Matlab' },
  { value: 'Fortran', label: 'Fortran' },
  { value: 'COBOL', label: 'COBOL' },
  { value: 'Bash', label: 'Bash' },
  { value: 'Shell', label: 'Shell' },
  { value: 'Powershell', label: 'Powershell' },
  { value: 'PL/SQL', label: 'PL/SQL' },
  { value: 'CSS', label: 'CSS' },
  { value: 'Racket', label: 'Racket' },
  { value: 'HTML', label: 'HTML' },
  { value: 'NoSQL', label: 'NoSQL' },
  { value: 'Natural Language', label: 'Natural Language' },
  { value: 'CoffeeScript', label: 'CoffeeScript' },
  { value: 'Morse Code', label: 'Morse Code' },
  { value: 'Hex Code', label: 'Hex Code' },
  { value: 'Binary Code', label: 'Binary Code' },
  { value: 'Decimal Code', label: 'Decimal Code' },
  { value: 'Pseudo Code', label: 'Pseudo Code' },
  { value: 'Android', label: 'Android Code' },
  { value: 'MySQL', label: 'MySQL' },
  { value: 'FlinkSql', label: 'FlinkSql' },
  { value: 'Regular', label: 'Regular expression' },
  { value: 'Arduino', label: 'Arduino' },
  { value: 'Esp 8266', label: 'Esp 8266' },
  { value: 'Esp 32', label: 'Esp 32' },
  { value: 'React', label: 'React' },
  { value: 'HTML JS CSS', label: 'HTML JS CSS' },
  { value: 'Tailwind', label: 'Tailwind' },
  { value: 'Git', label: 'Git' },
  { value: 'SVN', label: 'SVN' },
  { value: 'Linux', label: 'Linux' },
];
