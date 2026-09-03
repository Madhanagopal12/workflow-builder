import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/getWorkflowExecutionWithPhases";
import Topbar from "@/app/workflow/_components/topbar/Topbar";
import { waitFor } from "@/lib/helper/waitFor";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";
import ExecutionViewer from "./_components/ExecutionViewer";

export default async function ExecutionViewerPage({
  params,
}: {
  params: {
    executionId: string;
    workflowId: string;
  };
}) {
  const { workflowId, executionId } = await params;
  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <Topbar
        title="Workflow Run Details"
        subtitle={`Run ID: ${executionId}`}
        workflowId={workflowId}
        hideButtons
      />
      <section className="flex h-full overflow-auto">
        <Suspense
          fallback={
            <div className="flex w-full items-center justify-center">
              <Loader2Icon className="h-10 w-10 animate-spin stroke-primary" />;
            </div>
          }
        >
          <ExecutionWrapper executionId={executionId} />
        </Suspense>
      </section>
    </div>
  );
}

async function ExecutionWrapper({ executionId }: { executionId: string }) {
  const workflowExecution = await GetWorkflowExecutionWithPhases(executionId);
  if (!workflowExecution) {
    return <div>Not Found</div>;
  }
  return <ExecutionViewer initialData={workflowExecution} />;
}
