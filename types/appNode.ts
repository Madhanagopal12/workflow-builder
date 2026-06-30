import { TaskType } from "./task";

export interface AppNodeData {
  type: TaskType;
  input: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface AppNode {
  data: AppNodeData;
}
