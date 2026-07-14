import React from 'react';

export type BadgeVariant = 'default' | 'gold' | 'outline' | 'accent';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
  onRemove?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({ 
  variant = 'default', 
  children, 
  className = '', 
  onRemove,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 px-2.5 py-1 uppercase font-bold tracking-wider rounded-full whitespace-nowrap select-none';
  
  const variants = {
    default: 'text-[9px] bg-primary text-white',
    gold: 'text-[9px] bg-gold text-primary',
    outline: 'text-[10px] bg-secondary text-primary border border-primary/10',
    accent: 'text-[10px] bg-accent/15 text-accent border border-accent/20',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
      {onRemove && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onRemove();
          }} 
          className="hover:text-accent font-black focus:outline-none transition-colors"
          aria-label="Remove filter"
        >
          ×
        </button>
      )}
    </span>
  );
};
