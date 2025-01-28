import { cn } from "@/lib/utils";

export function MainLayout({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="w-full h-full">
      <div
        className={cn(
          "rounded-xl bg-white border border-gray-200 max-w-2xl mt-12 mx-auto  py-8 flex flex-col gap-14 items-center",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
