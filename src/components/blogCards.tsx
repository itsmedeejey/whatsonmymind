
export default function BlogCard({ postId, postDate, postDesc }: { postId: string, postDate: string, postDesc: string }) {
  let date;
  try {
    date = postDate.slice(0, postDate.indexOf(' '));
  } catch {
    console.log("date is empty  ")
    date = postDate;
  }

  return (
    <div>
      <div className="w-full max-w-2xl bg-gruvbox-bg-medium rounded-2xl border border-gruvbox-gray-dark p-5">
        <h1 className="text-2xl font-bold text-shadow-gruvbox-gray-light">
          {postId}
        </h1>

        <p className="font-thin text-sm mb-2 text-gruvbox-purple-dim">
          {date}
        </p>

        <p className="font-light text-gruvbox-gray-light line-clamp-3">
          {postDesc}
        </p>
      </div>

    </div>
  )
} 
