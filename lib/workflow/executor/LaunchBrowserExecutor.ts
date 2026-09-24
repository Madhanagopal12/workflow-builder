import { waitFor } from "@/lib/helper/waitFor";
import { Environment, ExecutionEnvironment } from "@/types/executor";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/LaunchBrowserTask";

export async function LanuchBrowserExecutor(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>,
): Promise<boolean> {
  const websiteUrl = environment.getInput("Website Url");
  console.log("@@@ WEBSITE Url: ", websiteUrl);
  try {
    const browser = await puppeteer.launch({
      headless: false, // for testing
    });
    environment.setBrowser(browser);
    const page = await browser.newPage();
    await page.goto(websiteUrl);
    environment.setPage(page);
    return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
