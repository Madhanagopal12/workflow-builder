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
  } catch (error) {
    console.error(error);
    return false;
  }
}
