/**
 * InProgressStep component
 *
 * This component displays the jobs currently running in a step.
 *
 * @param {InProgressStepProps} props - The props for the InProgressStep component.
 * @returns {React.ReactNode} The InProgressStep component.
 */

import { getDuration } from "@/lib/buildStatus";
import { BuildStep, Job } from "@/types/build";
import { Loader2 } from "lucide-react";

interface InProgressInfoProps {
  job: Job;
}

interface InProgressStepProps {
  step: BuildStep;
}

function InProgressInfo({ job }: InProgressInfoProps) {
  const readableDuration = getDuration(job.duration ?? "");

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 w-full text-zinc-800 p-4">
      <div
        className="rounded-full bg-amber-500 p-1"
        aria-hidden="true"
      >
        <Loader2 size={16} className="text-white animate-spin motion-reduce:animate-none" />
      </div>
      <div className="flex flex-col items-start">
        <p className="text-sm font-semibold">Job Name:</p>
        <code className="text-sm">{job.name}</code>
      </div>
      <div className="flex flex-col items-start">
        <p className="text-sm font-semibold">Duration:</p>
        <code className="text-sm">{readableDuration}</code>
      </div>
      <div className="flex flex-col items-start">
        <p className="text-sm font-medium">Agent:</p>
        <code className="text-sm">{job.agent}</code>
      </div>
      <div className="flex flex-col items-start">
        <p className="text-sm font-semibold">Command:</p>
        <code className="text-sm">{job.command}</code>
      </div>
    </div>
  )
}

function InProgressStep({ step }: InProgressStepProps) {
  let inProgressJobs: Job[] = [];

  if (step.jobs && step.jobs.length > 0 && step.jobs.some((job) => job.status === "in-progress")) {
    inProgressJobs = step.jobs.filter((job) => job.status === "in-progress");
  }

  return (
    <div className="flex flex-col w-full border-2 border-amber-400 rounded-md overflow-hidden">
      <div className="flex justify-between items-center w-full bg-amber-400">
        <h4 className="flex w-full text-zinc-800 p-2 font-semibold text-left">
          Currently running step <strong className="pl-1">{step.name}</strong>:
        </h4>
      </div>
      <div className="flex flex-col p-2 bg-white">
        {inProgressJobs.map((job, i) => <><InProgressInfo key={job.id} job={job} />{i + 1 < inProgressJobs.length && <hr />}</>)}
      </div>
    </div>
  )
}

export default InProgressStep;