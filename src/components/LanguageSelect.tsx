import { Card } from "@/components/ui/card";
import { Lang } from "@/lib/i18n";
import { Hospital, Languages } from "lucide-react";

interface Props {
  onSelect: (lang: Lang) => void;
}

export const LanguageSelect = ({ onSelect }: Props) => {
  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-10">
        <div className="bg-gradient-hero text-primary-foreground p-4 rounded-3xl shadow-glow">
          <Hospital className="w-12 h-12" />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">MediFind</h1>
          <p className="text-lg text-muted-foreground">मेडीफाइंड कियोस्क</p>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6 text-muted-foreground">
        <Languages className="w-6 h-6" />
        <p className="text-xl md:text-2xl font-medium">Choose your language / अपनी भाषा चुनें</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
        <Card
          onClick={() => onSelect("en")}
          className="p-10 cursor-pointer hover:shadow-elevated hover:-translate-y-2 transition-smooth bg-gradient-card border-0 shadow-soft rounded-3xl text-center"
        >
          <div className="text-7xl mb-4">🇬🇧</div>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground">English</h3>
          <p className="text-base text-muted-foreground mt-2">Continue in English</p>
        </Card>
        <Card
          onClick={() => onSelect("hi")}
          className="p-10 cursor-pointer hover:shadow-elevated hover:-translate-y-2 transition-smooth bg-gradient-card border-0 shadow-soft rounded-3xl text-center"
        >
          <div className="text-7xl mb-4">🇮🇳</div>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground">हिंदी</h3>
          <p className="text-base text-muted-foreground mt-2">हिंदी में जारी रखें</p>
        </Card>
      </div>
    </div>
  );
};
