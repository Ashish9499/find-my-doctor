import { Lang, localeCode } from "./i18n";

type RecognitionResult = {
  transcript: string;
};

export function isRecognitionSupported() {
  if (typeof window === "undefined") return false;
  return !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
}

export function listenOnce(lang: Lang): Promise<RecognitionResult> {
  return new Promise((resolve, reject) => {
    const Ctor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Ctor) {
      reject(new Error("SpeechRecognition not supported"));
      return;
    }
    const rec = new Ctor();
    rec.lang = localeCode(lang);
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    rec.continuous = false;

    let settled = false;

    rec.onresult = (e: any) => {
      settled = true;
      const transcript = e.results[0][0].transcript as string;
      resolve({ transcript });
    };
    rec.onerror = (e: any) => {
      if (!settled) reject(new Error(e.error || "recognition_error"));
    };
    rec.onend = () => {
      if (!settled) reject(new Error("no_speech"));
    };

    try {
      rec.start();
    } catch (err) {
      reject(err as Error);
    }
  });
}
