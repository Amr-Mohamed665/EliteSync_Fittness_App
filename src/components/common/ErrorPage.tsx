import { AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface TrainerErrorStateProps {
  message?: string;
}

const Error = ({
  message = "Something went wrong while loading the trainer profile.",
}: TrainerErrorStateProps) => {
  return (
    <div className="max-w-md mx-auto section-padding py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
        <AlertTriangle size={28} className="text-destructive" />
      </div>
      <h2 className="text-xl font-bold mb-2">Failed to load</h2>
      <p className="text-sm text-muted-foreground mb-6">{message}</p>
      <Link to={"/"}>
        <Button variant="outline">Back To Home</Button>
      </Link>
    </div>
  );
};

export default Error;
