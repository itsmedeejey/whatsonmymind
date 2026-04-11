
export default function BlogCard({ postId, postDate, postDesc }: { postId: string, postDate: string, postDesc: string }) {

  const date = postDate.slice(0, postDate.indexOf(' '));
  return (
    <div>
      <div className="w-full max-w-2xl bg-gray-700 rounded-2xl border border-gray-500 p-5">
        <h1 className="text-2xl font-bold">
          {postId}
        </h1>

        <p className="font-thin text-sm mb-2">
          {date}
        </p>

        <p className="font-light text-gray-300 line-clamp-3">
          {postDesc}
        </p>
      </div>

    </div>
  )
} 
