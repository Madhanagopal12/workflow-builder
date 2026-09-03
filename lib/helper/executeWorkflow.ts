import "server-only";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

export async function ExecuteWorkflow(executionId: string) {
  const execution = await prisma.workflowExecution.findUnique({
    where: {
      id: executionId,
    },
    include: { workflow: true, phases: true },
  });

  if (!execution) {
    throw new Error("Execution not found");
  }

  // TODO: setup execution environment

  // TODO: initialize workflow execution
  // TODO: innitialize phases status

  // eslint-disable-next-line prefer-const
  let executionFalied = false;

  for (const phase of execution.phases) {
    // TODO: execute phase
  }

  // TODO: finalize execution

  // TODO: clean up the environment

  revalidatePath("/workflows/runs");
}
