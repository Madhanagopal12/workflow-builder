import { TaskParamType, TaskType } from "@/types/task";
import { Globe2Icon, GlobeIcon, icons, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "LAUNCH_BROWSER",
  icon: (props: LucideProps) => (
    <GlobeIcon className="stroke-pink-400" {...props} />
  ),
  isEntryPoint: true,
  inputs: [
    {
      name: "Website URL",
      type: TaskParamType.STRING,
      helperText: "https://www.google.com",
      required: true,
      hideHandle: true,
    },
  ],
};
