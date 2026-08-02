import { DEPARTMENT_NAME, DIVISION_NAME, FORM_CODE, OFFICE_NAME } from "@/lib/constants";

export function OfficialHeader() {
  return (
    <header className="border-b border-line bg-surface/80 backdrop-blur-[2px]">
      <div className="mx-auto flex w-full max-w-[860px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-line-strong bg-paper font-mono text-[11px] font-semibold tracking-[0.12em] text-accent"
          >
            DN
          </div>
          <div className="min-w-0">
            <p className="truncate font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
              {DEPARTMENT_NAME}
            </p>
            <p className="truncate text-sm text-ink">{OFFICE_NAME}</p>
          </div>
        </div>
        <div className="hidden text-right sm:block">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
            {FORM_CODE}
          </p>
          <p className="text-xs text-ink-muted">{DIVISION_NAME}</p>
        </div>
      </div>
    </header>
  );
}
