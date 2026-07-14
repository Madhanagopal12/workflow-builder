"use server";

import { prisma } from "@/lib/prisma";
import {
  createWorkFlowSchema,
  createWorkFlowSchemaType,
} from "@/schema/workflow";
import { TaskType } from "@/types/task";
import { WorkFlowStatus } from "@/types/workFlow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AppNode } from "@/types/appNode";
import { Edge } from "@xyflow/react";
import { CreateFlowNode } from "@/lib/workflow/CreateFlowNode";

export async function CreateWorkFlow(form: createWorkFlowSchemaType) {
  const { success, data } = createWorkFlowSchema.safeParse(form);

  if (!success) throw new Error("Invalid form data");

  const { userId } = await auth();

  if (!userId) throw new Error("unAuthenticated");

  const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  };

  // let's add the flow entry point
  initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER));

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkFlowStatus.DRAFT,
      definition: JSON.stringify(initialFlow),
      ...data,
    },
  });

  if (!result) throw new Error("Failed to create workflow");

  return {
    success: true,
    workflowId: result.id,
  };
}
