import React from 'react';

interface CrestMarkProps {
  size?: number;
  className?: string;
}

export const CrestMark: React.FC<CrestMarkProps> = ({ size = 28, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="#102342" />
      <path
        d="M8.5 9.5C8.5 8.94772 8.94772 8.5 9.5 8.5H15.25V23.5H10.5C9.39543 23.5 8.5 22.6046 8.5 21.5V9.5Z"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M23.5 9.5C23.5 8.94772 23.0523 8.5 22.5 8.5H16.75V23.5H21.5C22.6046 23.5 23.5 22.6046 23.5 21.5V9.5Z"
        stroke="#B5C7EE"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M16 7V24.5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="11" r="1.5" fill="#0D9488" />
    </svg>
  );
};
