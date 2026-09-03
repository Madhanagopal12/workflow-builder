import {
  FlowExecutionValidationPlanError,
  FlowToExecutionPlan,
} from "@/lib/workflow/executionPlan";
import { AppNode } from "@/types/appNode";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import useFlowValidation from "./useFlowValidation";
import { toast } from "sonner";

const useExecutionPlan = () => {
  const { toObject } = useReactFlow<AppNode>();
  const { setInvalidInputs, clearErrors } = useFlowValidation();

  const handleError = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error: any) => {
      switch (error.type) {
        case FlowExecutionValidationPlanError.NO_ENTRY_POINT:
          toast.error("No entry point found");
          break;
        case FlowExecutionValidationPlanError.INVALID_INPUTS:
          toast.error("Not all input values are set");
          setInvalidInputs(error.invalidElements);
          break;

        default:
          toast.error("Someting went wrong");
          break;
      }
    },
    [setInvalidInputs],
  );

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan, error } = FlowToExecutionPlan(
      nodes as AppNode[],
      edges,
    );

    if (error) {
      handleError(error);
      return null;
    }

    clearErrors();

    return executionPlan;
  }, [toObject, handleError, clearErrors]);
  return generateExecutionPlan;
};

export default useExecutionPlan;
