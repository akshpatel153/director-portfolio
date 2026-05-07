
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'yellow' | 'outline' | 'ghost';
  shape?: 'square' | 'pill';
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  shape = 'square',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black px-6 py-3";
  
  const shapeStyles = shape === 'square' ? 'rounded-none' : 'rounded-full';

  const variants = {
    primary: "bg-primary-red text-white border-2 border-black shadow-small hover:bg-primary-red/90 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    secondary: "bg-primary-blue text-white border-2 border-black shadow-small hover:bg-primary-blue/90 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    yellow: "bg-primary-yellow text-black border-2 border-black shadow-small hover:bg-primary-yellow/90 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    outline: "bg-white text-black border-2 border-black shadow-small hover:bg-gray-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    ghost: "border-none text-black hover:bg-gray-200 active:translate-x-[2px] active:translate-y-[2px]"
  };

  return (
    <button
      className={cn(baseStyles, shapeStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
