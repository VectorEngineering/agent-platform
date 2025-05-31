import PageIllustration from "@/components/page-illustration";

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grow">
      <PageIllustration />
      <div className="bg-white min-h-screen py-[12%]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">{children}</div>
        </div>
      </div>
    </main>
  );
}
