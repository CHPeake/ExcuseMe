"use client";

import { useEffect, useId, useState, useTransition } from "react";
import { generateExcuseAction } from "@/app/actions/generate-excuse";
import {
  CATEGORIES,
  GENERIC_ERROR_MESSAGE,
  MAX_CONTEXT_LENGTH,
  TONES,
} from "@/lib/constants";
import type { Category, GenerateExcuseResult, Tone, UiState } from "@/lib/types";
import { buildShareText } from "@/lib/utils";
import { ExcuseResult } from "./excuse-result";
import { LoadingState } from "./loading-state";
import { OptionCard } from "./option-card";

type ExcuseFormProps = {
  reference: string;
};

export function ExcuseForm({ reference }: ExcuseFormProps) {
  const formId = useId();
  const [category, setCategory] = useState<Category | null>(null);
  const [tone, setTone] = useState<Tone | null>(null);
  const [context, setContext] = useState("");
  const [uiState, setUiState] = useState<UiState>("form");
  const [result, setResult] = useState<GenerateExcuseResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareNotice, setShareNotice] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!copySuccess) return;
    const timer = window.setTimeout(() => setCopySuccess(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copySuccess]);

  function validateSelection(): boolean {
    if (!category || !tone) {
      setFieldError("Please select both a category and a tone before submitting.");
      return false;
    }
    setFieldError(null);
    return true;
  }

  function submit(currentCategory: Category, currentTone: Tone) {
    setError(null);
    setShareNotice(null);
    setCopySuccess(false);
    setUiState("submitting");

    startTransition(async () => {
      const response = await generateExcuseAction({
        category: currentCategory,
        tone: currentTone,
        context,
      });

      if (!response.ok) {
        setError(response.error || GENERIC_ERROR_MESSAGE);
        setUiState(result ? "result" : "error");
        return;
      }

      setResult(response.data);
      setUiState("result");
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateSelection() || !category || !tone) return;
    submit(category, tone);
  }

  function handleTryAnother() {
    if (!category || !tone) return;
    submit(category, tone);
  }

  async function handleCopy() {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result.excuse);
      setCopySuccess(true);
      setShareNotice(null);
    } catch {
      setShareNotice("Clipboard unavailable. Please copy the excuse manually.");
    }
  }

  async function handleShare() {
    if (!result) return;

    const shareText = buildShareText(result.excuse);

    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: "Excuse Me",
          text: shareText,
        });
        setShareNotice(null);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setShareNotice("Share text copied. Native sharing unavailable on this device.");
    } catch {
      setShareNotice("Sharing unavailable. Please copy the excuse manually.");
    }
  }

  function handleStartOver() {
    setCategory(null);
    setTone(null);
    setContext("");
    setResult(null);
    setError(null);
    setFieldError(null);
    setCopySuccess(false);
    setShareNotice(null);
    setUiState("form");
  }

  const isSubmitting = uiState === "submitting" || isPending;
  const showForm = uiState === "form" || uiState === "error";
  const showResult = uiState === "result" && result;

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
            Public service notice
          </p>
          <h1 className="mt-2 font-display text-4xl leading-none tracking-tight text-ink sm:text-5xl">
            Excuse Me
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-ink sm:text-xl">
            Professionally generated reasons for absolutely anything.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
            Complete the following form to receive one officially prepared
            justification for your absence, delay, refusal, or general lack of
            enthusiasm.
          </p>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
          REFERENCE: {reference}
        </p>
      </section>

      {showForm ? (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="document-panel rounded-md px-4 py-5 sm:px-7 sm:py-7"
          aria-labelledby={`${formId}-title`}
        >
          <div className="border-b border-line pb-4">
            <h2
              id={`${formId}-title`}
              className="font-display text-2xl text-ink sm:text-[1.75rem]"
            >
              Excuse request form
            </h2>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              Fields marked by conscience are optional
            </p>
          </div>

          <fieldset className="mt-6 space-y-3" disabled={isSubmitting}>
            <legend className="text-sm font-medium text-ink sm:text-base">
              1. What are you trying to avoid?
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {CATEGORIES.map((option) => (
                <OptionCard
                  key={option.value}
                  name="category"
                  value={option.value}
                  label={option.label}
                  checked={category === option.value}
                  onChange={(value) => setCategory(value as Category)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-7 space-y-3" disabled={isSubmitting}>
            <legend className="text-sm font-medium text-ink sm:text-base">
              2. How should it sound?
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {TONES.map((option, index) => (
                <div
                  key={option.value}
                  className={index === TONES.length - 1 ? "sm:col-span-2" : undefined}
                >
                  <OptionCard
                    name="tone"
                    value={option.value}
                    label={option.label}
                    description={option.description}
                    checked={tone === option.value}
                    onChange={(value) => setTone(value as Tone)}
                  />
                </div>
              ))}
            </div>
          </fieldset>

          <div className="mt-7 space-y-2">
            <label
              htmlFor={`${formId}-context`}
              className="block text-sm font-medium text-ink sm:text-base"
            >
              3. Relevant details — regrettably optional
            </label>
            <textarea
              id={`${formId}-context`}
              name="context"
              value={context}
              maxLength={MAX_CONTEXT_LENGTH}
              disabled={isSubmitting}
              rows={4}
              placeholder="I promised to attend my neighbour’s birthday dinner."
              onChange={(event) => setContext(event.target.value)}
              className="w-full resize-y rounded-md border border-line bg-paper px-3 py-3 text-sm text-ink placeholder:text-ink-faint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:opacity-60"
              aria-describedby={`${formId}-context-help ${formId}-context-count`}
            />
            <div className="flex items-center justify-between gap-3 text-xs text-ink-faint">
              <p id={`${formId}-context-help`}>
                Do not include sensitive personal information.
              </p>
              <p id={`${formId}-context-count`} className="font-mono shrink-0">
                {context.length}/{MAX_CONTEXT_LENGTH}
              </p>
            </div>
          </div>

          {fieldError || error ? (
            <p
              role="alert"
              className="mt-5 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-sm text-accent-deep"
            >
              {fieldError || error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-accent px-5 py-3.5 text-sm font-semibold tracking-wide text-paper transition-colors hover:bg-accent-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[240px]"
          >
            Generate Official Excuse
          </button>
        </form>
      ) : null}

      {isSubmitting ? <LoadingState /> : null}

      {showResult && !isSubmitting ? (
        <ExcuseResult
          result={result}
          copySuccess={copySuccess}
          shareNotice={shareNotice}
          isRegenerating={isSubmitting}
          onCopy={handleCopy}
          onTryAnother={handleTryAnother}
          onShare={handleShare}
          onStartOver={handleStartOver}
        />
      ) : null}
    </div>
  );
}
