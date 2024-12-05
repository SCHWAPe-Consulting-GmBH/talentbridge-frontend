export default function AboutCoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="bg2 background-style px-[50px] bg-background overflow-auto">{children}</main>;
}