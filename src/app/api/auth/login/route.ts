import { NextResponse } from 'next/server';
import { authorizationUrl } from '@/lib/oauth';
import catchAsync from '@/utils/catchAsync';

export const dynamic = 'force-dynamic';

export const GET = catchAsync(async (): Promise<NextResponse> => {
  return NextResponse.redirect(authorizationUrl);
});

