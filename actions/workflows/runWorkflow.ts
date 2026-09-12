"use server";

import { ExecuteWorkflow } from "@/lib/helper/executeWorkflow";
import { prisma } from "@/lib/prisma";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { TaskRegistry } from "@/lib/workflow/task/taskRegistry";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionPlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
  WorkFlowStatus,
} from "@/types/workFlow";
import { auth } from "@clerk/nextjs/server";
import { tr } from "date-fns/locale";
import { redirect } from "next/navigation";

export async function RunWorkflow(form: {
  workflowId: string;
  flowDefinition?: string;
}) {
  const { userId } = await auth();

  if (!userId) throw new Error("unAuthenticated");

  const { workflowId, flowDefinition } = form;
  if (!workflowId) throw new Error("WorkflowId is required");

  const workflow = await prisma.workflow.findUnique({
    where: {
      userId,
      id: workflowId,
    },
  });

  if (!workflow) throw new Error("Workflow not found");

  if (!flowDefinition) throw new Error("Flow definition not defined");

  const flow = JSON.parse(flowDefinition);
  const result = FlowToExecutionPlan(flow.nodes, flow.edges);

  if (result.error) throw new Error("Flow Definition is not valid");

  if (!result.executionPlan) throw new Error("No Execution plan generated");

  const executionPlan: WorkflowExecutionPlan = result.executionPlan;
  console.log("Execution Plan: ", executionPlan);

  const execution = await prisma.workflowExecution.create({
    data: {
      workflowId,
      userId,
      trigger: WorkflowExecutionTrigger.MANUAL,
      startedAt: new Date(),
      status: WorkflowExecutionStatus.PENDING,
      definition: flowDefinition,
      phases: {
        create: executionPlan.flatMap((phase) => {
          return phase.nodes.flatMap((node) => {
            return {
              userId,
              status: ExecutionPhaseStatus.CREATED,
              number: phase.phase,
              node: JSON.stringify(node),
              name: TaskRegistry[node.data.type].label,
            };
          });
        }),
      },
    },
    select: {
      id: true,
      phases: true,
    },
  });

  console.log("EXECUTION: ", execution);

  if (!execution) {
    throw new Error("Workflow Execution not created");
  }

  ExecuteWorkflow(execution.id); // run in the background

  return {
    workflowId,
    executionId: execution.id,
  };
}
