import { ExecutionEnvironment } from "@/types/executor";
import { PageToHtmlTask } from "../task/PageToHtml";

export async function PageToHtmlExecutor(
  environment: ExecutionEnvironment<typeof PageToHtmlTask>,
): Promise<boolean> {
  const html = await environment.getPage()!.content();
  environment.setOutput("HTML", html);
  console.log("HTML: ", html);
  try {
    return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
