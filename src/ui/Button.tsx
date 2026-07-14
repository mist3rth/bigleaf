import React from 'react';
import { LucideIcon } from 'lucide-react';

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'glass' | 'white';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  href?: string;
  as?: 'button' | 'a';
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      icon: Icon,
      iconPosition = 'left',
      className = '',
      isLoading,
      href,
      as,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-sans font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer select-none';
    
    const variants = {
      primary: 'bg-primary text-white hover:bg-accent shadow-md',
      outline: 'bg-transparent border-2 border-primary/20 text-primary hover:border-primary',
      ghost: 'bg-transparent text-primary hover:text-accent',
      glass: 'bg-white/80 backdrop-blur-md text-primary hover:text-red-500 shadow-md',
      white: 'bg-white text-primary hover:bg-gold shadow-lg',
    };

    const sizes = {
      sm: 'px-6 py-2.5 text-[10px] rounded-full',
      md: 'px-8 py-4 text-xs rounded-full',
      lg: 'px-10 py-5 text-sm rounded-full',
      icon: 'p-3 rounded-full',
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    const content = (
      <>
        {isLoading && (
          <span className="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-current"></span>
        )}
        {Icon && iconPosition === 'left' && !isLoading && (
          <Icon className={`w-4 h-4 ${children ? 'mr-2' : ''}`} />
        )}
        <span className="whitespace-nowrap">{children}</span>
        {Icon && iconPosition === 'right' && !isLoading && (
          <Icon className={`w-4 h-4 ${children ? 'ml-2' : ''} transition-transform group-hover:translate-x-1`} />
        )}
      </>
    );

    if (as === 'a' || href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={`${combinedClassName} group`}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={`${combinedClassName} group`}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
