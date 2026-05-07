
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  decoration?: 'circle' | 'square' | 'triangle' | 'none';
  decorationColor?: 'red' | 'blue' | 'yellow';
  children: React.ReactNode;
}

export function Card({
  className,
  decoration = 'square',
  decorationColor = 'red',
  children,
  ...props
}: CardProps) {
  const colorMap = {
    red: 'bg-primary-red',
    blue: 'bg-primary-blue',
    yellow: 'bg-primary-yellow',
  };

  return (
    <div
      className={cn(
        "relative bg-white border-4 border-black shadow-large transition-transform duration-300 ease-out hover:-translate-y-2 p-6 md:p-8",
        className
      )}
      {...props}
    >
      {/* Corner Decoration */}
      {decoration !== 'none' && (
        <div className="absolute top-4 right-4 h-4 w-4">
          {decoration === 'circle' && (
            <div className={cn("w-full h-full rounded-full", colorMap[decorationColor])} />
          )}
          {decoration === 'square' && (
            <div className={cn("w-full h-full", colorMap[decorationColor])} />
          )}
          {decoration === 'triangle' && (
            <div 
              className={cn("w-full h-full", colorMap[decorationColor])} 
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            />
          )}
        </div>
      )}
      {children}
    </div>
  );
}
