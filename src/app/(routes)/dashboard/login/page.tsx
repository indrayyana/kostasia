'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <div>
          <p>Welcome, {session.user?.name}</p>
          <Button
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => {
            signIn('google');
          }}
        >
          Login
        </Button>
      )}
    </>
  );
}

// TODO: check

