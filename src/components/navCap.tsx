import Link from "next/link"

export default function NavCap() {



  return (<div className="flex flex-row gap-2.5 m-5">

    <Link href={"/blogs"} >
      <div className="px-4 py-1 border border-gruvbox-gray-light rounded-2xl cursor-pointer hover:bg-gruvbox-fg hover:text-gruvbox-red-dim">
        BLOGS
      </div>
    </Link>

    <Link href={"/logs"} >
      <div className="px-4 py-1 border border-gruvbox-gray-light rounded-2xl cursor-pointer  hover:bg-gruvbox-fg hover:text-gruvbox-red-dim" >
        LOGS
      </div>
    </Link>

  </div>
  )
}
