export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-2 text-2xl font-semibold">{title}</h1>
      <p className="max-w-md text-sm text-neutral-500">This module is under active development and will be available in the next release.</p>
    </div>
  );
}
