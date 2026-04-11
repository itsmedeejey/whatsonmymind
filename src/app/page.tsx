import { getAllPostsMeta } from "@/lib/post";
import Link from "next/link";
import BlogCard from "@/components/blogCards";
import { Posts } from "@/types/posts.type";

export default function Home() {
  const posts: Posts = getAllPostsMeta();

  return (
    <div className="flex flex-col min-h-screen text-white p-5 md:p-20 items-start md:items-center">
      <div className="flex flex-col gap-5 overflow-x-hidden">

        {posts.map((post) => (
          <div key={post.slug} className="">
            <Link href={`/blogs/${post.slug}`}>
              <BlogCard postId={post.id} postDate={post.date} postDesc={post.description}></BlogCard>
            </Link>
          </div>
        ))}

      </div>
    </div >
  );
}
