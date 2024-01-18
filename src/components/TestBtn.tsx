import React, { forwardRef, useRef } from 'react';

// Define Props type
type Props = {
  onStart: () => void;
  className?: string;
};

const StartBtn = forwardRef(({ onStart: handleRestart, className = '' }: Props, ref) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  React.useImperativeHandle(ref, () => ({
    // Expose a click method through the ref
    click: () => {
      buttonRef.current?.click();
    },
  }));

  const handleClick = () => {
    buttonRef.current?.blur();
    handleRestart();
  };

  return (
    <button
      tabIndex={-1} // to prevent focus
      ref={buttonRef}
      className={`block rounded px-8 py-2 hover:bg-slate-700/50  ${className}`}
      onClick={handleClick}
    >
      Refresh
    </button>
  );
});

export default StartBtn;
