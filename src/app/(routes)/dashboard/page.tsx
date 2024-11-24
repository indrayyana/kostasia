'use client';

// import type { Metadata } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import UserLayout from '../../../components/Layouts/UserLayout';

// export const metadata: Metadata = {
//   robots: {
//     index: false,
//     follow: false,
//     googleBot: {
//       index: false,
//       follow: false,
//     },
//   },
// };

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <UserLayout>
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
    </UserLayout>
  );
}

