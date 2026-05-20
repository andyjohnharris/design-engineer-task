/**
 * FailedStep component
 *
 * This component displays the failed jobs for a step.
 *
 * @param {FailedStepProps} props - The props for the FailedStep component.
 * @returns {React.ReactNode} The FailedStep component.
 */

import { getDuration, getExitCodeText } from "@/lib/buildStatus";
import type { BuildStep, Job } from "@/types/build";

interface FailureInfoProps {
  job: Job;
}

interface FailedStepProps {
  step: BuildStep;
}

function FailureInfo({ job }: FailureInfoProps) {
  const readableDuration = getDuration(job.duration ?? "");

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 w-full text-zinc-800 p-4">
      <div aria-hidden="true">
        <svg
          width="28px"
          height="28px"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            fill: "none",
            verticalAlign: "middle",
            height: "28px",
            width: "28px",
          }}
          className="fill-none text-red-500"
        >
          <path
            d="M0.655539 25.5327C1.30093 23.4822 1.62362 22.4569 1.62362 22C1.62362 21.543 1.30093 20.5178 0.655551 18.4672C-0.882007 13.5819 0.285241 8.02932 4.15729 4.15727C8.02935 0.285207 13.582 -0.882039 18.4672 0.655531C20.5178 1.30091 21.5431 1.6236 22 1.62361C22.4569 1.62361 23.4822 1.30092 25.5328 0.655538C30.418 -0.882021 35.9706 0.28523 39.8427 4.15728C43.7147 8.02933 44.882 13.5819 43.3444 18.4672C42.6991 20.5178 42.3764 21.543 42.3764 22C42.3764 22.4569 42.6991 23.4822 43.3445 25.5327C44.882 30.418 43.7148 35.9706 39.8427 39.8427C35.9707 43.7148 30.4181 44.882 25.5328 43.3445C23.4822 42.6991 22.4569 42.3764 22 42.3764C21.5431 42.3764 20.5178 42.6991 18.4672 43.3445C13.582 44.882 8.02933 43.7148 4.15727 39.8427C0.2852 35.9707 -0.882043 30.418 0.655539 25.5327Z"
            fill="currentColor"
          />
          <path
            d="M24.2638 21.983L27.6681 18.5787C28.1106 18.1702 28.1106 17.4894 27.6681 17.0809L26.9191 16.3319C26.5106 15.8894 25.8298 15.8894 25.4213 16.3319L22.017 19.7362L18.5787 16.3319C18.1702 15.8894 17.4894 15.8894 17.0809 16.3319L16.3319 17.0809C15.8894 17.4894 15.8894 18.1702 16.3319 18.5787L19.7362 21.983L16.3319 25.4213C15.8894 25.8298 15.8894 26.5106 16.3319 26.9191L17.0809 27.6681C17.4894 28.1106 18.1702 28.1106 18.5787 27.6681L22.017 24.2638L25.4213 27.6681C25.8298 28.1106 26.5106 28.1106 26.9191 27.6681L27.6681 26.9191C28.1106 26.5106 28.1106 25.8298 27.6681 25.4213L24.2638 21.983Z"
            fill="white"
          />
        </svg>
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
      {!!job.exitCode && (
        <div className="flex flex-col items-start">
          <p className="text-sm font-semibold">Exit Code:</p>
          <code className="text-sm">{getExitCodeText(job.exitCode)}</code>
        </div>
      )}
    </div>
  )
}

function FailedStep({ step }: FailedStepProps) {
  let failedJobs: Job[] = [];

  if (step.jobs && step.jobs.length > 0 && step.jobs.some((job) => job.status === "failed")) {
    failedJobs = step.jobs.filter((job) => job.status === "failed");
  }

  return (
    <div className="flex flex-col w-full border-2 border-red-500 rounded-md overflow-hidden">
      <div className="flex justify-between items-center w-full bg-red-500">
        <h4 className="flex w-full text-white p-2 font-semibold text-left">
          Build failed at step <strong className="px-1">{step.name}</strong> with the following job failure{failedJobs.length > 1 ? "s" : ""}:
        </h4>
      </div>
      <div className="flex flex-col p-2 bg-white">
        {failedJobs.map((job, i) => <><FailureInfo key={job.id} job={job} />{i + 1 < failedJobs.length && <hr />}</>)}
      </div>
    </div>
  )
}

export default FailedStep