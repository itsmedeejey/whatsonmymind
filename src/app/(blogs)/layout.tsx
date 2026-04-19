export default function Blogslayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen   flex flex-col bg-gruvbox-bg text-gruvbox-fg p-5 md:p-20 items-start md:items-center">
      {children}
    </div>
  );
}
