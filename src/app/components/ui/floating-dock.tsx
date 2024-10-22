'use client';

import { cn } from '@/app/lib/utils';
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

export const FloatingDock = ({
  items,
  className,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href: string;
    onclick?: () => void;
  }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'mx-auto flex h-16 gap-4 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3',
        'fixed bottom-4 left-1/2 -translate-x-1/2',
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if window is defined and update the state based on window width
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth >= 768);

      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 768);
      };

      // Listen for window resize events
      window.addEventListener('resize', handleResize);

      // Clean up the event listener when the component is unmounted
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Transform for desktop size
  const desktopWidthTransform = useTransform(
    distance,
    [-150, 0, 150],
    [40, 80, 40]
  );
  const desktopHeightTransform = useTransform(
    distance,
    [-150, 0, 150],
    [40, 80, 40]
  );
  const desktopIconTransform = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  // Mobile sizes
  const mobileWidth = 40;
  const mobileHeight = 40;
  const mobileIconSize = 20;

  const width = useSpring(isDesktop ? desktopWidthTransform : mobileWidth, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(isDesktop ? desktopHeightTransform : mobileHeight, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const iconSize = useSpring(
    isDesktop ? desktopIconTransform : mobileIconSize,
    {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    }
  );

  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{
          width,
          height,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative"
      >
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 2, x: '-50%' }}
            className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
          >
            {title}
          </motion.div>
        )}
        <motion.div
          style={{
            width: iconSize,
            height: iconSize,
          }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}

export default FloatingDock;

