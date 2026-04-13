import { NextResponse } from 'next/server';
import { insertMessage } from '@/lib/messages';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      message?: string;
      source?: 'main' | 'secret';
    };

    const message = body.message?.trim();
    const name = body.name?.trim();
    const source = body.source === 'secret' ? 'secret' : 'main';

    if (!message) {
      return NextResponse.json({ ok: false, error: 'Pesan wajib diisi.' }, { status: 400 });
    }

    if (message.length < 1 || message.length > 1000) {
      return NextResponse.json(
        { ok: false, error: 'Pesan harus antara 1 sampai 1000 karakter.' },
        { status: 400 }
      );
    }

    const result = await insertMessage({
      name: name ? name.slice(0, 80) : null,
      message,
      source
    });

    return NextResponse.json({ ok: true, stored: result.stored });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan server.';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
                             
