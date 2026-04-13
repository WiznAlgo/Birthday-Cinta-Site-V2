'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Sparkles, Flower2, LockOpen, FolderHeart } from 'lucide-react';
import { copy, sceneLabels } from '@/data/content';
import { AnimatedSky } from '@/components/animated-sky';
import { PasswordGate } from '@/components/password-gate';
import { ProgressBar } from '@/components/progress-bar';
import { RevealCards } from '@/components/reveal-cards';
import { SectionCard } from '@/components/section-card';
import { ResponseForm } from '@/components/response-form';
import { Typewriter } from '@/components/typewriter';

export function BirthdayJourney() {
  const [scene, setScene] = useState(0);
  const [likesVisible, setLikesVisible] = useState(1);

  const visualVariant = useMemo(() => {
    if (scene >= 8) return 'vault' as const;
    if (scene >= 4) return 'warm' as const;
    if (scene >= 2) return 'soft' as const;
    return 'sky' as const;
  }, [scene]);

  function nextScene() {
    setScene((current) => Math.min(current + 1, sceneLabels.length - 1));
  }

  return (
    <main className="page-shell relative min-h-screen py-4 sm:py-6">
      <AnimatedSky variant={visualVariant} />
      <ProgressBar current={scene} />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-4xl items-center justify-center px-4 pb-10 pt-4 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div key={scene} className="w-full">
            {scene === 0 ? (
              <SectionCard className="max-w-2xl py-10 sm:py-12">
                <div className="icon-badge mx-auto mb-4">
                  <Sparkles size={22} />
                </div>
                <p className="eyebrow mb-3">special opening</p>
                <h1 className="romantic-text text-3xl font-semibold text-amber-950 sm:text-5xl">
                  {copy.openingTitle}
                </h1>
                <p className="romantic-text mx-auto mt-5 max-w-lg text-base leading-8 text-amber-950/78 sm:text-lg">
                  {copy.openingBody}
                </p>
                <button type="button" onClick={nextScene} className="primary-button mt-8">
                  buka pelan-pelan yaa
                </button>
              </SectionCard>
            ) : null}

            {scene === 1 ? (
              <SectionCard className="max-w-xl text-left">
                <div className="mb-5 text-center">
                  <div className="icon-badge mx-auto mb-3">
                    <Heart size={18} />
                  </div>
                  <p className="eyebrow mb-2">first little lock</p>
                  <h2 className="text-2xl font-semibold text-amber-950">Password Gate 1</h2>
                </div>
                <PasswordGate
                  gate="main"
                  intro={copy.gateOneIntro}
                  hint={copy.gateOneHint}
                  buttonLabel="coba buka"
                  successLabel="yay, kamu berhasil masuk 🌻"
                  errorLabel="hmm... kayaknya belum tepat deh 😆"
                  onUnlocked={nextScene}
                />
              </SectionCard>
            ) : null}

            {scene === 2 ? (
              <SectionCard className="max-w-2xl">
                <div className="icon-badge mx-auto mb-4">
                  <Flower2 size={24} />
                </div>
                <p className="eyebrow mb-3">sedikit demi sedikit</p>
                <h2 className="romantic-text text-2xl font-semibold text-amber-950 sm:text-4xl">
                  Happy level up day 🌻
                </h2>
                <p className="romantic-text mx-auto mt-5 max-w-xl text-base leading-8 text-amber-950/82 sm:text-lg">
                  {copy.mainWish}
                </p>
                <button type="button" onClick={nextScene} className="primary-button mt-8">
                  lanjut dikit?
                </button>
              </SectionCard>
            ) : null}

            {scene === 3 ? (
              <SectionCard className="max-w-2xl text-left">
                <div className="mb-5 text-center">
                  <p className="eyebrow mb-2">pelan-pelan yaa</p>
                  <h2 className="text-2xl font-semibold text-amber-950 sm:text-3xl">
                    Hal-hal yang aku suka dari kamu
                  </h2>
                </div>
                <RevealCards
                  items={copy.likes}
                  visibleCount={likesVisible}
                  onReveal={() => setLikesVisible((current) => Math.min(current + 1, copy.likes.length))}
                  onComplete={nextScene}
                />
              </SectionCard>
            ) : null}

            {scene === 4 ? (
              <SectionCard className="max-w-2xl overflow-hidden text-left">
                <div className="diary-line rounded-[26px] border border-amber-200/55 bg-[var(--card-strong)] px-5 py-6 sm:px-7">
                  <p className="eyebrow mb-4">catatan kecil</p>
                  <Typewriter
                    text={copy.memoryLead}
                    className="text-xl font-semibold text-amber-950 sm:text-2xl"
                  />
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.35, duration: 0.45 }}
                    className="mt-6 text-base leading-8 text-amber-950/82"
                  >
                    {copy.memoryBody}
                  </motion.p>
                </div>
                <button type="button" onClick={nextScene} className="primary-button mt-7">
                  terus...
                </button>
              </SectionCard>
            ) : null}

            {scene === 5 ? (
              <SectionCard className="max-w-2xl py-10">
                <div className="icon-badge mx-auto mb-4">
                  <Sparkles size={20} />
                </div>
                <p className="eyebrow mb-3">buat kamu tahun ini</p>
                <h2 className="text-2xl font-semibold text-amber-950 sm:text-4xl">Buat kamu tahun ini 🤍</h2>
                <p className="romantic-text mx-auto mt-5 max-w-xl text-base leading-8 text-amber-950/78 sm:text-lg">
                  {copy.hope}
                </p>
                <button type="button" onClick={nextScene} className="primary-button mt-8">
                  terakhir nih...
                </button>
              </SectionCard>
            ) : null}

            {scene === 6 ? (
              <SectionCard className="max-w-2xl py-10">
                <div className="icon-badge mx-auto mb-4">
                  <Heart size={20} />
                </div>
                <p className="eyebrow mb-3">little ending</p>
                <h2 className="text-2xl font-semibold text-amber-950 sm:text-4xl">Selamat ulang tahun, Cinta ✨</h2>
                <p className="romantic-text mx-auto mt-5 max-w-xl text-base leading-8 text-amber-950/82 sm:text-lg">
                  {copy.ending}
                </p>
                <button type="button" onClick={nextScene} className="secondary-button mt-8">
                  udah selesai... atau belum? 👀
                </button>
              </SectionCard>
            ) : null}

            {scene === 7 ? (
              <SectionCard className="vault-surface max-w-2xl text-white">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-300/12 text-yellow-100">
                  <FolderHeart size={20} />
                </div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-yellow-100/62">
                  after credit scene
                </p>
                <h2 className="text-2xl font-semibold sm:text-4xl">Gerbang rahasia</h2>
                <p className="romantic-text mx-auto mt-5 max-w-xl text-base leading-8 text-white/78 sm:text-lg">
                  {copy.secretIntro}
                </p>
                <div className="mt-7 text-left">
                  <PasswordGate
                    gate="secret"
                    intro="Masih ada password kecil satu lagi di sini..."
                    hint={copy.gateTwoHint}
                    buttonLabel="cari jalan masuk"
                    successLabel="access granted ✨"
                    onUnlocked={nextScene}
                    variant="vault"
                  />
                </div>
              </SectionCard>
            ) : null}

            {scene === 8 ? (
              <SectionCard className="vault-surface max-w-2xl text-white">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-300/14 text-yellow-100">
                  <LockOpen size={22} />
                </div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-yellow-100/66">
                  access granted
                </p>
                <h2 className="text-2xl font-semibold sm:text-4xl">Folder paling rahasia</h2>
                <p className="romantic-text mx-auto mt-5 max-w-xl text-base leading-8 text-white/82 sm:text-lg">
                  {copy.secretMessage}
                </p>
                <button type="button" onClick={nextScene} className="vault-button mt-8">
                  ninggalin sesuatu buat aku?
                </button>
              </SectionCard>
            ) : null}

            {scene === 9 ? (
              <SectionCard className="max-w-2xl text-left">
                <ResponseForm
                  title={copy.responseTitle}
                  placeholder={copy.responsePlaceholder}
                  successMessage={copy.successMessage}
                  source="secret"
                />
              </SectionCard>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
