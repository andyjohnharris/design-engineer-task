import { useState } from "react";
import { cn } from "@/lib/utils";
import { mockBuildSteps } from "@/data/mockBuildSteps";
import type { BuildStep, StepStatus } from "@/types/build";

/**
 * Low-fidelity skeleton of the page below the build header.
 *
 * Gives candidates spatial context for where the expandable header sits
 * relative to the full build UI. Not part of the task — do not modify.
 */

type SkeletonRow = { name: string; status: StepStatus; indent?: boolean };

/** Derive skeleton rows from mockBuildSteps so they never drift. */
function toSkeletonRows(steps: BuildStep[]): SkeletonRow[] {
  const rows: SkeletonRow[] = [];
  for (const step of steps) {
    rows.push({ name: step.name, status: step.status });
    if (step.jobs) {
      for (const job of step.jobs) {
        rows.push({ name: job.name, status: job.status, indent: true });
      }
    }
  }
  return rows;
}

const skeletonSteps = toSkeletonRows(mockBuildSteps);

function Bar({ className }: { className?: string }) {
  return <div className={cn("rounded bg-zinc-300/80", className)} />;
}

export default function PageSkeleton() {
  const [selected, setSelected] = useState<string | null>(
    skeletonSteps[0]?.name ?? null,
  );

  return (
    <div className="flex-1 flex flex-col mx-2 lg:mx-3 mt-1 select-none" aria-hidden="true">
      {/* Tab navigation bar */}
      <div className="flex items-center gap-1 border-b border-zinc-200 py-1.5">
        {["List", "Table", "Canvas", "Waterfall"].map((label, i) => (
          <div
            key={label}
            className={cn(
              "px-3 py-1 rounded text-sm",
              i === 0
                ? "bg-zinc-200/70 text-zinc-800 font-medium"
                : "text-zinc-500",
            )}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Content area: step list + sidebar */}
      <div className="flex flex-col sm:flex-row flex-1 min-h-0">
        {/* Step rows */}
        <div className="flex-1 min-w-0">
          {skeletonSteps.map((step) => (
            <div
              key={step.name}
              onClick={() => setSelected(selected === step.name ? null : step.name)}
              className={cn(
                "flex items-center gap-3 px-3 py-3 border-b border-zinc-100 cursor-pointer hover:bg-zinc-100",
                step.indent && "pl-10",
                selected === step.name && "bg-zinc-100 hover:bg-zinc-100",
              )}
            >
              <div
                className={cn(
                  "w-3.5 h-3.5 rounded-full shrink-0",
                  step.status === "complete" && "bg-green-500",
                  step.status === "in-progress" && "bg-amber-500",
                  step.status === "failed" && "bg-red-500",
                  step.status === "pending" && "bg-zinc-300",
                )}
              />
              <span className="text-sm text-zinc-600">
                {step.name}
              </span>
              <div className="ml-auto flex gap-8">
                <Bar className="w-8 h-3" />
                <Bar className="w-12 h-3" />
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="w-full sm:w-[33.33%] shrink-0 border-t sm:border-t-0 sm:border-l border-zinc-200 flex flex-col">
          {selected ? (
            <>
              <div className="px-4 py-3 border-b border-zinc-100 text-sm font-medium text-zinc-800">
                {selected}
              </div>
              {/* Log panel tabs — first tab (the log) is selected */}
              <div className="flex items-center gap-4 px-4 py-2 border-b border-zinc-200">
                <Bar className="w-10 h-3 bg-zinc-500" />
                <Bar className="w-12 h-3" />
                <Bar className="w-14 h-3" />
                <Bar className="w-10 h-3" />
              </div>
              {/* Log block */}
              <div className="h-[50vh] sm:h-auto sm:flex-1 p-4 overflow-hidden">
                <Bar className="h-full w-full bg-zinc-900" />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-sm text-zinc-400 px-4 text-center">
              Select a step to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
