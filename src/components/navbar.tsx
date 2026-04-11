import Link from "next/link"
export default function NavBar() {
  return (<div className="w-full h-15 flex flex-row  p-5 bg-gray-900 text-white">

    <div className="flex w-full items-center justify-start">
      <Link href={"/"} >
        <div className="text-md md:text-3xl font-serif font-bold">
          [Whats On My Mind]
        </div>
      </Link>
    </div>

    <div className="hidden md:flex flex-row items-center justify-end gap-5">
      <div className="font-bold">
        <Link href={"/blogs"}>Blogs</Link>
      </div>
      <div className="font-bold">
        <Link href={"https://github.com/itsmedeejey"}>github</Link>
      </div>
      <div className="font-bold">
        <Link href={"https://www.linkedin.com/in/dhanjyoti-das/"}>linkedIn</Link>
      </div>
    </div>


  </div>)
}
