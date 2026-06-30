"use server";

import { prisma } from "@/lib/prisma";
import {
  createWorkFlowSchema,
  createWorkFlowSchemaType,
} from "@/schema/workflow";
import { WorkFlowStatus } from "@/types/workFlow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateWorkFlow(form: createWorkFlowSchemaType) {
  const { success, data } = createWorkFlowSchema.safeParse(form);

  if (!success) throw new Error("Invalid form data");

  const { userId } = await auth();

  if (!userId) throw new Error("unAuthenticated");

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkFlowStatus.DRAFT,
      definition: "TODO",
      ...data,
    },
  });

  if (!result) throw new Error("Failed to create workflow");

  redirect(`/workflow/editor/${result.id}`);
  // return result.id;
}
