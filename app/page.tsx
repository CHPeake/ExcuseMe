import { ExcuseForm } from "@/app/components/excuse-form";
import { createReferenceNumber } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const reference = createReferenceNumber();

  return (
    <div className="mx-auto w-full max-w-[860px] px-4 py-8 sm:px-6 sm:py-12">
      <ExcuseForm reference={reference} />
    </div>
  );
}
