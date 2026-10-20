import React from 'react';
import { Award, ShieldCheck, FileCheck2, Sparkles, CheckCircle2 } from 'lucide-react';

interface SignatureBannerProps {
  onExportDiagram?: () => void;
  activeTab?: string;
}

export const SignatureBanner: React.FC<SignatureBannerProps> = ({ onExportDiagram }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 p-4 sm:p-5 shadow-xl backdrop-blur-md">
      {/* Decorative background glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
        {/* Left: Project title & Architecture badge */}
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 shadow-lg shadow-amber-500/25 ring-2 ring-amber-400/30">
            <Award className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-2.5 py-0.5 text-xs font-semibold text-amber-300 ring-1 ring-inset ring-amber-500/30">
                <Sparkles className="h-3 w-3" />
                UML Class Diagram & Polymorphism Pattern
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/30">
                <ShieldCheck className="h-3 w-3" />
                Doğrulanmış OOP Mimarisi
              </span>
            </div>
            <h1 className="mt-1 text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Hayvanat Bahçesi Yönetim Sistemi
              <span className="text-xs font-normal text-slate-400 hidden sm:inline">| Polimorfik Dozaj & Yem Takvimi</span>
            </h1>
          </div>
        </div>

        {/* Right: Signature Cartouche - ENES ÖZTÜRK */}
        <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
          <div className="flex items-center gap-3 bg-slate-950/70 border border-amber-500/30 rounded-xl px-4 py-2.5 shadow-inner">
            <div className="text-right">
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                Sistem Tasarımı & Mimari
              </div>
              <div className="text-base font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 flex items-center justify-end gap-1.5 font-sans">
                <span>Enes Öztürk</span>
                <CheckCircle2 className="h-4 w-4 text-amber-400 inline shrink-0" />
              </div>
              <div className="text-[10px] font-mono text-emerald-400/90 flex items-center justify-end gap-1">
                <span>Revizyon 1.0</span>
                <span>•</span>
                <span>Onaylı Tasarım</span>
              </div>
            </div>

            {/* Seal Graphic */}
            <div className="w-9 h-9 rounded-full border border-amber-400/40 bg-amber-500/10 flex items-center justify-center text-amber-300 font-mono text-[10px] font-bold shadow-inner">
              EÖ
            </div>
          </div>

          {onExportDiagram && (
            <button
              onClick={onExportDiagram}
              title="Diyagramı Yazdır / Raporla"
              className="hidden lg:flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-2.5 text-xs font-medium text-slate-200 transition-all hover:border-amber-500/40"
            >
              <FileCheck2 className="h-4 w-4 text-amber-400" />
              Rapor Görünümü
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
