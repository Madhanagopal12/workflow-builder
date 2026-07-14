"use client";

import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Layers2Icon, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createWorkFlowSchema,
  createWorkFlowSchemaType,
} from "@/schema/workflow";
import { useMutation } from "@tanstack/react-query";
import { CreateWorkFlow } from "@/actions/workflows/createWorkFlow";
import { toast } from "sonner";
import { error } from "console";
import { formatWeekNumber } from "react-day-picker";
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context";
import { useRouter } from "next/navigation";

function CreateWorkflowDialog({ triggerText }: { triggerText?: string }) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const form = useForm<createWorkFlowSchemaType>({
    resolver: zodResolver(createWorkFlowSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkFlow,

    onSuccess: (data) => {
      toast.success("Created workflow", { id: "create-workflow" });
      router.push(`/workflow/editor/${data.workflowId}`);
    },
    onError: (error) => {
      toast.error("Failed to created workflow", { id: "create-workflow" });
      console.log("ERRORRRRRR: ", error);
    },
  });

  const onSubmit = useCallback(
    (values: createWorkFlowSchemaType) => {
      toast.loading("Creating workflow...", { id: "create-workflow" });
      mutate(values);
    },
    [mutate],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset();
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <DialogDescription className="sr-only">
          Create a new workflow
        </DialogDescription>
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create workflow"
          subTitle="Start building your workflow"
        />
        <div className="p-6">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="flex gap-1 items-center">
                      Name
                      <p className="text-xs text-primary"> (required)</p>
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder=""
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}

                    <FieldDescription>
                      Choose a descriptive and unique name
                    </FieldDescription>
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="flex gap-1 items-center">
                      Description
                      <p className="text-xs text-muted-foreground">
                        {" "}
                        (optional)
                      </p>
                    </FieldLabel>
                    <Textarea
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder=""
                      autoComplete="off"
                      className="resize-none"
                    />

                    <FieldDescription>
                      Provide a brief description of what yoy work flow does.
                      <br /> This is optional but can help you remember the
                      workflow&apos; purpose.
                    </FieldDescription>
                  </Field>
                )}
              />
            </FieldGroup>
            <Button type="submit" disabled={isPending} className="w-full mt-4">
              {!isPending && "Proceed"}
              {isPending && <Loader2 className="animate-spin" />}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateWorkflowDialog;
