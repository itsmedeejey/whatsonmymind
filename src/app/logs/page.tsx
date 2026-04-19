
import { getAllLogs, LogPostType } from "@/lib/logs";
import LogsCard from "@/components/logsCard";
import NavCap from "@/components/navCap";

export default async function Logs() {
  let logs: LogPostType;

  try {
    logs = await getAllLogs();
  } catch {
    return (
      <div className="flex text-gruvbox-fg items-center text-4xl ">
        <h1>404 this page is unavailable</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10 p-5">
      <NavCap></NavCap>

      {logs.map((log) => {

        return (
          <LogsCard
            key={log.meta.id}
            logId={log.meta.id}
            logDate={log.meta.date}
            content={log.contentHtml} />
        );
      })}
    </div>
  );
}

