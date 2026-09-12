import { TaskType } from "@/types/task";
import { LanuchBrowserExecutor } from "./LaunchBrowserExecutor";
import { PageToHtmlExecutor } from "./PageToHtmlExecutor";
import { ExecutionEnvironment } from "@/types/executor";
import { WorkflowTask } from "@/types/workFlow";
import { ExtractTextFromElementExecutor } from "./ExtractTextFromElementExecutor";

type ExecutorFn<T extends WorkflowTask> = (
  executinEnvironment: ExecutionEnvironment<T>,
) => Promise<boolean>;

type RegistryType = { [k in TaskType]: ExecutorFn<WorkflowTask & { type: k }> };

export const ExecutorRegistry: RegistryType = {
  LAUNCH_BROWSER: LanuchBrowserExecutor,
  PAGE_TO_HTML: PageToHtmlExecutor,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
};
