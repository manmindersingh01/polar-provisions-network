import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  className,
  children,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 border-b border-border pb-5 pt-8",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-shadow text-3xl font-bold tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="mt-1 text-lg text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {children && <div className="mt-4 md:mt-0">{children}</div>}
        </div>
      </div>
    </div>
  );
}