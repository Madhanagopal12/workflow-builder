import { GetWorkflowExecutions } from "@/actions/workflows/getWorkflowExecutions";
import Topbar from "../../_components/topbar/Topbar";
import { Suspense } from "react";
import { InboxIcon, Loader2Icon } from "lucide-react";
import { waitFor } from "@/lib/helper/waitFor";
import ExecutionsTable from "./_components/ExecutionsTable";

async function ExecutionsPage({ params }: { params: { workflowId: string } }) {
  const { workflowId } = await params;
  return (
    <div className="w-full h-full overflow-auto">
      <Topbar
        workflowId={workflowId}
        title="All runs"
        subtitle="List of all your workflow runs"
        hideButtons
      />
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center ">
            <Loader2Icon className="animate-spin stroke-primary" />
          </div>
        }
      >
        <ExecutionsTableWrapper workflowId={workflowId} />
      </Suspense>
    </div>
  );
}

async function ExecutionsTableWrapper({ workflowId }: { workflowId: string }) {
  await waitFor(4000);
  const executions = await GetWorkflowExecutions(workflowId);

  if (!executions) return <div>No Data</div>;

  if (executions.length === 0) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <div className="flex flex-col w-full h-full items-center justify-center gap-2 ">
          <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
            <InboxIcon size={40} className="stroke-primary" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">
              No runs have been triggered yet for this workflow
            </p>
            <p className="font-sm text-muted-foreground">
              You can trigger a new run in the editor page
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-4 py-6 max-w-6xl">
      <ExecutionsTable workflowId={workflowId} initialData={executions} />
    </div>
  );
}

export default ExecutionsPage;
