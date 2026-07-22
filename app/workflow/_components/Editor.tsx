import { workflow } from "@/lib/generated/prisma/client";
import React from "react";
import FlowEditor from "./FlowEditor";
import { ReactFlowProvider } from "@xyflow/react";
import Topbar from "./topbar/Topbar";
import TaskMenu from "./TaskMenu";

function Editor({ workflow }: { workflow: workflow }) {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <Topbar
          title="Workflow Editor"
          subtitle="Really long name for workflow test test test test test"
          workflowId={workflow.id}
        />
        <section className="flex h-full overflow-auto">
          <TaskMenu />
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
}
export default Editor;
