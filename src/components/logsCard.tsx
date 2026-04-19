export default function LogsCard({ logId, logDate, content }: {
  logId: string, logDate: string,
  content: string
}) {
  const processContent = content.toString();
  let date;
  try {
    date = logDate.slice(0, logDate.indexOf(' '));
  } catch {
    console.log("date is empty  ")
    date = logDate;
  }

  return (
    <div>
      <div className="w-full max-w-2xl bg-gruvbox-bg-medium rounded-lg border border-gruvbox-gray-light p-5 ">
        {/* <h1 className="text-2xl font-bold text-gruvbox-yellow"> */}
        {/*   {logId} */}
        {/* </h1> */}

        <p className="font-bold text-2xl mb-2 text-gruvbox-aqua-dim">
          {date}
        </p>

        <div
          className="font-light text-lg md:text-xl text-shadow-gruvbox-blue  "
          dangerouslySetInnerHTML={{ __html: processContent }} >

        </div>
      </div>

    </div>
  )
} 
