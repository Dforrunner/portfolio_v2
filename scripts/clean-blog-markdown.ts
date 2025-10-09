#!/usr/bin/env tsx
import fs from "fs";
import path from "path";
import readline from "readline";

// Clean markdown content (preserves frontmatter)
function cleanMarkdown(content: string): string {
const match = content.match(/^(---\n[\s\S]*?\n---\n)?([\s\S]*)$/);
  const frontmatter = match?.[1] ?? "";
  let body = match?.[2] ?? content;

  // Remove inline citations [^1], [^note]
  body = body.replace(/\[\^[^\]]+\]/g, "");

  // Remove ALL footnote definitions [^n]: ... (single-line or consecutive)
  body = body.replace(/^\[\^\d+\]:.*$/gm, "");

  // Remove <span style="display:none">...</span>
  body = body.replace(/<span style="display:none">[\s\S]*?<\/span>/g, "");

  // Remove <div align="center">⁂</div>
  body = body.replace(/<div align="center">⁂<\/div>/g, "");
  
  // // Normalize multiple blank lines
  // body = body.replace(/\n{3,}/g, "\n\n").trim();

  return frontmatter + body + "\n";
}

// Process single markdown file
function processFile(filePath: string) {
  if (path.extname(filePath) !== ".md") return;

  const content = fs.readFileSync(filePath, "utf8");
  const cleaned = cleanMarkdown(content);

  const dirName = path.dirname(filePath);
  const baseName = path.basename(filePath);
  const outputDir = path.join(dirName, "_cleaned");

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  const outputPath = path.join(outputDir, baseName);
  fs.writeFileSync(outputPath, cleaned, "utf8");
  console.log(`✅ Cleaned and saved: ${outputPath}`);
}

//  process directory only one layer
function processDirectory(dirPath: string) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isFile() && path.extname(entry.name) === ".md") {
      processFile(fullPath);
    }
  }
}

// Prompt user for path
function promptUser(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question("Enter path to markdown file or directory: ", (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// Main
async function main() {
  const targetPath = await promptUser();

  if (!fs.existsSync(targetPath)) {
    console.error("❌ Path does not exist");
    process.exit(1);
  }

  const stats = fs.statSync(targetPath);
  if (stats.isFile()) {
    processFile(targetPath);
  } else if (stats.isDirectory()) {
    processDirectory(targetPath);
  } else {
    console.error("❌ Path is neither a file nor a directory");
    process.exit(1);
  }
}

main();
