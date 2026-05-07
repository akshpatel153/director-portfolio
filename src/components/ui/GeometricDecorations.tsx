
import { cn } from '../../lib/utils';

export function Circle({ className }: { className?: string }) {
  return <div className={cn("rounded-full border-4 border-black", className)} />;
}

export function Square({ className }: { className?: string }) {
  return <div className={cn("rounded-none border-4 border-black", className)} />;
}

export function Triangle({ className }: { className?: string }) {
  return (
    <div 
      className={cn("border-black border-4", className)} 
      style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', borderBottomWidth: 0 }}
    >
        {/* CSS triangles with borders can be tricky; an SVG is often better for perfect geometry with borders */}
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <polygon points="50,0 0,100 100,100" className="fill-current stroke-black" strokeWidth="8" strokeLinejoin="miter" />
        </svg>
    </div>
  );
}

// A purely aesthetic component used to decorate sections
export function AbstractComposition({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-64 h-64", className)}>
      <Circle className="absolute top-0 right-0 w-32 h-32 bg-primary-red shadow-large" />
      <Square className="absolute bottom-4 left-4 w-24 h-24 bg-primary-blue rotate-45 shadow-medium" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary-yellow border-4 border-black shadow-large flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-20 h-20 text-black">
          <polygon points="50,0 0,100 100,100" className="fill-current" />
        </svg>
      </div>
    </div>
  );
}
