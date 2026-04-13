import { NextResponse } from 'next/server';
import { normalizePassword } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      gate?: 'main' | 'secret';
      password?: string;
    };

    if (!body.gate || !body.password) {
      return NextResponse.json({ ok: false, message: 'Data belum lengkap.' }, { status: 400 });
    }

    const expected =
      body.gate === 'secret' ? process.env.PASSWORD_GATE_2 : process.env.PASSWORD_GATE_1;

    if (!expected) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Password gate belum diatur di environment variable.'
        },
        { status: 500 }
      );
    }

    const isMatch = normalizePassword(body.password) === normalizePassword(expected);

    return NextResponse.json({
      ok: isMatch,
      message: isMatch ? 'access granted' : 'masih belum pas... coba inget satu tanggal lain 😆'
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: 'Terjadi kesalahan saat mengecek password.'
      },
      { status: 500 }
    );
  }
}
