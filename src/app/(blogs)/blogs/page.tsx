import { getAllPostsMeta } from "@/lib/post";
import Link from "next/link";
import BlogCard from "@/components/blogCards";
import { Posts } from "@/types/posts.type";
import NavCap from "@/components/navCap";

export default function Home() {
  const posts: Posts = getAllPostsMeta();

  return (
    <div>
      <div className="w-full flex items-center justify-center">
        <NavCap></NavCap>
      </div>
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
