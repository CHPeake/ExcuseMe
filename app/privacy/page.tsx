import type { Metadata } from "next";
import Link from "next/link";
import { DEPARTMENT_NAME, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${SITE_NAME} handles the limited information submitted with excuse requests.`,
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-[760px] px-4 py-8 sm:px-6 sm:py-12">
      <article className="document-panel rounded-md px-5 py-7 sm:px-8 sm:py-9">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
          {DEPARTMENT_NAME}
        </p>
        <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">Privacy</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
          {SITE_NAME} is a lightweight entertainment app. This page describes what
          happens when you generate an excuse.
        </p>

        <ul className="mt-8 space-y-4 text-sm leading-relaxed text-ink sm:text-base">
          <li>
            <strong className="font-medium">No accounts.</strong> You do not need to
            create an account or sign in.
          </li>
          <li>
            <strong className="font-medium">No request database.</strong> The app does
            not store excuse requests in an application database.
          </li>
          <li>
            <strong className="font-medium">AI processing.</strong> Optional context you
            submit is sent to the AI provider solely to generate the requested excuse.
          </li>
          <li>
            <strong className="font-medium">Do not submit sensitive information.</strong>{" "}
            Avoid names, contact details, medical information, passwords, or anything you
            would not put in a casual message.
          </li>
          <li>
            <strong className="font-medium">No intentional storage.</strong> Requests are
            not intentionally retained by the app after a response is returned.
          </li>
          <li>
            <strong className="font-medium">Possible future analytics.</strong> Basic
            anonymous analytics may be added later. No tracking cookies are used by
            default today.
          </li>
        </ul>

        <p className="mt-8 text-sm text-ink-muted">
          Questions about this page can be treated as informal and non-urgent. The{" "}
          {DEPARTMENT_NAME} moves slowly on purpose.
        </p>

        <p className="mt-8">
          <Link
            href="/"
            className="text-sm font-medium text-accent underline decoration-line-strong underline-offset-4 hover:text-accent-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            Return to the form
          </Link>
        </p>
      </article>
    </div>
  );
}
