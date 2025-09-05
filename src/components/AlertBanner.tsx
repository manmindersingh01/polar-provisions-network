import { Triangle as AlertTriangle, X, Info, Check as CheckCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type AlertType = "warning" | "error" | "info" | "success";

interface AlertBannerProps {
  type: AlertType;
  message: string;
  className?: string;
  dismissible?: boolean;
}

export function AlertBanner({
  type,
  message,
  className,
  dismissible = true
}: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const getAlertClass = () => {
    switch (type) {
      case "warning":
        return "alert-warning";
      case "error":
        return "alert-error";
      case "info":
        return "alert-info";
      case "success":
        return "alert-success";
      default:
        return "alert-info";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "warning":
      case "error":
        return <AlertTriangle className="h-5 w-5" />;
      case "info":
        return <Info className="h-5 w-5" />;
      case "success":
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  return (
    <div className={cn("flex items-center", getAlertClass(), className)}>
      <div className="mr-3 flex-shrink-0">{getIcon()}</div>
      <div className="flex-grow">{message}</div>
      {dismissible &&
      <button
        onClick={() => setDismissed(true)}
        className="ml-3 flex-shrink-0 rounded-full p-1 hover:bg-black/10">

          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </button>
      }
    </div>);

}