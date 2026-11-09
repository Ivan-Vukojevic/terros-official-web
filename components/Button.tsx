"use client";

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, type = 'button', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          'inline-flex items-center justify-center gap-2 rounded-md transition-all duration-200',
          'hover:scale-105 active:scale-95',
          {
            'bg-[#C4976A] text-[#0F0F0F] hover:bg-[#B5885A]': variant === 'primary',
            'bg-[#2C2C2C] text-white hover:bg-[#3C3C3C]': variant === 'secondary',
            'border-2 border-[#C4976A] text-[#C4976A] hover:bg-[#C4976A] hover:text-[#0F0F0F]': variant === 'outline',
            'px-4 py-2': size === 'sm',
            'px-6 py-3': size === 'md',
            'px-8 py-4': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
