import { cn } from "@/lib/utils";

export function MainLayout({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("rounded-xl bg-white border border-gray-200 ", className)}
    >
      {children}
    </div>
  );
}
