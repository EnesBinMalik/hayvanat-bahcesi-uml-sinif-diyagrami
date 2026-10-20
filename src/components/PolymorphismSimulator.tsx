import React, { useState } from 'react';
import { 
  Pill, 
  Clock, 
  Activity, 
  Sparkles, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  Terminal, 
  Utensils,
  ChevronRight,
  ShieldAlert,
  Flame,
  Leaf,
  Beef,
  Wheat
} from 'lucide-react';
import { Animal, ZooManagementSystem, Horse, Zebra, Tiger, Lion, Beaver, Capybara, Rat } from '../models/zooClasses';
import { MedicineType, DosageResult, FeedScheduleResult } from '../types/uml';

interface PolymorphismSimulatorProps {
  initialSelectedGroup?: string;
}

export const PolymorphismSimulator: React.FC<PolymorphismSimulatorProps> = ({ initialSelectedGroup }) => {
  const [zooSystem] = useState<ZooManagementSystem>(() => new ZooManagementSystem());
  const [animals, setAnimals] = useState<Animal[]>(() => zooSystem.getAllAnimals());
  const [selectedAnimalId, setSelectedAnimalId] = useState<string>(() => {
    if (initialSelectedGroup === 'Felid' || initialSelectedGroup === 'Tiger') return 'fel-1';
    if (initialSelectedGroup === 'Rodent' || initialSelectedGroup === 'Beaver') return 'rod-1';
    return 'eq-1';
  });
  const [selectedMedicine, setSelectedMedicine] = useState<MedicineType>('sedative');
  const [activeTab, setActiveTab] = useState<'single' | 'batch' | 'comparison'>('single');
  const [isAddingAnimal, setIsAddingAnimal] = useState(false);

  // New Animal form state
  const [newName, setNewName] = useState('');
  const [newGroup, setNewGroup] = useState<'horse' | 'tiger' | 'beaver'>('horse');
  const [newWeight, setNewWeight] = useState(450);
  const [newAge, setNewAge] = useState(5);

  const selectedAnimal = animals.find((a) => a.getId() === selectedAnimalId) || animals[0];

  const currentDosage: DosageResult = selectedAnimal.getDosage(selectedMedicine);
  const currentFeed: FeedScheduleResult = selectedAnimal.getFeedSchedule();

  // Medicines list
  const MEDICINES: { id: MedicineType; label: string; desc: string }[] = [
    { id: 'sedative', label: 'Sakinleştirici / Sedatif', desc: 'Ameliyat ve veteriner muayenesi öncesi' },
    { id: 'painkiller', label: 'Ağrı Kesici & Antienflamatuar', desc: 'Travma veya operasyon sonrası ağrı sağaltımı' },
    { id: 'antibiotic', label: 'Antibiyotik', desc: 'Bakteriyel enfeksiyon sağaltımı' },
    { id: 'vitamin', label: 'Vitamin & Mineral Takviyesi', desc: 'Metabolik destek ve kış hazırlığı' },
    { id: 'vaccine', label: 'Koruyucu Aşı Protokolü', desc: 'Yıllık bağışıklama dozu' },
  ];

  const handleAddNewAnimal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const id = `custom-${Date.now()}`;
    let animal: Animal;

    if (newGroup === 'horse') {
      animal = new Horse(id, newName, Number(newWeight), Number(newAge));
    } else if (newGroup === 'tiger') {
      animal = new Tiger(id, newName, Number(newWeight), Number(newAge));
    } else {
      animal = new Beaver(id, newName, Number(newWeight), Number(newAge));
    }

    zooSystem.addAnimal(animal);
    const updated = zooSystem.getAllAnimals();
    setAnimals(updated);
    setSelectedAnimalId(id);
    setIsAddingAnimal(false);
    setNewName('');
  };

  const getGroupIcon = (group: string) => {
    if (group.includes('Atgiller')) return <Leaf className="h-4 w-4 text-emerald-400" />;
    if (group.includes('Kedigiller')) return <Beef className="h-4 w-4 text-orange-400" />;
    return <Wheat className="h-4 w-4 text-cyan-400" />;
  };

  const getGroupBadge = (group: string) => {
    if (group.includes('Atgiller')) {
      return 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300';
    }
    if (group.includes('Kedigiller')) {
      return 'bg-orange-500/15 border-orange-500/30 text-orange-300';
    }
    return 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300';
  };

  return (
    <div className="space-y-6">
      {/* Simulator Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab('single')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'single'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            Bireysel Hayvan Dozaj & Yem Testi
          </button>
          <button
            onClick={() => setActiveTab('batch')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'batch'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            Toplu Polimorfik Yürütme (Dynamic Dispatch)
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'comparison'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            3 Grup Algoritma Karşılaştırması
          </button>
        </div>

        <button
          onClick={() => setIsAddingAnimal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all hover:border-amber-500/40"
        >
          <Plus className="h-3.5 w-3.5 text-amber-400" />
          Yeni Hayvan Ekle
        </button>
      </div>

      {/* Add Animal Modal */}
      {isAddingAnimal && (
        <div className="rounded-2xl border border-amber-500/40 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-md animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="h-4 w-4 text-amber-400" />
              Sisteme Yeni Polimorfik Hayvan Ekle
            </h3>
            <button
              onClick={() => setIsAddingAnimal(false)}
              className="text-slate-400 hover:text-white text-xs"
            >
              Vazgeç
            </button>
          </div>

          <form onSubmit={handleAddNewAnimal} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Hayvanın Adı</label>
              <input
                type="text"
                required
                placeholder="Örn: Kasırga, Kral vb."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Hayvan Grubu (Sınıf)</label>
              <select
                value={newGroup}
                onChange={(e) => setNewGroup(e.target.value as any)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="horse">Atgiller: At (Equus caballus)</option>
                <option value="tiger">Kedigiller: Kaplan (Panthera tigris)</option>
                <option value="beaver">Kemirgenler: Kunduz (Castor fiber)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Ağırlık (kg)</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                required
                value={newWeight}
                onChange={(e) => setNewWeight(Number(e.target.value))}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-300 mb-1">Yaş</label>
                <input
                  type="number"
                  min="1"
                  max="40"
                  required
                  value={newAge}
                  onChange={(e) => setNewAge(Number(e.target.value))}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shrink-0"
              >
                Ekle ve Hesapla
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 1: SINGLE ANIMAL INSPECTOR */}
      {activeTab === 'single' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Animal Selector & Medicine Picker */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  1. Hayvan Seçimi ({animals.length} Kayıt)
                </h3>
                <span className="text-[10px] text-slate-400">Polimorfik Nesneler</span>
              </div>

              <div className="space-y-1.5 max-h-[290px] overflow-y-auto pr-1">
                {animals.map((animal) => {
                  const isSelected = animal.getId() === selectedAnimalId;
                  const group = animal.getGroupFamily();
                  return (
                    <button
                      key={animal.getId()}
                      onClick={() => setSelectedAnimalId(animal.getId())}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-amber-500/80 bg-amber-500/10 shadow-sm ring-1 ring-amber-500/30'
                          : 'border-slate-800 hover:border-slate-700 bg-slate-950/60 hover:bg-slate-950'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                          {getGroupIcon(group)}
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            {animal.getName()}
                            <span className="text-[10px] font-normal text-slate-400">
                              ({animal.getWeightKg()} kg, {animal.getAgeYears()} yaş)
                            </span>
                          </div>
                          <div className="text-[10px] font-mono text-slate-400 truncate">
                            {animal.getSpeciesName()}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded border shrink-0 ${getGroupBadge(
                          group
                        )}`}
                      >
                        {group.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Medicine Selector */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
                2. Test Edilecek İlaç Tipi (getDosage Parametresi)
              </h3>
              <div className="space-y-1.5">
                {MEDICINES.map((med) => {
                  const isSelected = selectedMedicine === med.id;
                  return (
                    <button
                      key={med.id}
                      onClick={() => setSelectedMedicine(med.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-amber-400/80 bg-amber-500/15 text-amber-200'
                          : 'border-slate-800 bg-slate-950/50 hover:bg-slate-800/50 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Pill
                          className={`h-3.5 w-3.5 ${
                            isSelected ? 'text-amber-400' : 'text-slate-400'
                          }`}
                        />
                        <span className="text-xs font-medium">{med.label}</span>
                      </div>
                      <ChevronRight className="h-3 w-3 text-slate-400" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Execution Results for Selected Animal */}
          <div className="lg:col-span-8 space-y-4">
            {/* Header info badge of selected animal */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
                  {getGroupIcon(selectedAnimal.getGroupFamily())}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-extrabold text-white">
                      {selectedAnimal.getName()}
                    </h2>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${getGroupBadge(
                        selectedAnimal.getGroupFamily()
                      )}`}
                    >
                      {selectedAnimal.getGroupFamily()}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    Tür: <span className="text-slate-200">{selectedAnimal.getSpeciesName()}</span> •
                    Ağırlık: <span className="text-amber-300 font-bold">{selectedAnimal.getWeightKg()} kg</span> •
                    Yaş: <span className="text-slate-200">{selectedAnimal.getAgeYears()} yıl</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Çalışma Zamanı (Runtime)
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1 justify-end">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Dynamic Binding Başarılı
                </span>
              </div>
            </div>

            {/* RESULTS GRID: getDosage() vs getFeedSchedule() */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: getDosage() */}
              <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-slate-900 to-amber-950/20 p-4.5 shadow-xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                      <Pill className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono">
                        getDosage('{selectedMedicine}')
                      </h4>
                      <span className="text-[10px] text-slate-400">Polimorfik İlaç Hesaplaması</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {currentDosage.dosageMg} mg
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="rounded-xl bg-slate-950/80 p-2.5 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 block mb-0.5">
                      ÇALIŞTIRILAN HESAPLAMA FORMÜLÜ:
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-300">
                      {currentDosage.calculationFormula}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg bg-slate-950/50 p-2 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Uygulama Sıklığı</span>
                      <span className="font-semibold text-white">Günde {currentDosage.frequencyPerDay} kez</span>
                    </div>
                    <div className="rounded-lg bg-slate-950/50 p-2 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Uygulama Yolu</span>
                      <span className="font-semibold text-white truncate block" title={currentDosage.administrationRoute}>
                        {currentDosage.administrationRoute}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-2.5 text-[11px] text-amber-200">
                    <div className="flex items-start gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">Grup Metabolik Notu:</span>
                        {currentDosage.specialMetabolicNote}
                      </div>
                    </div>
                  </div>

                  {currentDosage.veterinaryWarning && (
                    <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-2.5 text-[11px] text-rose-300">
                      <div className="flex items-start gap-1.5">
                        <ShieldAlert className="h-3.5 w-3.5 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block">Veteriner Kritik Uyarı:</span>
                          {currentDosage.veterinaryWarning}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Card 2: getFeedSchedule() */}
              <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 to-emerald-950/20 p-4.5 shadow-xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                      <Utensils className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-mono">
                        getFeedSchedule()
                      </h4>
                      <span className="text-[10px] text-slate-400">Polimorfik Yem Takvimi</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {currentFeed.totalDailyWeightKg} kg / Gün
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="rounded-xl bg-slate-950/80 p-2.5 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 block mb-0.5">
                      SİNDİRİM SİSTEMİ STRATEJİSİ:
                    </span>
                    <span className="text-xs font-bold text-cyan-300">
                      {currentFeed.digestiveStrategy}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                      Günlük Besleme Zaman Çizelgesi ({currentFeed.mealsPerDay} Öğün):
                    </span>
                    <div className="space-y-1.5">
                      {currentFeed.meals.map((meal, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between rounded-lg bg-slate-950/60 p-2 border border-slate-800/80"
                        >
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1 rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono font-bold text-amber-300">
                              <Clock className="h-2.5 w-2.5" />
                              {meal.time}
                            </span>
                            <span className="text-xs text-slate-200 line-clamp-1">{meal.feedType}</span>
                          </div>
                          <span className="text-[11px] font-mono font-semibold text-emerald-400 shrink-0">
                            {meal.portionGram} gr
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-2.5 text-[11px] text-emerald-200">
                    <span className="font-bold block">Diyet & Davranış Notu:</span>
                    {currentFeed.fastingOrEnrichmentNote}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Method Call Explanation */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 pb-2 mb-2 border-b border-slate-800">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Terminal className="h-3.5 w-3.5" />
                  Bu Çağrıda Gerçekleşen Polimorfik İşlem (Runtime Stack Trace)
                </span>
                <span className="text-[10px] text-slate-400">OOP Virtual Method Table</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                <span className="text-purple-400">Animal</span> animal = zoo.get(<span className="text-amber-300">"{selectedAnimal.getId()}"</span>);<br />
                <span className="text-slate-400">// animal referansı Animal soyut tipinde olmasına rağmen,</span><br />
                <span className="text-cyan-400">animal.getDosage</span>("{selectedMedicine}"); <span className="text-slate-400">// =&gt; Çağrılan:</span> <span className="text-emerald-400 font-bold">{selectedAnimal.getGroupFamily()}::getDosage()</span><br />
                <span className="text-cyan-400">animal.getFeedSchedule</span>(); <span className="text-slate-400">// =&gt; Çağrılan:</span> <span className="text-emerald-400 font-bold">{selectedAnimal.getGroupFamily()}::getFeedSchedule()</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BATCH POLYMORPHIC EXECUTION */}
      {activeTab === 'batch' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-purple-500/30 bg-slate-900/90 p-4 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-purple-400" />
                  Toplu Polimorfizm Döngüsü: for (Animal a : zoo.getAllAnimals())
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  ZooManagementSystem içinde hiçbir <code className="text-amber-300 bg-slate-950 px-1 py-0.5 rounded">if (a is At)</code> veya <code className="text-amber-300 bg-slate-950 px-1 py-0.5 rounded">switch (tür)</code> kullanılmaz!
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">Dozaj Parametresi:</span>
                <select
                  value={selectedMedicine}
                  onChange={(e) => setSelectedMedicine(e.target.value as MedicineType)}
                  className="rounded-xl bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                >
                  {MEDICINES.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Batch Table */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Hayvan / Tür</th>
                    <th className="py-3 px-4">Polimorfik Sınıf</th>
                    <th className="py-3 px-4">Ağırlık</th>
                    <th className="py-3 px-4">getDosage({selectedMedicine})</th>
                    <th className="py-3 px-4">getFeedSchedule() (Öğün / Gün)</th>
                    <th className="py-3 px-4">Kritik Veteriner Kuralı</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {animals.map((animal) => {
                    const dose = animal.getDosage(selectedMedicine);
                    const feed = animal.getFeedSchedule();
                    const group = animal.getGroupFamily();

                    return (
                      <tr key={animal.getId()} className="hover:bg-slate-900/60 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-white text-sm">{animal.getName()}</div>
                          <div className="text-[10px] text-slate-400">{animal.getSpeciesName()}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded border text-[10px] ${getGroupBadge(group)}`}>
                            {group}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-amber-300">
                          {animal.getWeightKg()} kg
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-emerald-400">{dose.dosageMg} mg</div>
                          <div className="text-[10px] text-slate-400">{dose.calculationFormula}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-cyan-300">
                            {feed.totalDailyWeightKg} kg ({feed.mealsPerDay} Öğün)
                          </div>
                          <div className="text-[10px] text-slate-400 line-clamp-1">
                            {feed.digestiveStrategy}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[11px] text-slate-300 max-w-xs">
                          {dose.veterinaryWarning || feed.fastingOrEnrichmentNote}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 3 GROUPS COMPARISON */}
      {activeTab === 'comparison' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* EQUINE (Atlar) */}
          <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/90 p-5 space-y-4 shadow-xl">
            <div className="flex items-center gap-2.5 border-b border-emerald-500/30 pb-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Leaf className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Atgiller (Equidae)</h3>
                <span className="text-[11px] text-emerald-300 font-mono">Atlar, Zebralar, Eşekler</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Sindirim Mimarisi:
                </span>
                <p className="text-slate-300">
                  Tek mideli arka bağırsak (körbağırsak) mayalanması. Mide hacmi küçüktür ve mide asidi kesintisiz salgılanır.
                </p>
              </div>

              <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
                <span className="text-[10px] font-mono text-emerald-400 font-bold block mb-1">
                  YEM VERME ALGORİTMASI:
                </span>
                <ul className="space-y-1 text-slate-300 list-disc list-inside text-[11px]">
                  <li>Günde 4-5 öğüne bölünmüş sık besleme.</li>
                  <li>Ağırlığın %2 - %2.5'i kadar kaba kuru ot.</li>
                  <li>Uzun süre aç kalmak ülser ve ölümcül koliğe neden olur.</li>
                </ul>
              </div>

              <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
                <span className="text-[10px] font-mono text-amber-400 font-bold block mb-1">
                  İLAÇ DOZAJ ALGORİTMASI:
                </span>
                <ul className="space-y-1 text-slate-300 list-disc list-inside text-[11px]">
                  <li>Sedasyon katsayısı: ~0.22 mg/kg.</li>
                  <li>Bağırsak mikrobiyotasını korumak için oral antibiyotikler kısıtlıdır.</li>
                  <li>Ağrı kesicilerde ülser önleyici tampon gerekir.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FELID (Kedigiller) */}
          <div className="rounded-2xl border border-orange-500/40 bg-slate-900/90 p-5 space-y-4 shadow-xl">
            <div className="flex items-center gap-2.5 border-b border-orange-500/30 pb-3">
              <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400">
                <Beef className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Kedigiller (Felidae)</h3>
                <span className="text-[11px] text-orange-300 font-mono">Kaplanlar, Aslanlar, Parslar</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Sindirim Mimarisi:
                </span>
                <p className="text-slate-300">
                  Zorunlu etçiller (obligate carnivores). Kısa sindirim kanalı, yüksek mide asidi (pH 1-2).
                </p>
              </div>

              <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
                <span className="text-[10px] font-mono text-orange-400 font-bold block mb-1">
                  YEM VERME ALGORİTMASI:
                </span>
                <ul className="space-y-1 text-slate-300 list-disc list-inside text-[11px]">
                  <li>Günde 1 ana öğün (öğleden sonra serinlikte).</li>
                  <li>Ağırlığın %4 - %6'sı kemikli bütün et/karkas.</li>
                  <li>Haftada 1 gün oruç/sindirim günü (doğal av simülasyonu).</li>
                </ul>
              </div>

              <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
                <span className="text-[10px] font-mono text-amber-400 font-bold block mb-1">
                  İLAÇ DOZAJ ALGORİTMASI:
                </span>
                <ul className="space-y-1 text-slate-300 list-disc list-inside text-[11px]">
                  <li>Sedasyon katsayısı: ~0.55 mg/kg (adrenalin direnci yüksektir).</li>
                  <li>Karaciğerde glukuronil transferaz eksikliği nedeniyle parasetamol toksiktir!</li>
                  <li>Dart veya et içine gizlenerek verilir.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* RODENT (Kemirgenler) */}
          <div className="rounded-2xl border border-cyan-500/40 bg-slate-900/90 p-5 space-y-4 shadow-xl">
            <div className="flex items-center gap-2.5 border-b border-cyan-500/30 pb-3">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                <Wheat className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Kemirgenler (Rodentia)</h3>
                <span className="text-[11px] text-cyan-300 font-mono">Kunduzlar, Sıçanlar, Kapibaralar</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Sindirim Mimarisi:
                </span>
                <p className="text-slate-300">
                  Sürekli uzayan kesiciler (haftada 2-3 mm) ve yüksek metabolik hız (Kleiber Yasası).
                </p>
              </div>

              <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
                <span className="text-[10px] font-mono text-cyan-400 font-bold block mb-1">
                  YEM VERME ALGORİTMASI:
                </span>
                <ul className="space-y-1 text-slate-300 list-disc list-inside text-[11px]">
                  <li>Günde 2 öğün (Sabah lifli taze yeşillik, Akşam tohum/pelet).</li>
                  <li>Kafeste 7/24 kemirme odunları (söğüt/kavak) zorunludur.</li>
                  <li>Gececil (nocturnal) beslenme pikleri.</li>
                </ul>
              </div>

              <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
                <span className="text-[10px] font-mono text-amber-400 font-bold block mb-1">
                  İLAÇ DOZAJ ALGORİTMASI:
                </span>
                <ul className="space-y-1 text-slate-300 list-disc list-inside text-[11px]">
                  <li>Hızlı eliminasyon sebebiyle mg/kg dozu 2-3 kat yüksektir (0.85 - 1.5 mg/kg).</li>
                  <li>İlaçlar içme suyuna veya meyve püresine katılarak verilir.</li>
                  <li>Günde 2-3 kez sık aralıklarla tekrarlanır.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
