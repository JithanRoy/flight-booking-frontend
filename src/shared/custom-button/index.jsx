import React from 'react';
import classNames from 'classnames';

const CustomButton = ({ variant, children, className, ...props }) => {
  const buttonClass = classNames(
    'p-3 rounded-lg font-bold transition duration-300',
    {
      'bg-blue-500 text-white hover:bg-blue-600': variant === 'filled',
      'border border-red-500 text-red-500 hover:bg-red-100': variant === 'reset',
      'border border-primary text-primary hover:bg-gray-100': variant === 'bordered',
    },
    className
  );

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default CustomButton;