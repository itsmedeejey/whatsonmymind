export default function LogsCard({ logDate, content }: {
  logDate: string,
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
    <div >
      <div className="w-sm md:w-3xl  justify-start  bg-gruvbox-bg-medium rounded-lg border-b border-gruvbox-gray-light p-5 mb-3 ">
        <div className="prose  overflow-x-auto prose-invert [&_li:has(input[type='checkbox'])]:list-none">

          <p className="font-mono text-2xl mb-2 text-gruvbox-aqua-dim">
            {date}
          </p>

          <div
            className="font-light text-lg md:text-xl text-shadow-gruvbox-blue  "
            dangerouslySetInnerHTML={{ __html: processContent }} >

          </div>

        </div>
      </div>

    </div>
  )
} 
