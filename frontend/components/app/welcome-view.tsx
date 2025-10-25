'use client';

import { motion } from 'motion/react';
import {
  BookOpenIcon,
  CarIcon,
  CheckCircleIcon,
  GraduationCapIcon,
  LightningIcon,
  PhoneIcon,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/livekit/button';

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  return (
    <div
      ref={ref}
      className="relative min-h-screen w-full bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-700"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 h-64 w-64 rounded-full bg-cyan-300 opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -right-32 bottom-1/4 h-64 w-64 rounded-full bg-teal-300 opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-6"
        >
          <div className="relative">
            <div className="flex h-20 w-20 rotate-3 items-center justify-center rounded-2xl bg-white shadow-2xl shadow-black/20">
              <CarIcon weight="fill" className="h-10 w-10 text-teal-600" />
            </div>
            <motion.div
              className="absolute -top-1 -right-1 h-6 w-6 rounded-full border-4 border-white bg-orange-500 shadow-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-3"
        >
          <h1 className="text-6xl font-black tracking-tight text-white drop-shadow-lg md:text-7xl">
            Road<span className="text-orange-400">Buddy</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-4"
        >
          <p className="text-xl font-semibold text-teal-50">
            Your California DMV Knowledge Test Coach
          </p>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-10 max-w-2xl text-lg leading-relaxed font-medium text-white/90"
        >
         Built by -Ishaan Mandliya
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-10 grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-3"
        >
          <div className="rounded-xl border-2 border-white/20 bg-white/95 p-5 shadow-2xl backdrop-blur-sm transition-transform duration-200 hover:scale-105">
            <GraduationCapIcon weight="duotone" className="mx-auto mb-3 h-10 w-10 text-teal-600" />
            <p className="text-base font-bold text-slate-800">Practice Quizzes</p>
          </div>
          <div className="rounded-xl border-2 border-white/20 bg-white/95 p-5 shadow-2xl backdrop-blur-sm transition-transform duration-200 hover:scale-105">
            <BookOpenIcon weight="duotone" className="mx-auto mb-3 h-10 w-10 text-teal-600" />
            <p className="text-base font-bold text-slate-800">CA DMV Expert</p>
          </div>
          <div className="rounded-xl border-2 border-white/20 bg-white/95 p-5 shadow-2xl backdrop-blur-sm transition-transform duration-200 hover:scale-105">
            <LightningIcon weight="duotone" className="mx-auto mb-3 h-10 w-10 text-teal-600" />
            <p className="text-base font-bold text-slate-800">Instant Answers</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={onStartCall}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-16 py-7 text-xl font-black text-white shadow-2xl shadow-orange-900/40 transition-all duration-300 hover:scale-110 hover:from-orange-600 hover:to-red-600"
          >
            <PhoneIcon weight="fill" className="mr-3 h-7 w-7" />
            {startButtonText}
          </Button>
        </motion.div>



        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 max-w-2xl"
        >
          <div className="rounded-2xl border-2 border-white/30 bg-white/95 p-5 shadow-2xl backdrop-blur-sm mb-6">
            <p className="text-sm leading-relaxed text-slate-800">
              <span className="font-bold text-teal-700">For RAG context use this DMV PDF:  </span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.dmv.ca.gov/portal/file/california-quick-reference-drivers-handbook-dl-600-x-pdf/"
                className="font-semibold text-teal-600 underline underline-offset-2 transition-colors hover:text-teal-800"
              >
                California Driver&apos;s Handbook
              </a>
            </p>
          </div>
            <div className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-5 shadow-2xl backdrop-blur-sm">
              <h3 className="font-bold text-orange-700 mb-4 text-lg">These are the Tool Calls available for this agent.</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/90 border border-orange-100 p-4 shadow">
                  <span className="font-bold text-orange-700 text-base">Practice Quiz Generator</span>
                  <p className="mt-2 text-slate-800 text-sm">Creates interactive quizzes on 5 different topics: Right-of-way rules, Traffic signs, Parking rules, Speed limits, and General DMV knowledge.</p>
                  <p className="mt-2 text-slate-600 text-xs italic">Example: "Give me a practice quiz on traffic signs"</p>
                </div>
                <div className="rounded-xl bg-white/90 border border-orange-100 p-4 shadow">
                  <span className="font-bold text-orange-700 text-base">Common Mistakes Checker</span>
                  <p className="mt-2 text-slate-800 text-sm">Provides specific mistake lists for: Parallel parking, Lane changes, Intersections, Backing up, and General driving.</p>
                  <p className="mt-2 text-slate-600 text-xs italic">Example: "What are common mistakes in parallel parking?"</p>
                </div>
                <div className="rounded-xl bg-white/90 border border-orange-100 p-4 shadow">
                  <span className="font-bold text-orange-700 text-base">DMV Office Locator</span>
                  <p className="mt-2 text-slate-800 text-sm">Lists DMV offices with real addresses in major CA cities, wait times, hours, and pro tips for visiting.</p>
                  <p className="mt-2 text-slate-600 text-xs italic">Example: "Find DMV offices near Los Angeles"</p>
                </div>
                <div className="rounded-xl bg-white/90 border border-orange-100 p-4 shadow">
                  <span className="font-bold text-orange-700 text-base">Road Sign Explainer</span>
                  <p className="mt-2 text-slate-800 text-sm">Explains 9 types of road signs: Stop, Yield, Warning, Construction, Guide, Service, Recreational, Railroad crossing, and School zone.</p>
                  <p className="mt-2 text-slate-600 text-xs italic">Example: "What does a yield sign mean?"</p>
                </div>
              </div>
            </div>
        </motion.div>
      </section>
    </div>
  );
};
