
import { useRef } from "react";


const StartBtn = ({
  onStart: handleRestart,
  className = "",
  // ref,
}: {
  onStart: () => void;
  className?: string;
  // ref: any
}) => {

    const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    buttonRef.current?.blur();
    handleRestart();
  };

  return (
    <button
      tabIndex={-1} // to prevent focus
      ref= {buttonRef}
      className={`block rounded px-8 py-2 hover:bg-slate-700/50  ${className}`}
      onClick={handleClick}
    >
      Refresh
    </button>
  );
};

export default StartBtn;