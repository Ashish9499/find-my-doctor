import { useMemo, useState } from "react";
import { KioskHeader } from "@/components/KioskHeader";
import { DoctorDetail, buildDoctorMessage } from "@/components/DoctorDetail";
import { TestDetail, buildTestMessage } from "@/components/TestDetail";
import { LanguageSelect } from "@/components/LanguageSelect";
import { VoiceOverlay } from "@/components/VoiceOverlay";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Doctor, doctors, specialties, MedicalTest, medicalTests } from "@/data/doctors";
import { Search, Stethoscope, User, ArrowLeft, Mic, FlaskConical } from "lucide-react";
import { speak, stopSpeaking } from "@/lib/tts";
import { Lang, t } from "@/lib/i18n";
import { isRecognitionSupported, listenOnce } from "@/lib/speech-recognition";
import { toast } from "@/hooks/use-toast";

type View = "home" | "byName" | "bySpecialty" | "specialtyDoctors" | "detail" | "tests" | "testDetail";

const matchDoctorOrTest = (transcript: string): { doctor?: Doctor; test?: MedicalTest } => {
  const q = transcript.toLowerCase().trim();
  if (!q) return {};

  // Try direct doctor match
  const doc = doctors.find((d) =>
    d.name.toLowerCase().includes(q) ||
    d.name_hi.includes(transcript.trim()) ||
    q.includes(d.name.toLowerCase().replace("dr. ", "").split(" ")[0])
  );
  if (doc) return { doctor: doc };

  // Specialty match -> first doctor of that specialty
  const sp = specialties.find((s) =>
    q.includes(s.name.toLowerCase()) || transcript.includes(s.name_hi)
  );
  if (sp) {
    const d = doctors.find((d) => d.specialty === sp.name);
    if (d) return { doctor: d };
  }

  // Test match
  const test = medicalTests.find((tt) =>
    q.includes(tt.name.toLowerCase()) || transcript.includes(tt.name_hi)
  );
  if (test) return { test };

  return {};
};

const Index = () => {
  const [lang, setLang] = useState<Lang | null>(null);
  const [view, setView] = useState<View>("home");
  const [query, setQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedTest, setSelectedTest] = useState<MedicalTest | null>(null);
  const [voiceStatus, setVoiceStatus] = useState<null | "listening" | "thinking" | "result" | "error">(null);
  const [voiceMessage, setVoiceMessage] = useState<string>("");

  const goHome = () => {
    stopSpeaking();
    setView("home");
    setQuery("");
    setSelectedSpecialty(null);
    setSelectedDoctor(null);
    setSelectedTest(null);
  };

  const filteredByName = useMemo(() => {
    if (!lang) return [];
    const q = query.toLowerCase();
    return doctors.filter((d) =>
      d.name.toLowerCase().includes(q) ||
      d.specialty.toLowerCase().includes(q) ||
      d.name_hi.includes(query) ||
      d.specialty_hi.includes(query)
    );
  }, [query, lang]);

  const filteredBySpecialty = useMemo(
    () => (selectedSpecialty ? doctors.filter((d) => d.specialty === selectedSpecialty) : []),
    [selectedSpecialty]
  );

  const filteredTests = useMemo(() => {
    const q = query.toLowerCase();
    return medicalTests.filter((tt) => tt.name.toLowerCase().includes(q) || tt.name_hi.includes(query));
  }, [query]);

  const openDoctor = (d: Doctor) => {
    setSelectedDoctor(d);
    setView("detail");
  };

  const openTest = (tt: MedicalTest) => {
    setSelectedTest(tt);
    setView("testDetail");
  };

  const handleVoice = async () => {
    if (!lang) return;
    if (!isRecognitionSupported()) {
      toast({
        title: lang === "hi" ? "वॉइस समर्थित नहीं" : "Voice not supported",
        description: lang === "hi" ? "कृपया Chrome जैसे ब्राउज़र का उपयोग करें।" : "Please use a browser like Chrome.",
      });
      return;
    }

    // Speak prompt then listen
    const prompt = lang === "hi"
      ? "कृपया डॉक्टर का नाम या विशेषज्ञता बोलें"
      : "Please say the doctor name or specialty";
    speak(prompt, lang);
    setVoiceStatus("listening");
    setVoiceMessage(prompt);

    // Wait briefly so prompt is heard before mic opens
    await new Promise((r) => setTimeout(r, 1800));
    stopSpeaking();

    try {
      const { transcript } = await listenOnce(lang);
      setVoiceStatus("thinking");
      setVoiceMessage(transcript);

      const { doctor, test } = matchDoctorOrTest(transcript);
      if (doctor) {
        const msg = buildDoctorMessage(doctor, lang);
        speak(msg, lang);
        setVoiceStatus("result");
        setVoiceMessage(msg);
        setTimeout(() => setVoiceStatus(null), 8000);
      } else if (test) {
        const msg = buildTestMessage(test, lang);
        speak(msg, lang);
        setVoiceStatus("result");
        setVoiceMessage(msg);
        setTimeout(() => setVoiceStatus(null), 8000);
      } else {
        const notFound = t(lang, "notFound");
        speak(notFound, lang);
        setVoiceStatus("error");
        setVoiceMessage(notFound);
        setTimeout(() => setVoiceStatus(null), 4000);
      }
    } catch {
      const notFound = t(lang, "notFound");
      speak(notFound, lang);
      setVoiceStatus("error");
      setVoiceMessage(notFound);
      setTimeout(() => setVoiceStatus(null), 4000);
    }
  };

  if (!lang) {
    return <LanguageSelect onSelect={(l) => setLang(l)} />;
  }

  const BackBtn = ({ onClick }: { onClick: () => void }) => (
    <Button onClick={onClick} variant="outline" size="lg" className="h-14 text-lg gap-2 rounded-2xl">
      <ArrowLeft className="w-6 h-6" /> {t(lang, "back")}
    </Button>
  );

  const DoctorCard = ({ d }: { d: Doctor }) => {
    const name = lang === "hi" ? d.name_hi : d.name;
    const sp = lang === "hi" ? d.specialty_hi : d.specialty;
    const fl = lang === "hi" ? d.floor_hi : d.floor;
    return (
      <Card
        onClick={() => openDoctor(d)}
        className="p-6 cursor-pointer hover:shadow-elevated hover:-translate-y-1 transition-smooth bg-gradient-card border-0 shadow-soft rounded-2xl"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-hero text-primary-foreground flex items-center justify-center text-2xl font-bold shrink-0">
            {d.name.split(" ").slice(-1)[0][0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xl md:text-2xl font-bold text-foreground truncate">{name}</p>
            <p className="text-base md:text-lg text-primary font-medium">{sp}</p>
            <p className="text-sm text-muted-foreground">{t(lang, "room")} {d.room} • {fl}</p>
          </div>
        </div>
      </Card>
    );
  };

  const TestCard = ({ tt }: { tt: MedicalTest }) => {
    const name = lang === "hi" ? tt.name_hi : tt.name;
    const fl = lang === "hi" ? tt.floor_hi : tt.floor;
    return (
      <Card
        onClick={() => openTest(tt)}
        className="p-6 cursor-pointer hover:shadow-elevated hover:-translate-y-1 transition-smooth bg-gradient-card border-0 shadow-soft rounded-2xl"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-secondary text-secondary-foreground flex items-center justify-center text-3xl shrink-0">
            {tt.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xl md:text-2xl font-bold text-foreground truncate">{name}</p>
            <p className="text-sm text-muted-foreground">{t(lang, "room")} {tt.room} • {fl}</p>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <KioskHeader lang={lang} onChangeLanguage={() => { stopSpeaking(); setLang(null); goHome(); }} />
      <main className="max-w-6xl mx-auto p-6 md:p-10">
        {view === "home" && (
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground mb-3">{t(lang, "homeHeading")}</h2>
            <p className="text-center text-lg md:text-xl text-muted-foreground mb-8">{t(lang, "homeSub")}</p>

            <div className="flex justify-center mb-8">
              <Button
                onClick={handleVoice}
                size="lg"
                className="h-20 px-10 text-2xl gap-3 rounded-2xl bg-gradient-hero text-primary-foreground shadow-glow hover:shadow-elevated transition-smooth"
              >
                <Mic className="w-8 h-8" /> {t(lang, "speakButton")}
              </Button>
            </div>
            <p className="text-center text-sm md:text-base text-muted-foreground mb-10">{t(lang, "speakHint")}</p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card
                onClick={() => { setQuery(""); setView("byName"); }}
                className="p-8 cursor-pointer hover:shadow-elevated hover:-translate-y-2 transition-smooth bg-gradient-card border-0 shadow-soft rounded-3xl text-center"
              >
                <div className="inline-flex w-20 h-20 rounded-3xl bg-gradient-hero text-primary-foreground items-center justify-center mb-5 shadow-glow">
                  <User className="w-10 h-10" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{t(lang, "searchByName")}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{t(lang, "searchByNameSub")}</p>
              </Card>
              <Card
                onClick={() => setView("bySpecialty")}
                className="p-8 cursor-pointer hover:shadow-elevated hover:-translate-y-2 transition-smooth bg-gradient-card border-0 shadow-soft rounded-3xl text-center"
              >
                <div className="inline-flex w-20 h-20 rounded-3xl bg-secondary text-secondary-foreground items-center justify-center mb-5 shadow-glow">
                  <Stethoscope className="w-10 h-10" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{t(lang, "searchBySpecialty")}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{t(lang, "searchBySpecialtySub")}</p>
              </Card>
              <Card
                onClick={() => { setQuery(""); setView("tests"); }}
                className="p-8 cursor-pointer hover:shadow-elevated hover:-translate-y-2 transition-smooth bg-gradient-card border-0 shadow-soft rounded-3xl text-center"
              >
                <div className="inline-flex w-20 h-20 rounded-3xl bg-accent text-accent-foreground items-center justify-center mb-5 shadow-glow">
                  <FlaskConical className="w-10 h-10" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{t(lang, "findTest")}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{t(lang, "findTestSub")}</p>
              </Card>
            </div>
          </div>
        )}

        {view === "byName" && (
          <div className="animate-fade-in space-y-6">
            <BackBtn onClick={goHome} />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t(lang, "findDoctor")}</h2>
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
              <Input
                autoFocus
                placeholder={t(lang, "typeDoctor")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-16 md:h-20 text-xl md:text-2xl pl-16 rounded-2xl border-2 shadow-soft"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {filteredByName.map((d) => <DoctorCard key={d.id} d={d} />)}
            </div>
            {filteredByName.length === 0 && (
              <p className="text-center text-lg text-muted-foreground py-10">{t(lang, "noDoctors")}</p>
            )}
          </div>
        )}

        {view === "bySpecialty" && (
          <div className="animate-fade-in space-y-6">
            <BackBtn onClick={goHome} />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t(lang, "chooseSpecialty")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {specialties.map((s) => (
                <Card
                  key={s.name}
                  onClick={() => { setSelectedSpecialty(s.name); setView("specialtyDoctors"); }}
                  className="p-6 cursor-pointer hover:shadow-elevated hover:-translate-y-1 transition-smooth bg-gradient-card border-0 shadow-soft rounded-2xl text-center"
                >
                  <div className="text-5xl mb-3">{s.icon}</div>
                  <p className="text-lg md:text-xl font-bold text-foreground">{lang === "hi" ? s.name_hi : s.name}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {view === "specialtyDoctors" && (
          <div className="animate-fade-in space-y-6">
            <BackBtn onClick={() => setView("bySpecialty")} />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {lang === "hi"
                ? specialties.find((s) => s.name === selectedSpecialty)?.name_hi
                : selectedSpecialty}
            </h2>
            <p className="text-lg text-muted-foreground">{t(lang, "tapDoctor")}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {filteredBySpecialty.map((d) => <DoctorCard key={d.id} d={d} />)}
            </div>
            {filteredBySpecialty.length === 0 && (
              <p className="text-center text-lg text-muted-foreground py-10">{t(lang, "noDoctors")}</p>
            )}
          </div>
        )}

        {view === "tests" && (
          <div className="animate-fade-in space-y-6">
            <BackBtn onClick={goHome} />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t(lang, "findTestHeading")}</h2>
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
              <Input
                autoFocus
                placeholder={t(lang, "typeTest")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-16 md:h-20 text-xl md:text-2xl pl-16 rounded-2xl border-2 shadow-soft"
              />
            </div>
            <p className="text-lg text-muted-foreground">{t(lang, "tapTest")}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {filteredTests.map((tt) => <TestCard key={tt.id} tt={tt} />)}
            </div>
            {filteredTests.length === 0 && (
              <p className="text-center text-lg text-muted-foreground py-10">{t(lang, "noTests")}</p>
            )}
          </div>
        )}

        {view === "detail" && selectedDoctor && (
          <DoctorDetail
            doctor={selectedDoctor}
            lang={lang}
            onBack={() => { stopSpeaking(); setView(selectedSpecialty ? "specialtyDoctors" : "byName"); }}
          />
        )}

        {view === "testDetail" && selectedTest && (
          <TestDetail
            test={selectedTest}
            lang={lang}
            onBack={() => { stopSpeaking(); setView("tests"); }}
          />
        )}
      </main>

      {voiceStatus && (
        <VoiceOverlay
          lang={lang}
          status={voiceStatus}
          message={voiceMessage}
          onClose={() => { stopSpeaking(); setVoiceStatus(null); }}
        />
      )}
    </div>
  );
};

export default Index;
