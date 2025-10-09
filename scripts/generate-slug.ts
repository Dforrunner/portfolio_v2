#!/usr/bin/env tsx
import readline from "readline";
import clipboardy from "clipboardy";

// Utility to convert a string into a URL-friendly slug
function slugify(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // remove special characters
    .replace(/\s+/g, "-")         // replace spaces with hyphens
    .replace(/-+/g, "-");         // collapse multiple hyphens
}

// Prompt user for input
function promptUser(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// Main
async function main() {
  const title = await promptUser("Enter the blog post title: ");
  if (!title) {
    console.error("❌ Title cannot be empty");
    process.exit(1);
  }

  const slug = slugify(title);
  await clipboardy.write(slug);

  console.log(`✅ Slug generated: ${slug}`);
  console.log("📋 Copied to clipboard!");
}

main();
