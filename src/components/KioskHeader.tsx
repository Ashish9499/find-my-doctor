import { Hospital } from "lucide-react";

export const KioskHeader = () => (
  <header className="bg-gradient-hero text-primary-foreground py-6 px-8 shadow-elevated">
    <div className="max-w-6xl mx-auto flex items-center gap-4">
      <div className="bg-primary-foreground/20 p-3 rounded-2xl backdrop-blur-sm">
        <Hospital className="w-10 h-10" />
      </div>
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">MediFind Kiosk</h1>
        <p className="text-primary-foreground/90 text-base md:text-lg">Find your doctor in seconds</p>
      </div>
    </div>
  </header>
);
