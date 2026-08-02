"use client";

import { cn } from "@/lib/utils";

type OptionCardProps = {
  name: string;
  value: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: string) => void;
};

export function OptionCard({
  name,
  value,
  label,
  description,
  checked,
  onChange,
}: OptionCardProps) {
  const id = `${name}-${value}`;

  return (
    <label
      htmlFor={id}
      className={cn(
        "relative flex cursor-pointer flex-col gap-1 rounded-md border px-3.5 py-3 transition-colors",
        "bg-surface hover:border-line-strong",
        "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus",
        checked
          ? "border-accent bg-paper shadow-[inset_3px_0_0_0_var(--accent)]"
          : "border-line",
      )}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <span className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-ink sm:text-[15px]">{label}</span>
        <span
          aria-hidden="true"
          className={cn(
            "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
            checked ? "border-accent bg-accent" : "border-line-strong bg-paper",
          )}
        >
          {checked ? <span className="h-1.5 w-1.5 rounded-full bg-paper" /> : null}
        </span>
      </span>
      {description ? (
        <span className="pr-6 text-xs leading-relaxed text-ink-muted sm:text-[13px]">
          {description}
        </span>
      ) : null}
    </label>
  );
}
