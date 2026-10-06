import React from 'react';
import { motion } from 'framer-motion';
import { buttonHoverVariants } from '@/animation/motion';

/**
 * Temporary stub for Button component.
 * Supports primary (orange), secondary (navy), outline, and ghost variants.
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  as = 'button',
  href,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-display uppercase tracking-wider font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none';

  const sizeClasses = {
    sm: 'text-sm px-3.5 py-1.5 gap-1.5',
    md: 'text-base px-5 py-2.5 gap-2',
    lg: 'text-lg px-7 py-3 gap-2.5',
  };

  const variantClasses = {
    primary: 'bg-orange text-paper hover:bg-[#e07d1a] border border-orange shadow-sm',
    navy: 'bg-navy text-paper hover:bg-[#11202c] border border-navy',
    outline: 'border-2 border-navy text-navy hover:bg-navy hover:text-paper',
    outlinePaper: 'border-2 border-paper text-paper hover:bg-paper hover:text-navy',
    ghost: 'text-navy hover:bg-concrete/40',
    hazard: 'bg-yellow text-navy font-black hover:bg-[#e6b937] border-2 border-navy',
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.primary} ${className}`;

  if (as === 'a' || href) {
    return (
      <motion.a
        href={href}
        className={combinedClasses}
        variants={buttonHoverVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      variants={buttonHoverVariants}
      initial="rest"
      whileHover={disabled ? 'rest' : 'hover'}
      whileTap={disabled ? 'rest' : 'tap'}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
