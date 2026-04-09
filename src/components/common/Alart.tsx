import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AlertDestructiveProps {
  title: string,
  text: string,
  isEror: boolean
}

export function AlertCoponant({ text, title, isEror }: AlertDestructiveProps) {
  return (
    <div className=" fixed top-5 left-1/2 -translate-x-1/2  rounded-2xl z-[9999] ">
      <Alert variant="destructive" className={`max-w-lg bg-transparent  border-red-600 `}>
        <AlertCircleIcon />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{text}</AlertDescription>
      </Alert>
    </div>
  );
}
