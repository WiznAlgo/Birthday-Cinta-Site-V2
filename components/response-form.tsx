'use client';

import { useMemo, useState } from 'react';
import { Send, MessageCircleHeart } from 'lucide-react';
import { buildWhatsAppLink, safeJsonFromResponse } from '@/lib/utils';

type ResponseFormProps = {
  title: string;
  placeholder: string;
  successMessage: string;
  source?: 'main' | 'secret';
};

type MessageApiResponse = {
  ok?: boolean;
  error?: string;
  stored?: boolean;
};

export function ResponseForm({
  title,
  placeholder,
  successMessage,
  source = 'secret'
}: ResponseFormProps) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [stored, setStored] = useState(true);
  const [error, setError] = useState('');

  const whatsappLink = useMemo(() => {
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '';
    const text = process.env.NEXT_PUBLIC_WHATSAPP_TEXT ?? 'aku udah lihat website-nya 😆🌻';
    return number ? buildWhatsAppLink(number, text) : '';
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim()) {
      setError('pesannya jangan kosong yaa 🤍');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, message, source })
      });

      const data = (await safeJsonFromResponse(response)) as MessageApiResponse | null;

      if (!response.ok || !data?.ok) {
        throw new Error(data?.error ?? 'server balasannya belum siap, coba lagi bentar yaa.');
      }

      setSuccess(true);
      setStored(data.stored !== false);
      setName('');
      setMessage('');
    } catch (err) {
      const text = err instanceof Error ? err.message : 'Terjadi kesalahan.';
      setError(text);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-5 text-left">
      <div className="text-center">
        <div className="icon-badge mx-auto mb-3">
          <MessageCircleHeart size={20} />
        </div>
        <h2 className="romantic-text text-2xl font-semibold text-amber-950 sm:text-3xl">{title}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-amber-900/72">
            nama (opsional)
          </label>
          <input
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="input-surface"
            placeholder="boleh diisi, boleh nggak"
            maxLength={80}
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-amber-900/72">
            pesan
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="textarea-surface"
            placeholder={placeholder}
            maxLength={1000}
            required
          />
        </div>

        <button type="submit" disabled={submitting} className="primary-button w-full">
          <Send size={16} />
          {submitting ? 'ngirim...' : 'kirim'}
        </button>
      </form>

      {success ? (
        <div className="success-surface px-4 py-4 text-center text-sm">
          <p>{stored ? successMessage : 'pesannya kebaca, tapi database belum aktif. tenang, kamu tetap bisa balas lewat WhatsApp 🌻'}</p>
          {whatsappLink ? (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="wa-button mt-4"
            >
              atau balas langsung ke Wisnu
            </a>
          ) : null}
        </div>
      ) : null}

      {error ? <div className="error-surface px-4 py-3 text-sm">{error}</div> : null}
    </div>
  );
}
