import { TaskParamType, TaskType } from "@/types/task";
import {
  CodeIcon,
  Globe2Icon,
  GlobeIcon,
  icons,
  LucideProps,
  TextIcon,
} from "lucide-react";

export const ExtractTextFromElementTask = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract Text fom Element",
  icon: (props: LucideProps) => (
    <TextIcon className="stroke-pink-400" {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: "Html",
      type: TaskParamType.STRING,
      required: true,
      variants: "textarea",
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
      required: true,
    },
  ],
  outputs: [{ name: "Extracted Text", type: TaskParamType.STRING }],
};
