import React from 'react';

/**
 * Temporary stub for Container component.
 * Provides consistent maximum widths, responsive padding, and optional technical drafting grid marks.
 */
export const Container = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 w-full ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
