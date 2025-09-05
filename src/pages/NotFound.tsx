import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <Compass className="h-24 w-24 text-muted-foreground mb-6" />
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The coordinates you're looking for don't seem to exist on our map. 
        Let's navigate back to base camp.
      </p>
      <Link to="/">
        <Button>
          Return to Home Base
        </Button>
      </Link>
    </div>
  );
}