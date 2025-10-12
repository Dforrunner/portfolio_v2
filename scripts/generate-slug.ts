#!/usr/bin/env tsx
import readline from "readline";
import clipboardy from "clipboardy";

// Utility to convert a string into a URL-friendly slug
function slugify(title: string): string {
  return title
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
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
