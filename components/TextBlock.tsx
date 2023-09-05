import React, { useState } from 'react';

interface Props {
  text: string;
  editable?: boolean;
  onChange?: (value: string) => void;
}

export const TextBlock: React.FC<Props> = ({
  text,
  editable = false,
  onChange = () => {},
}) => {
  const [internalText, setInternalText] = useState(text);
  
  const handleClear = () => {
    setInternalText('');
  };
  
  const handleChange = (newValue: string) => {
    setInternalText(newValue);
    onChange(newValue);
  };

  return (
    <div className="relative">
	  <div>
	    <textarea
	      className="min-h-[130px] md:min-h-[640px] lg:min-h-[640px] w-full bg-[#1A1B26] p-4 text-base text-neutral-200 focus:outline-none"
	      style={{ resize: 'none' }}
	      value={internalText}
	      onChange={(e) => handleChange(e.target.value)}
	      disabled={!editable}
	    />
	  </div>
	  <button className="absolute top-0 right-0 z-10 rounded p-1 text-sm text-white"
		onClick={() => {
			handleClear();
		}}
	  >Clear</button>
	</div>
  );
};