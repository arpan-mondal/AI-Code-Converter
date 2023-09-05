import { StreamLanguage } from '@codemirror/language';
import { go } from '@codemirror/legacy-modes/mode/go';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import CodeMirror from '@uiw/react-codemirror';
import { FC, useEffect, useState } from 'react';
import { saveAs } from 'file-saver';

interface Props {
  code: string;
  editable?: boolean;
  onChange?: (value: string) => void;
}

export const CodeBlock: FC<Props> = ({
  code,
  editable = false,
  onChange = () => {},
}) => {
  const [copyText, setCopyText] = useState<string>('Copy');

  const handleDownload = () => {
      const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, `code.md`);
  };
  
  const handleCoffee = () => {
	  window.open("https://ko-fi.com/audi_guzz");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopyText('Copy');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [copyText]);

  return (
    <div className="relative">
      <button
        className="absolute right-0 top-0 z-10 rounded bg-[#1A1B26] p-1 text-sm text-white hover:bg-[#2D2E3A] active:bg-[#2D2E3A]"
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopyText('Copied!');
        }}
      >
        {copyText}
      </button>

      <CodeMirror
		className="text-base"
        editable={editable}
        value={code}
        minHeight="640px"
		maxHeight="640px"
        extensions={[StreamLanguage.define(go)]}
        theme={tokyoNight}
		indentWithTab={true}
        onChange={(value) => onChange(value)}
      />
	<button
		className="absolute right-0 bottom-[-4] z-10 rounded p-1 text-sm text-white"
		onClick={handleDownload}>Download Code</button>
	<button
		className="absolute left-0 bottom-[-4] z-10 p-1 text-sm text-white"
		onClick={handleCoffee}>Buy me a Coffee</button>
    </div>
  );
};
