import React, { useState } from 'react';
import { 
  Network, 
  Cpu, 
  Code2, 
  FileText, 
  Sparkles, 
  Github, 
  Printer, 
  Download,
  Info
} from 'lucide-react';
import { SignatureBanner } from './components/SignatureBanner';
import { UMLDiagramViewer } from './components/UMLDiagramViewer';
import { PolymorphismSimulator } from './components/PolymorphismSimulator';
import { CodeViewer } from './components/CodeViewer';
import { ArchitectureDoc } from './components/ArchitectureDoc';

export default function App() {
  const [activeTab, setActiveTab] = useState<'uml' | 'simulator' | 'code' | 'docs'>('uml');
  const [selectedGroupFromDiagram, setSelectedGroupFromDiagram] = useState<string | undefined>(undefined);

  const handleSelectClassForSimulator = (className: string) => {
    setSelectedGroupFromDiagram(className);
    setActiveTab('simulator');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20 font-bold font-mono text-sm">
              EÖ
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
                <span>Zoo System Architecture</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">Polymorphism UML</span>
              </div>
              <div className="text-sm font-extrabold text-white flex items-center gap-2">
                <span>Hayvanat Bahçesi Takip Sistemi</span>
                <span className="text-[10px] rounded bg-amber-500/20 px-1.5 py-0.5 text-amber-300 font-mono">
                  Enes Öztürk
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('uml')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'uml'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Network className="h-4 w-4" />
              UML Sınıf Diyagramı
            </button>

            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'simulator'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="h-4 w-4" />
              Dozaj & Yem Simülatörü
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'code'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="h-4 w-4" />
              Kaynak Kodları
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'docs'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="h-4 w-4" />
              Mimari Rapor & Teori
            </button>
          </nav>

          {/* Print / Report button */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="Sayfayı Yazdır / PDF Olarak Kaydet"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold transition-all hover:border-slate-700"
            >
              <Printer className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden sm:inline">Rapor Yazdır</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex items-center justify-around border-t border-slate-800 bg-slate-900/90 px-2 py-1.5 text-xs">
          <button
            onClick={() => setActiveTab('uml')}
            className={`flex flex-col items-center gap-1 p-1 rounded-lg ${
              activeTab === 'uml' ? 'text-amber-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Network className="h-4 w-4" />
            <span>UML</span>
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex flex-col items-center gap-1 p-1 rounded-lg ${
              activeTab === 'simulator' ? 'text-amber-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Cpu className="h-4 w-4" />
            <span>Simülatör</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex flex-col items-center gap-1 p-1 rounded-lg ${
              activeTab === 'code' ? 'text-amber-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Code2 className="h-4 w-4" />
            <span>Kodlar</span>
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`flex flex-col items-center gap-1 p-1 rounded-lg ${
              activeTab === 'docs' ? 'text-amber-400 font-bold' : 'text-slate-400'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Rapor</span>
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Banner with Signature Block */}
        <SignatureBanner 
          activeTab={activeTab} 
          onExportDiagram={() => setActiveTab('docs')}
        />

        {/* Tab 1: UML Class Diagram */}
        {activeTab === 'uml' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Network className="h-5 w-5 text-amber-400" />
                  İnteraktif UML 2.5 Sınıf Diyagramı
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Kalıtım (Inheritance), Soyutlama (Abstraction) ve Polimorfizm sözleşmesi gösterimi. Sınıflara tıklayarak detaylarını ve yöntemlerini inceleyebilirsiniz.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Enes Öztürk Tasarım Şeması</span>
              </div>
            </div>

            <UMLDiagramViewer onSelectClassForSimulator={handleSelectClassForSimulator} />
          </div>
        )}

        {/* Tab 2: Polymorphism Live Simulator */}
        {activeTab === 'simulator' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-amber-400" />
                  Canlı Polimorfizm Simülatörü & Dozaj / Yem Test Laboratuvarı
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Atlar, Kedigiller ve Kemirgenler üzerinde <code className="text-amber-300">getDosage()</code> ve <code className="text-amber-300">getFeedSchedule()</code> fonksiyonlarının runtime dynamic binding ile çalışmasını test edin.
                </p>
              </div>
            </div>

            <PolymorphismSimulator initialSelectedGroup={selectedGroupFromDiagram} />
          </div>
        )}

        {/* Tab 3: Complete Multi-Language Source Code */}
        {activeTab === 'code' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Code2 className="h-5 w-5 text-amber-400" />
                Üretim Düzeyinde OOP Kaynak Kodları (Enes Öztürk İmzalı)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                TypeScript, Java, C# ve Python dillerinde birebir derlenebilir, temiz ve profesyonel polimorfik sınıf hiyerarşisi kodları.
              </p>
            </div>

            <CodeViewer />
          </div>
        )}

        {/* Tab 4: Architecture Document & Theory */}
        {activeTab === 'docs' && (
          <div className="space-y-4">
            <ArchitectureDoc />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Hayvanat Bahçesi Takip Sistemi</span>
            <span>•</span>
            <span>Polimorfizm Sınıf Diyagramı</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-slate-300">
            <span>Sistem Tasarımı ve Mimari:</span>
            <span className="font-extrabold text-amber-400">Enes Öztürk</span>
            <span className="text-emerald-400 ml-1">✓ Onaylı</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
