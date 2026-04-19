import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

// Define the shape of the metadata extracted by gray-matter
type LogMeta = {
  id: string;
  date: string;
  tags?: string[];
};

// Define the shape of the final post object
type LogPost = {
  slug: string;
  meta: LogMeta;
  contentHtml: string;
};
export type LogPostType = LogPost[];

const postsDirectory = path.join(process.cwd(), "logs");

export async function getAllLogs(): Promise<LogPost[]> {
  const files = fs.readdirSync(postsDirectory);

  const posts = await Promise.all(
    files.map(async (file) => {
      const fullPath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);
      const processedContent = await remark()
        .use(gfm)
        .use(html)
        .process(content);

      const contentHtml = processedContent.toString();

      return {
        slug: file.replace(/\.md$/, ""), // Using regex ensures we only replace the extension
        meta: data as LogMeta,
        contentHtml,
      };
    })
  );

  return posts.sort((a, b) => {
    const dateA = a.meta.date ? new Date(a.meta.date).getTime() : 0;
    const dateB = b.meta.date ? new Date(b.meta.date).getTime() : 0;

    return dateB - dateA;
  });
}

