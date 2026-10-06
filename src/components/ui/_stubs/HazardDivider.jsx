import React from 'react';

/**
 * Temporary stub for HazardDivider component.
 * Civil engineering safety hazard stripe divider (yellow & navy 45-degree diagonal pattern).
 */
export const HazardDivider = ({
  height = 'h-3',
  className = '',
  label,
  border = true,
}) => {
  return (
    <div className={`w-full relative overflow-hidden ${className}`}>
      {border && <div className="w-full h-[1px] bg-navy/20" />}
      <div className={`w-full ${height} bg-hazard-stripes relative flex items-center justify-end px-4`}>
        {label && (
          <span className="bg-navy text-yellow font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 shadow-sm">
            {label}
          </span>
        )}
      </div>
      {border && <div className="w-full h-[1px] bg-navy/20" />}
    </div>
  );
};

export default HazardDivider;
