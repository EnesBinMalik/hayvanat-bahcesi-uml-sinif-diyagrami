import React, { useState } from 'react';
import { Copy, Check, Code2, BookOpen, Terminal } from 'lucide-react';
import { CODE_TEMPLATES } from '../data/umlDiagramData';

export const CodeViewer: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<'typescript' | 'java' | 'csharp' | 'python'>('typescript');
  const [copied, setCopied] = useState(false);

  const currentCode = CODE_TEMPLATES[selectedLanguage];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const languages = [
    { id: 'typescript', label: 'TypeScript', ext: '.ts', badge: 'Abstract Class & Interface' },
    { id: 'java', label: 'Java', ext: '.java', badge: 'Strict OOP & @Override' },
    { id: 'csharp', label: 'C# (.NET 8)', ext: '.cs', badge: 'Virtual & Override' },
    { id: 'python', label: 'Python 3', ext: '.py', badge: 'ABC & @abstractmethod' },
  ];

  return (
    <div className="space-y-4">
      {/* Language Switcher Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          {languages.map((lang) => {
            const isSelected = selectedLanguage === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id as any)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="h-3.5 w-3.5" />
                {lang.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
            {languages.find((l) => l.id === selectedLanguage)?.badge}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all hover:border-amber-500/40"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-300">Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-amber-400" />
                <span>Kodu Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Window */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/80 px-4 py-2.5 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-slate-300 ml-2">
              ZooPolymorphism_{selectedLanguage}{languages.find((l) => l.id === selectedLanguage)?.ext}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-amber-400/90">
            <span>Tasarım: Enes Öztürk</span>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-x-auto max-h-[600px] font-mono text-xs leading-relaxed text-slate-300 selection:bg-amber-500/30">
          <pre>
            <code>{currentCode}</code>
          </pre>
        </div>
      </div>

      {/* Language OOP polymorphism highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 space-y-1.5">
          <span className="text-amber-400 font-bold flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" />
            Polimorfizm Anahtar Kavramları
          </span>
          <p className="text-slate-400">
            Soyut sınıf (Animal) alt sınıflara bir sözleşme (contract) sunar. getDosage() ve getFeedSchedule() metotları çalışma zamanında (late binding / dynamic dispatch) nesnenin asıl sınıfına göre tetiklenir.
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 space-y-1.5">
          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5" />
            Open/Closed Prensibi (SOLID)
          </span>
          <p className="text-slate-400">
            Gelecekte yeni bir grup (örneğin Kuşlar / Aves veya Sürüngenler / Reptiles) eklendiğinde, var olan kodlara veya ZooManagementSystem sınıfına dokunmadan sadece yeni bir alt sınıf türetmek yeterlidir.
          </p>
        </div>
      </div>
    </div>
  );
};
