import { Mic, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lang, t } from "@/lib/i18n";

interface Props {
  lang: Lang;
  status: "listening" | "thinking" | "result" | "error";
  message?: string;
  onClose: () => void;
}

export const VoiceOverlay = ({ lang, status, message, onClose }: Props) => {
  const heading =
    status === "listening" ? t(lang, "listening") :
    status === "error" ? t(lang, "notFound") :
    status === "thinking" ? "..." : "";

  return (
    <div className="fixed inset-0 z-50 bg-foreground/70 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
      <div className="bg-gradient-card rounded-3xl shadow-elevated p-10 max-w-xl w-full text-center relative">
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 rounded-full h-12 w-12"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </Button>

        <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-hero text-primary-foreground shadow-glow mb-6 ${status === "listening" ? "animate-pulse-glow" : ""}`}>
          <Mic className="w-16 h-16" />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{heading}</h2>
        {message && <p className="text-lg md:text-xl text-muted-foreground">{message}</p>}
      </div>
    </div>
  );
};
