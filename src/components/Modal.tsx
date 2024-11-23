'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Modal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  function handleOpenChange() {
    router.back();
  }

  return (
    <SessionProvider>
      <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
        <DialogContent className={className || ''}>{children}</DialogContent>
      </Dialog>
    </SessionProvider>
    // TODO: check
  );
}

