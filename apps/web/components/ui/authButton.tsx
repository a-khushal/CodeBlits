import React from 'react';

interface AuthButtonProps {
  href: string;
  variant: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
  onClick: () => void;
}

const AuthButton = ({ href, variant, children, onClick }: AuthButtonProps) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200";
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    secondary: "text-gray-700 hover:text-blue-600 hover:bg-gray-50",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault(); 
      onClick();
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {children}
    </a>
  );
};

export default AuthButton;