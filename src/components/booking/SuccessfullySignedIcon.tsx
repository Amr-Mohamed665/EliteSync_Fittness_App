import { Check } from "lucide-react";

const SuccessfullySignedIcon = ({ className }: { className?: string }) => {
  return (
    <div
      className={`bg-green-500 text-white p-4 rounded-full w-fit mx-auto ${className}`}
    >
      <Check size={48} />
    </div>
  );
};

export default SuccessfullySignedIcon;
