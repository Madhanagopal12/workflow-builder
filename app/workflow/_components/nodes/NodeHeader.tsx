import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateFlowNode } from "@/lib/workflow/CreateFlowNode";
import { TaskRegistry } from "@/lib/workflow/task/taskRegistry";
import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";
import { useReactFlow } from "@xyflow/react";
import { CoinsIcon, CopyIcon, GripVerticalIcon, TrashIcon } from "lucide-react";
import App from "next/app";
import React from "react";

function NodeHeader({
  taskType,
  nodeId,
}: {
  taskType: TaskType;
  nodeId: string;
}) {
  const task = TaskRegistry[taskType];
  const { deleteElements, getNode, addNodes } = useReactFlow();

  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={16} />
      <div className="flex items-center justify-between w-full">
        <p className="text-xs font-bold uppercase text-muted-foreground">
          {task.label}
        </p>
        <div className="flex items-center gap-1">
          {task.isEntryPoint && <Badge>Entry point</Badge>}
          <Badge className="flex items-center gap-2 text-xs">
            <CoinsIcon size={16} />
            TODOS
          </Badge>
          {!task.isEntryPoint && (
            <>
              <Button
                variant={"ghost"}
                onClick={() => deleteElements({ nodes: [{ id: nodeId }] })}
              >
                <TrashIcon size={12} />
              </Button>
              <Button
                variant={"ghost"}
                onClick={() => {
                  const node = getNode(nodeId) as AppNode;
                  const nodeX = node.position.x;
                  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                  const nodeY = node.position.y + node.measured?.height! + 20;
                  const newNode = CreateFlowNode(node.data.type, {
                    x: nodeX,
                    y: nodeY,
                  });
                  addNodes([newNode]);
                }}
              >
                <CopyIcon size={12} />
              </Button>
            </>
          )}
          <Button
            variant={"ghost"}
            size={"icon"}
            className="drag-handle cursor-grab"
          >
            <GripVerticalIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NodeHeader;
