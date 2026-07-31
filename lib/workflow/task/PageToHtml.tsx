import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workFlow";
import {
  CodeIcon,
  Globe2Icon,
  GlobeIcon,
  icons,
  LucideProps,
} from "lucide-react";

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: "Get HTML from page",
  icon: (props: LucideProps) => (
    <CodeIcon className="stroke-pink-400" {...props} />
  ),
  isEntryPoint: false,
  credits: 2,
  inputs: [
    {
      name: "Web Page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
  ],
  outputs: [
    { name: "HTML", type: TaskParamType.STRING },
    { name: "Web Page", type: TaskParamType.BROWSER_INSTANCE },
  ],
} satisfies WorkflowTask;
