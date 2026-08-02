import Link from "next/link";
import { DEPARTMENT_NAME, SITE_NAME } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-paper-deep/50">
      <div className="mx-auto flex w-full max-w-[860px] flex-col gap-3 px-4 py-6 text-sm text-ink-muted sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-base text-ink">{SITE_NAME}</p>
          <p className="mt-0.5">A service of the {DEPARTMENT_NAME}</p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <Link
            href="/privacy"
            className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            Privacy
          </Link>
          <p className="max-w-sm text-xs leading-relaxed text-ink-faint sm:text-right">
            For entertainment and low-stakes avoidance only. The {DEPARTMENT_NAME}{" "}
            accepts no responsibility for follow-up questions.
          </p>
        </div>
      </div>
    </footer>
  );
}
