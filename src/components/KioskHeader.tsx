import { Hospital, Languages } from "lucide-react";
import { Lang, t } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

interface Props {
  lang: Lang;
  onChangeLanguage?: () => void;
}

export const KioskHeader = ({ lang, onChangeLanguage }: Props) => (
  <header className="bg-gradient-hero text-primary-foreground py-6 px-8 shadow-elevated">
    <div className="max-w-6xl mx-auto flex items-center gap-4">
      <div className="bg-primary-foreground/20 p-3 rounded-2xl backdrop-blur-sm">
        <Hospital className="w-10 h-10" />
      </div>
      <div className="flex-1">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{t(lang, "appTitle")}</h1>
        <p className="text-primary-foreground/90 text-base md:text-lg">{t(lang, "appSubtitle")}</p>
      </div>
      {onChangeLanguage && (
        <Button
          onClick={onChangeLanguage}
          variant="secondary"
          size="lg"
          className="h-12 gap-2 rounded-2xl bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0 backdrop-blur-sm"
        >
          <Languages className="w-5 h-5" />
          {lang === "en" ? "हिंदी" : "English"}
        </Button>
      )}
    </div>
  </header>
);
