import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WeatherCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  className?: string;
  critical?: boolean;
}

export function WeatherCard({
  title,
  value,
  unit,
  icon,
  className,
  critical = false,
}: WeatherCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden",
        critical
          ? "border-accent bg-accent/10 dark:bg-accent/5"
          : "bg-card",
        className
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle
          className={cn(
            "flex items-center text-lg font-medium",
            critical ? "text-accent-700 dark:text-accent-500" : ""
          )}
        >
          <span className="mr-2">{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline">
          <span
            className={cn(
              "text-3xl font-mono font-bold",
              critical ? "text-accent-700 dark:text-accent-500" : ""
            )}
          >
            {value}
          </span>
          {unit && (
            <span className="ml-1 text-lg text-muted-foreground">{unit}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}