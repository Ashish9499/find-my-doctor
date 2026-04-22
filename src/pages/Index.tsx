import { useMemo, useState } from "react";
import { KioskHeader } from "@/components/KioskHeader";
import { DoctorDetail } from "@/components/DoctorDetail";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Doctor, doctors, specialties } from "@/data/doctors";
import { Search, Stethoscope, User, ArrowLeft } from "lucide-react";
import { stopSpeaking } from "@/lib/tts";

type View = "home" | "byName" | "bySpecialty" | "specialtyDoctors" | "detail";

const Index = () => {
  const [view, setView] = useState<View>("home");
  const [query, setQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const goHome = () => {
    stopSpeaking();
    setView("home");
    setQuery("");
    setSelectedSpecialty(null);
    setSelectedDoctor(null);
  };

  const filteredByName = useMemo(
    () => doctors.filter((d) => d.name.toLowerCase().includes(query.toLowerCase()) || d.specialty.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const filteredBySpecialty = useMemo(
    () => (selectedSpecialty ? doctors.filter((d) => d.specialty === selectedSpecialty) : []),
    [selectedSpecialty]
  );

  const openDoctor = (d: Doctor) => {
    setSelectedDoctor(d);
    setView("detail");
  };

  const BackBtn = ({ onClick }: { onClick: () => void }) => (
    <Button onClick={onClick} variant="outline" size="lg" className="h-14 text-lg gap-2 rounded-2xl">
      <ArrowLeft className="w-6 h-6" /> Back
    </Button>
  );

  const DoctorCard = ({ d }: { d: Doctor }) => (
    <Card
      onClick={() => openDoctor(d)}
      className="p-6 cursor-pointer hover:shadow-elevated hover:-translate-y-1 transition-smooth bg-gradient-card border-0 shadow-soft rounded-2xl"
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-hero text-primary-foreground flex items-center justify-center text-2xl font-bold shrink-0">
          {d.name.split(" ").slice(-1)[0][0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xl md:text-2xl font-bold text-foreground truncate">{d.name}</p>
          <p className="text-base md:text-lg text-primary font-medium">{d.specialty}</p>
          <p className="text-sm text-muted-foreground">Room {d.room} • {d.floor}</p>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-soft">
      <KioskHeader />
      <main className="max-w-6xl mx-auto p-6 md:p-10">
        {view === "home" && (
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground mb-3">How can we help you today?</h2>
            <p className="text-center text-lg md:text-xl text-muted-foreground mb-10">Tap an option below to find your doctor</p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card
                onClick={() => setView("byName")}
                className="p-10 cursor-pointer hover:shadow-elevated hover:-translate-y-2 transition-smooth bg-gradient-card border-0 shadow-soft rounded-3xl text-center"
              >
                <div className="inline-flex w-24 h-24 rounded-3xl bg-gradient-hero text-primary-foreground items-center justify-center mb-6 shadow-glow">
                  <User className="w-12 h-12" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Search by Doctor Name</h3>
                <p className="text-base md:text-lg text-muted-foreground">Find a specific doctor quickly</p>
              </Card>
              <Card
                onClick={() => setView("bySpecialty")}
                className="p-10 cursor-pointer hover:shadow-elevated hover:-translate-y-2 transition-smooth bg-gradient-card border-0 shadow-soft rounded-3xl text-center"
              >
                <div className="inline-flex w-24 h-24 rounded-3xl bg-secondary text-secondary-foreground items-center justify-center mb-6 shadow-glow">
                  <Stethoscope className="w-12 h-12" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Search by Specialty</h3>
                <p className="text-base md:text-lg text-muted-foreground">Browse by medical category</p>
              </Card>
            </div>
          </div>
        )}

        {view === "byName" && (
          <div className="animate-fade-in space-y-6">
            <BackBtn onClick={goHome} />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Find a Doctor</h2>
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
              <Input
                autoFocus
                placeholder="Type doctor name or specialty..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-16 md:h-20 text-xl md:text-2xl pl-16 rounded-2xl border-2 shadow-soft"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {filteredByName.map((d) => <DoctorCard key={d.id} d={d} />)}
            </div>
            {filteredByName.length === 0 && (
              <p className="text-center text-lg text-muted-foreground py-10">No doctors found.</p>
            )}
          </div>
        )}

        {view === "bySpecialty" && (
          <div className="animate-fade-in space-y-6">
            <BackBtn onClick={goHome} />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Choose a Specialty</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {specialties.map((s) => (
                <Card
                  key={s.name}
                  onClick={() => { setSelectedSpecialty(s.name); setView("specialtyDoctors"); }}
                  className="p-6 cursor-pointer hover:shadow-elevated hover:-translate-y-1 transition-smooth bg-gradient-card border-0 shadow-soft rounded-2xl text-center"
                >
                  <div className="text-5xl mb-3">{s.icon}</div>
                  <p className="text-lg md:text-xl font-bold text-foreground">{s.name}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {view === "specialtyDoctors" && (
          <div className="animate-fade-in space-y-6">
            <BackBtn onClick={() => setView("bySpecialty")} />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{selectedSpecialty}</h2>
            <p className="text-lg text-muted-foreground">Tap a doctor to see details</p>
            <div className="grid md:grid-cols-2 gap-4">
              {filteredBySpecialty.map((d) => <DoctorCard key={d.id} d={d} />)}
            </div>
            {filteredBySpecialty.length === 0 && (
              <p className="text-center text-lg text-muted-foreground py-10">No doctors available.</p>
            )}
          </div>
        )}

        {view === "detail" && selectedDoctor && (
          <DoctorDetail doctor={selectedDoctor} onBack={() => { stopSpeaking(); setView(selectedSpecialty ? "specialtyDoctors" : "byName"); }} />
        )}
      </main>
    </div>
  );
};

export default Index;
