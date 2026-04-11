export default function Blogslayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen   flex flex-col bg-gray-800 text-white p-10 md:p-20 items-start md:items-center">
      {children}
    </div>
  );
}
