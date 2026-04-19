import { getPostBySlug, getAllSlugs } from "@/lib/post";


export async function generateStaticParams() {
  const slugs: string[] = getAllSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post, datetime: string, date: string;
  try {
    post = await getPostBySlug(slug);
    datetime = post.meta.date;
    date = datetime.slice(0, datetime.indexOf(' '));
  } catch {
    return (<div className="flex text-gruvbox-fg items-center text-4xl ">

      <h1 >404 this post is unavailable</h1>

    </div>
    )

  }
  return (
    <article className="prose md:text-[21px] overflow-x-auto max-w-full min-w-0 prose-invert [&_li:has(input[type='checkbox'])]:list-none">
      <h1 className="text-gruvbox-aqua-dim">{post.meta.id}</h1>
      <h2 className="text-gruvbox-blue">{date}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );

}
