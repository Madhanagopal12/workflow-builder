import { ExecutionPhaseStatus } from "@/types/workFlow";
import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleXIcon,
  Loader2Icon,
} from "lucide-react";

function PhaseStatusBadge({ status }: { status: ExecutionPhaseStatus }) {
  switch (status) {
    case ExecutionPhaseStatus.PENDING:
      return <CircleDashedIcon className="stroke-muted-foreground" />;
    case ExecutionPhaseStatus.RUNNING:
      return <Loader2Icon className="animate-spin stroke-yellow-500" />;
    case ExecutionPhaseStatus.FAILED:
      return <CircleXIcon className="stroke-red-500" />;
    case ExecutionPhaseStatus.COMPLETED:
      return <CircleCheckIcon className="stroke-green-500" />;
    default:
      return <div className="rounded-full">{status}</div>;
  }
}

export default PhaseStatusBadge;
