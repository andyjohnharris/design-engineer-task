/**
 * ExpandedBuildView component
 *
 * This component displays the expanded view of a build.
 *
 * @param {ExpandedBuildViewProps} props - The props for the ExpandedBuildView component.
 * @returns {React.ReactNode} The ExpandedBuildView component.
 */

import React from "react";
import { BuildStep } from "@/types/build";
import { getCurrentSteps } from "@/lib/buildStatus";
import InProgressStep from "./steps/InProgressStep";
import FailedStep from "./steps/FailedStep";

interface ExpandedBuildViewProps {
  buildSteps: BuildStep[];
}

const ExpandedBuildView: React.FC<ExpandedBuildViewProps> = ({ buildSteps }) => {
  const { failed, inProgress } = getCurrentSteps(buildSteps);

  return (
    <div className="flex flex-col w-full">
      {inProgress.map((step) => <InProgressStep key={step.name} step={step} />)}
      {failed.map((step) => <FailedStep key={step.name} step={step} />)}
    </div>
  );
};

export default ExpandedBuildView;
