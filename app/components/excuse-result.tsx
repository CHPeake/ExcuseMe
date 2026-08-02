"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check, Copy, RefreshCw, RotateCcw, Share2 } from "lucide-react";
import {
  CATEGORY_LABELS,
  FALLBACK_NOTICE,
  TONE_LABELS,
} from "@/lib/constants";
import type { GenerateExcuseResult } from "@/lib/types";
import { buildShareText, cn, formatOfficialDate } from "@/lib/utils";

type ExcuseResultProps = {
  result: GenerateExcuseResult;
  copySuccess: boolean;
  shareNotice: string | null;
  isRegenerating: boolean;
  onCopy: () => void;
  onTryAnother: () => void;
  onShare: () => void;
  onStartOver: () => void;
};

export function ExcuseResult({
  result,
  copySuccess,
  shareNotice,
  isRegenerating,
  onCopy,
  onTryAnother,
  onShare,
  onStartOver,
}: ExcuseResultProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      aria-label="Approved explanation"
      className="document-panel relative overflow-hidden rounded-md px-5 py-6 sm:px-8 sm:py-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-accent"
      />

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-approved">
            Approved explanation
          </p>
          <p className="mt-1 font-mono text-[11px] text-ink-faint">
            REFERENCE: {result.reference}
          </p>
        </div>
        <div
          aria-hidden="true"
          className="stamp-badge hidden rounded-sm px-3 py-2 text-[10px] font-semibold sm:block"
        >
          Filed
        </div>
      </div>

      <blockquote className="mt-6 border-l-2 border-accent pl-4 sm:pl-5">
        <p className="font-display text-[1.35rem] leading-snug text-ink sm:text-[1.7rem] sm:leading-snug">
          {result.excuse}
        </p>
      </blockquote>

      <dl className="mt-6 grid gap-3 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint sm:grid-cols-3">
        <div>
          <dt>Date</dt>
          <dd className="mt-1 normal-case tracking-normal text-ink-muted">
            {formatOfficialDate(new Date(result.generatedAt))}
          </dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd className="mt-1 normal-case tracking-normal text-ink-muted">
            {CATEGORY_LABELS[result.category]}
          </dd>
        </div>
        <div>
          <dt>Tone</dt>
          <dd className="mt-1 normal-case tracking-normal text-ink-muted">
            {TONE_LABELS[result.tone]}
          </dd>
        </div>
      </dl>

      {result.usedFallback ? (
        <p className="mt-4 text-xs text-ink-faint">{FALLBACK_NOTICE}</p>
      ) : null}

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        <ActionButton onClick={onCopy} disabled={isRegenerating}>
          {copySuccess ? (
            <>
              <Check className="h-4 w-4" aria-hidden="true" />
              Copied with regret
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" aria-hidden="true" />
              Copy Excuse
            </>
          )}
        </ActionButton>
        <ActionButton
          onClick={onTryAnother}
          disabled={isRegenerating}
          variant="secondary"
        >
          <RefreshCw
            className={cn("h-4 w-4", isRegenerating && "animate-spin")}
            aria-hidden="true"
          />
          Try Another
        </ActionButton>
        <ActionButton
          onClick={onShare}
          disabled={isRegenerating}
          variant="secondary"
        >
          <Share2 className="h-4 w-4" aria-hidden="true" />
          Share My Shame
        </ActionButton>
        <ActionButton
          onClick={onStartOver}
          disabled={isRegenerating}
          variant="secondary"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Start Over
        </ActionButton>
      </div>

      <p className="sr-only" aria-live="polite">
        {copySuccess ? "Excuse copied to clipboard." : ""}
        {shareNotice ?? ""}
      </p>

      {shareNotice ? (
        <p className="mt-3 text-xs text-ink-muted" role="status">
          {shareNotice}
        </p>
      ) : null}

      <p className="sr-only">{buildShareText(result.excuse)}</p>
    </motion.section>
  );
}

function ActionButton({
  children,
  onClick,
  disabled,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-medium transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary"
          ? "bg-accent text-paper hover:bg-accent-deep"
          : "border border-line bg-surface text-ink hover:border-line-strong hover:bg-paper",
      )}
    >
      {children}
    </button>
  );
}
