import { useEffect } from "react";
import { MedicalTest } from "@/data/doctors";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Volume2, MapPin, Clock, DoorOpen, Building2 } from "lucide-react";
import { speak, stopSpeaking } from "@/lib/tts";
import { Lang, t } from "@/lib/i18n";

interface Props {
  test: MedicalTest;
  lang: Lang;
  onBack: () => void;
}

export const buildTestMessage = (test: MedicalTest, lang: Lang) => {
  if (lang === "hi") {
    return `${test.name_hi} की जांच कक्ष ${test.room}, ${test.floor_hi} पर उपलब्ध है, समय ${test.timings_hi}। दिशा: ${test.directions_hi}`;
  }
  return `${test.name} is available in Room ${test.room}, ${test.floor}, from ${test.timings}. Directions: ${test.directions}`;
};

export const TestDetail = ({ test, lang, onBack }: Props) => {
  const message = buildTestMessage(test, lang);
  const name = lang === "hi" ? test.name_hi : test.name;
  const floor = lang === "hi" ? test.floor_hi : test.floor;
  const timings = lang === "hi" ? test.timings_hi : test.timings;
  const directions = lang === "hi" ? test.directions_hi : test.directions;

  useEffect(() => {
    speak(message, lang);
    return () => stopSpeaking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test.id, lang]);

  const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
    <div className="flex items-start gap-4 p-5 bg-accent/40 rounded-2xl">
      <div className="bg-primary text-primary-foreground p-3 rounded-xl shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm md:text-base text-muted-foreground font-medium">{label}</p>
        <p className="text-xl md:text-2xl font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in space-y-6">
      <Button onClick={onBack} variant="outline" size="lg" className="h-14 text-lg gap-2 rounded-2xl">
        <ArrowLeft className="w-6 h-6" /> {t(lang, "back")}
      </Button>

      <Card className="p-8 md:p-10 bg-gradient-card shadow-elevated rounded-3xl border-0">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-hero text-primary-foreground text-5xl mb-4 shadow-glow animate-pulse-glow">
            {test.icon}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">{name}</h2>
          <p className="text-xl md:text-2xl text-primary font-medium mt-2">{t(lang, "test")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <InfoRow icon={DoorOpen} label={t(lang, "room")} value={test.room} />
          <InfoRow icon={Building2} label={t(lang, "floor")} value={floor} />
          <InfoRow icon={Clock} label={t(lang, "timings")} value={timings} />
        </div>

        <div className="mt-4 p-6 bg-gradient-hero text-primary-foreground rounded-2xl shadow-soft">
          <div className="flex items-start gap-4">
            <MapPin className="w-8 h-8 shrink-0 mt-1" />
            <div>
              <p className="text-sm font-medium opacity-90">{t(lang, "directions")}</p>
              <p className="text-xl md:text-2xl font-semibold leading-snug">{directions}</p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => speak(message, lang)}
          size="lg"
          className="w-full mt-8 h-20 text-2xl gap-3 rounded-2xl bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-soft"
        >
          <Volume2 className="w-8 h-8" /> {t(lang, "speakAgain")}
        </Button>
      </Card>
    </div>
  );
};
