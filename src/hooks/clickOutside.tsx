import { useRef, useEffect, ReactNode, MouseEventHandler } from 'react';

interface ClickOutsideProps {
  children: ReactNode; 
  top?: number;
  width?: string;
  isCenter?: boolean;
  exceptionRef?: React.RefObject<HTMLElement>;
  onClick: () => void;
  className?: string;
}

export default function ClickOutside({
  children,
  exceptionRef,
  top,
  width,
  isCenter,
  onClick,
  className = '',
}: ClickOutsideProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null); 


  useEffect(() => {
    const handleClickListener = (event: MouseEvent) => {
      let clickedInside = false;

      if (exceptionRef) {
        clickedInside =
          (wrapperRef.current && wrapperRef.current.contains(event.target as Node)) ||
          exceptionRef.current === event.target ||
          (exceptionRef.current && exceptionRef.current.contains(event.target as Node)) || false;
      } else {
        clickedInside = wrapperRef.current?.contains(event.target as Node) || false;
      }

      if (clickedInside) return;
      else onClick();
    };

    document.addEventListener('mousedown', handleClickListener);

    return () => {
      document.removeEventListener('mousedown', handleClickListener);
    };
  }, [exceptionRef, onClick]);

  return (
    <div ref={wrapperRef} style={{ top: `${top}px`, width: `${width}` }} className={`absolute bg-opacity-30 flex justify-end ${isCenter && 'center_absolute'}`}>
      {children}
    </div>
  );
}
