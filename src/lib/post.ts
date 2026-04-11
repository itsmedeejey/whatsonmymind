import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm"

type postMeta = {
  slug: string;
  id: string;
  description: string;
  date: string;
  tags?: string[];
};

const postsDirectory = path.join(process.cwd(), "blogs", "contents");

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(gfm)
    .use(html)
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    meta: data,
    contentHtml,
  };
}

export function getAllPostsMeta(): postMeta[] {
  const files = fs.readdirSync(postsDirectory);

  return files.map((file) => {
    const fullPath = path.join(postsDirectory, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(fileContents);

    return {
      slug: file.replace(".md", ""),
      ...data as Omit<postMeta, "slug">,
    };
  }).sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;

    return dateB - dateA;
  });
}

export function getAllSlugs() {
  return fs.readdirSync(postsDirectory).map((file) =>
    file.replace(".md", "")
  );
}
