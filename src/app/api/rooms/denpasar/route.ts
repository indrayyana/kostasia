import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('kamar')
    .select()
    .eq('cabang', 'Denpasar');

  if (error) {
    return NextResponse.json({
      status: 500,
      message: 'Error',
      error: error.message,
    });
  }

  return NextResponse.json({ status: 200, message: 'Success', data });
}

