export function waitFor(ms: number) {
  return new Promise((reslove) => setTimeout(reslove, ms));
}
