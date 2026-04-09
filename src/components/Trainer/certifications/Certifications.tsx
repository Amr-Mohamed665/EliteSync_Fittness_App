import type { Trainer } from "@/lib/types/Trainer/TrainerTypes";
import { Check, Download } from "lucide-react";

interface Props {
  trainer: Trainer;
}

const Certifications = ({ trainer }: Props) => {
  return (
    <div className="mb-12 max-w-5xl mx-auto p-5">
      <h3 className="text-2xl font-bold text-center mb-2">Certifications</h3>
      <p className="text-sm text-muted-foreground text-center mb-6">
        Verified qualifications that demonstrate professional coaching expertise
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        {trainer.certifications.map((cert) => (
          <a
            key={cert.id}
            href={cert.file_path}
            target="_blank"
            rel="noopener noreferrer"
            download={cert.file_path}
            className="bg-card border border-border rounded-lg p-3"
          >
            <div className="w-16 h-16 bg-secondary rounded-lg mx-auto mb-3 flex items-center justify-center">
              <Check size={24} className="text-green-300" />
            </div>
            <p className=" text-sm mb-3">{cert.certificate_name}</p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {cert.organization}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{cert.year}</p>
            </div>
            <p className="text-sm text-primary mt-2 flex items-center justify-center gap-1">
              <Download size={12} /> Download
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
