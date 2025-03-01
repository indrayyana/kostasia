import { cn } from '@/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-[rgba(0,0,0,0.1)] dark:bg-[rgba(255,255,255,0.2)]',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };

