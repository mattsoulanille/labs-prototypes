import { toMermaid } from "@google-labs/graph-runner";
import { readFile, writeFile } from "fs/promises";

const json = JSON.parse(await readFile("./graphs/coffee-bot.json", "utf-8"));
const mermaid = toMermaid(json);

await writeFile(
  "./docs/coffee-bot.md",
  `
# Coffe Bot

\`\`\`mermaid
${mermaid}
\`\`\`
`
);
