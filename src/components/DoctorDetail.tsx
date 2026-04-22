import { useEffect } from "react";
import { Doctor } from "@/data/doctors";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Volume2, MapPin, Clock, DoorOpen, Building2, Stethoscope } from "lucide-react";
import { speak, stopSpeaking } from "@/lib/tts";

interface Props {
  doctor: Doctor;
  onBack: () => void;
}

export const DoctorDetail = ({ doctor, onBack }: Props) => {
  const message = `${doctor.name} is available in Room ${doctor.room}, ${doctor.floor}, between ${doctor.timings}. Directions: ${doctor.directions}`;

  useEffect(() => {
    speak(message);
    return () => stopSpeaking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctor.id]);

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
        <ArrowLeft className="w-6 h-6" /> Back
      </Button>

      <Card className="p-8 md:p-10 bg-gradient-card shadow-elevated rounded-3xl border-0">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-hero text-primary-foreground text-4xl font-bold mb-4 shadow-glow animate-pulse-glow">
            {doctor.name.split(" ").slice(-1)[0][0]}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">{doctor.name}</h2>
          <p className="text-xl md:text-2xl text-primary font-medium mt-2">{doctor.specialty}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <InfoRow icon={Stethoscope} label="Specialty" value={doctor.specialty} />
          <InfoRow icon={DoorOpen} label="Room Number" value={doctor.room} />
          <InfoRow icon={Building2} label="Floor" value={doctor.floor} />
          <InfoRow icon={Clock} label="Available Timings" value={doctor.timings} />
        </div>

        <div className="mt-4 p-6 bg-gradient-hero text-primary-foreground rounded-2xl shadow-soft">
          <div className="flex items-start gap-4">
            <MapPin className="w-8 h-8 shrink-0 mt-1" />
            <div>
              <p className="text-sm font-medium opacity-90">Directions</p>
              <p className="text-xl md:text-2xl font-semibold leading-snug">{doctor.directions}</p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => speak(message)}
          size="lg"
          className="w-full mt-8 h-20 text-2xl gap-3 rounded-2xl bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-soft"
        >
          <Volume2 className="w-8 h-8" /> Speak Again
        </Button>
      </Card>
    </div>
  );
};
