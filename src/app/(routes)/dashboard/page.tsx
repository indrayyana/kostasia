'use client';

import UserLayout from '@/components/Layouts/UserLayout';
import { useAuth } from '@/components/AuthProvider';
import { Skeleton } from '@/components/ui/skeleton';

export default function Dashboard() {
  const { user, isPending } = useAuth();

  return <UserLayout>{isPending ? <Skeleton className="h-10" /> : <p>Selamat datang {user?.nama}</p>}</UserLayout>;
}

