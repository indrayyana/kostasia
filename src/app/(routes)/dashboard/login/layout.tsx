'use client';

import { SessionProvider } from 'next-auth/react';

export default function ModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div>{children}</div>
    </SessionProvider>
  );
}

// TODO: check

