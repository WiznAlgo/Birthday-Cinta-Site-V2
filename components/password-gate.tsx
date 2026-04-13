'use client';

import { useState } from 'react';
import { LockKeyhole, Sparkles } from 'lucide-react';
import { normalizePassword, safeJsonFromResponse } from '@/lib/utils';

type PasswordGateProps = {
  gate: 'main' | 'secret';
  intro: string;
  hint: string;
  buttonLabel: string;
  successLabel: string;
  errorLabel?: string;
  onUnlocked: () => void;
  variant?: 'light' | 'vault';
};

export function PasswordGate({
  gate,
  intro,
  hint,
  buttonLabel,
  successLabel,
  errorLabel = 'hmm... kayaknya belum tepat deh 😆',
  onUnlocked,
  variant = 'light'
}: PasswordGateProps) {
  const [value, setValue] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [granted, setGranted] = useState(false);

  async function handleSubmit() {
    if (!value.trim()) {
      setMessage('isi dulu tanggal kecil itu yaa 🤍');
      return;
    }

    setSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/unlock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ gate, password: normalizePassword(value) })
      });

      const data = (await safeJsonFromResponse(response)) as { ok?: boolean; message?: string } | null;

      if (data?.ok) {
        setGranted(true);
        setMessage(successLabel);
        window.setTimeout(() => onUnlocked(), 650);
        return;
      }

      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      setMessage(
        response.status >= 500
          ? data?.message ?? 'server gate-nya belum siap, tapi nanti gampang dibenerin kok.'
          : errorLabel
      );
    } catch {
      setMessage('koneksi lagi malu-malu, coba lagi bentar yaa.');
    } finally {
      setSubmitting(false);
    }
  }

  const showHint = attempts >= 3;

  return (
    <div
      className={[
        'rounded-[26px] border px-5 py-5 text-left sm:px-6',
        variant === 'vault'
          ? 'border-yellow-100/12 bg-white/6 text-white backdrop-blur-sm'
          : 'border-amber-200/60 bg-white/58 text-amber-950'
      ].join(' ')}
    >
      <div className="mb-4 flex items-center gap-3">
        <div
          className={[
            'flex h-11 w-11 items-center justify-center rounded-full',
            variant === 'vault' ? 'bg-yellow-300/12 text-yellow-100' : 'bg-amber-100/80 text-amber-700'
          ].join(' ')}
        >
          {granted ? <Sparkles size={18} /> : <LockKeyhole size={18} />}
        </div>
        <div>
          <p className="text-sm font-medium opacity-80">{intro}</p>
          <p className="mt-1 text-xs opacity-60">format: ddmmyyyy</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              void handleSubmit();
            }
          }}
          placeholder="contoh: 14022007"
          className={[
            'w-full rounded-full border px-4 py-3 outline-none transition',
            variant === 'vault'
              ? 'border-white/12 bg-black/16 text-white placeholder:text-white/38 focus:border-yellow-100/30'
              : 'border-amber-200 bg-white/90 text-amber-950 placeholder:text-amber-700/42 focus:border-amber-300'
          ].join(' ')}
          inputMode="numeric"
        />
        <button
          type="button"
          disabled={submitting}
          onClick={() => void handleSubmit()}
          className={variant === 'vault' ? 'vault-button' : 'primary-button'}
        >
          {submitting ? 'sebentar...' : buttonLabel}
        </button>
      </div>

      {message ? (
        <p className={['mt-4 text-sm', granted ? 'text-emerald-500' : 'opacity-75'].join(' ')}>{message}</p>
      ) : null}

      {showHint ? (
        <p
          className={[
            'mt-4 rounded-[20px] border px-4 py-3 text-sm leading-6',
            variant === 'vault'
              ? 'border-yellow-100/12 bg-yellow-100/8 text-yellow-50/90'
              : 'border-amber-200/65 bg-amber-50/80 text-amber-900/90'
          ].join(' ')}
        >
          <span className="font-semibold">Hint:</span> “{hint}”
        </p>
      ) : null}
    </div>
  );
}
