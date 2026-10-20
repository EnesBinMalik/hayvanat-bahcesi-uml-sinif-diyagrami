import React from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  FileCheck, 
  Award,
  Sparkles,
  GitBranch,
  AlertTriangle
} from 'lucide-react';

export const ArchitectureDoc: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Formal Technical Header */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="rounded-md bg-amber-500/20 px-2 py-0.5 text-xs font-mono font-semibold text-amber-300 border border-amber-500/30">
                TEKNİK TASARIM DOKÜMANI
              </span>
              <span className="text-xs text-slate-400 font-mono">DOKÜMAN NO: ARC-2026-OOP-01</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Hayvanat Bahçesi Takip Sistemi Polimorfizm Mimarisi
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Nesne Yönelimli Programlama (OOP) ilkelerine uygun, çok biçimlilik (polymorphism) ve soyutlama tabanlı sınıf hiyerarşisi tasarımı.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/40 text-right shrink-0">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
              SİSTEM MİMARI & İMZA:
            </span>
            <span className="text-lg font-black text-amber-300 block font-mono">
              Enes Öztürk
            </span>
            <div className="flex items-center justify-end gap-1 text-[11px] text-emerald-400 font-mono mt-0.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Mimari Onaylandı</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Problem Tanımı ve Analizi */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-base font-bold text-white border-b border-slate-800 pb-2">
          <BookOpen className="h-5 w-5 text-amber-400" />
          <h3>1. Problem Tanımı ve Gereksinim Analizi</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Bir hayvanat bahçesinde bulunan hayvanlar farklı biyolojik ailelerde (örneğin <strong className="text-white">Atlar / Atgiller</strong>, <strong className="text-white">Kedigiller</strong> ve <strong className="text-white">Kemirgenler</strong>) gruplanmaktadır.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Ortak Bilgiler (Tüm Gruplarda Aynı Olan Veriler)
            </span>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              <li><strong className="text-slate-100">Tür Adı (speciesName):</strong> Hayvanın taksonomik türü (örn: <em>Equus quagga</em>, <em>Panthera tigris</em>).</li>
              <li><strong className="text-slate-100">Ağırlık (weightKg):</strong> Canlının kilogram cinsinden vücut kütlesi.</li>
              <li><strong className="text-slate-100">Yaş (ageYears):</strong> Canlının kronolojik yaşı.</li>
              <li><strong className="text-slate-100">Kimlik ve İsim (id, name):</strong> Hayvanın bireysel tanıtıcı lakabı ve kodu.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
              <GitBranch className="h-4 w-4" /> Farklılaşan Mantıklar (Polimorfik Fonksiyonlar)
            </span>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              <li><strong className="text-slate-100">İlaç Dozajı [getDosage(ilaç)]:</strong> Hayvan grubunun metabolizma hızına ve organ hassasiyetine göre değişir.</li>
              <li><strong className="text-slate-100">Yem Verme Takvimi [getFeedSchedule()]:</strong> Canlının sindirim sistemi anatomisine (tek mideli otçul vs zorunlu etçil vs kemirgen) göre öğün saatleri ve gıda tipleri tamamen farklıdır.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Neden Polimorfizm? (Anti-Pattern vs OOP Çözüm) */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-base font-bold text-white border-b border-slate-800 pb-2">
          <Cpu className="h-5 w-5 text-amber-400" />
          <h3>2. Polimorfizm Yaklaşımı ve Mimari Karar Raporu</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Yanlış Yaklaşım */}
          <div className="rounded-xl border border-rose-500/30 bg-rose-950/10 p-4 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" /> Kötü Kod (Anti-Pattern / Tip Kontrolü Spagettisi)
            </span>
            <pre className="text-[11px] font-mono text-rose-200 bg-slate-950 p-2.5 rounded-lg overflow-x-auto leading-relaxed border border-rose-900/40">
{`// ❌ ASLA YAPILMAMASI GEREKEN KOD:
if (hayvan.tur == "At") {
  // At besleme mantığı
} else if (hayvan.tur == "Kaplan") {
  // Kaplan besleme mantığı
} else if (hayvan.tur == "Kunduz") {
  // Kunduz besleme mantığı
}`}
            </pre>
            <p className="text-[11px] text-slate-400">
              Bu yaklaşım SOLID ilkelerinden <strong>Open/Closed Prensibini (OCP)</strong> ihlal eder. Yeni bir hayvan türü eklendiğinde sistemdeki tüm if-else bloklarını değiştirmek gerekir.
            </p>
          </div>

          {/* Doğru OOP Yaklaşım */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/10 p-4 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Doğru OOP Çözümü: Enes Öztürk Polimorfizm Tasarımı
            </span>
            <pre className="text-[11px] font-mono text-emerald-200 bg-slate-950 p-2.5 rounded-lg overflow-x-auto leading-relaxed border border-emerald-900/40">
{`// ✅ ZARİF POLİMORFİK ÇÖZÜM:
for (Animal animal : zoo.getAllAnimals()) {
  // Çalışma zamanında (runtime) nesnenin 
  // gerçek tipine göre doğru metot çağrılır:
  FeedSchedule feed = animal.getFeedSchedule();
  Dosage dose = animal.getDosage(medicine);
}`}
            </pre>
            <p className="text-[11px] text-slate-400">
              Çağırıcı sistem alt türlerin iç detaylarından tamamen habersizdir. Yeni bir tür eklemek için sadece <code>Animal</code> sınıfından türeyen yeni bir sınıf yazmak yeterlidir!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Biyolojik Algoritma Temelleri */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-base font-bold text-white border-b border-slate-800 pb-2">
          <Layers className="h-5 w-5 text-amber-400" />
          <h3>3. Hayvan Gruplarına Göre Dozaj ve Besleme Algoritma Farkları</h3>
        </div>

        <div className="space-y-3">
          {/* Equines */}
          <div className="rounded-xl border border-emerald-500/30 bg-slate-900/50 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-emerald-300">
                A. Atgiller (Equidae - Atlar, Zebralar, Eşekler)
              </h4>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Hindgut Fermenter (Tek Mideli Otçul)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-1">
              <div>
                <strong className="text-white block mb-0.5">Yem Verme Algoritması:</strong>
                Mide hacmi küçüktür fakat mide asidi sürekli salgılanır. Bu nedenle öğünler arası süre asla uzatılmamalıdır. Günlük ağırlığın %2.0 - %2.5'i kadar kuru ot/yonca günde <strong>4 eşit öğüne</strong> (06:30, 11:30, 16:30, 21:30) bölünerek verilir.
              </div>
              <div>
                <strong className="text-white block mb-0.5">Dozaj Algoritması:</strong>
                Geniş körbağırsak mayalanması florası antibiyotiklere karşı aşırı hassastır (ölümcül kolit riski). Sedatif dozu kg başına yaklaşık <strong>0.22 mg/kg</strong> seviyesinde tutulur ve kaba yemle kombine edilir.
              </div>
            </div>
          </div>

          {/* Felids */}
          <div className="rounded-xl border border-orange-500/30 bg-slate-900/50 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-orange-300">
                B. Kedigiller (Felidae - Kaplanlar, Aslanlar, Leoparlar)
              </h4>
              <span className="text-[10px] font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                Obligate Carnivores (Zorunlu Etçiller)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-1">
              <div>
                <strong className="text-white block mb-0.5">Yem Verme Algoritması:</strong>
                Kısa sindirim kanalı ve yüksek asidite. Vahşi doğa av ritmi simülasyonu için <strong>günde 1 ana öğün</strong> (14:30) verilir. Ağırlığın %4 - %6'sı kadar kemikli taze karkas et sunulur. Sindirim sistemini dinlendirmek için <strong>haftada 1 gün oruç/açlık günü</strong> uygulanır.
              </div>
              <div>
                <strong className="text-white block mb-0.5">Dozaj Algoritması:</strong>
                Kedigillerde karaciğer glukuronil transferaz enzimi eksiktir. Bu nedenle parasetamol ve aspirin gibi ilaçlar toksiktir. Sedasyon direnci yüksek olduğundan dozaj <strong>0.55 mg/kg</strong> civarındadır ve dart veya et içiyle uygulanır.
              </div>
            </div>
          </div>

          {/* Rodents */}
          <div className="rounded-xl border border-cyan-500/30 bg-slate-900/50 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-cyan-300">
                C. Kemirgenler (Rodentia - Sıçanlar, Kunduzlar, Kapibaralar)
              </h4>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                Yüksek Metabolik Hız & Sürekli Uzayan Kesiciler
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-1">
              <div>
                <strong className="text-white block mb-0.5">Yem Verme Algoritması:</strong>
                Gececil (nocturnal) eğilim. Sabah lifli hafif yeşillik (08:30), akşam ana pelet/tohum (19:30) olmak üzere <strong>günde 2 öğün</strong> verilir. Dişlerin aşırı uzamasını engellemek için <strong>7/24 kemirme kütükleri</strong> (söğüt/kavak) kafeste bulundurulur.
              </div>
              <div>
                <strong className="text-white block mb-0.5">Dozaj Algoritması:</strong>
                <strong>Kleiber Metabolik Yasası:</strong> Canlının kütlesi küçüldükçe kg başına bazal metabolizma hızı katlanarak artar. Bu sebeple ilaçları çok hızlı metabolize ederler; mg/kg dozu büyük memelilere göre 2-3 kat fazladır (<strong>0.85 - 1.5 mg/kg</strong>) ve günde 2-3 kez tekrarlanır.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SOLID Prensipleri Uyumluluk Tablosu */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-base font-bold text-white border-b border-slate-800 pb-2">
          <ShieldCheck className="h-5 w-5 text-amber-400" />
          <h3>4. SOLID ve OOP İlkeleri Uyumluluk Analizi</h3>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden text-xs font-mono">
          <div className="grid grid-cols-12 bg-slate-900 p-3 font-bold text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
            <div className="col-span-3">İlke / Prensip</div>
            <div className="col-span-9">Bu Mimarideki Uygulama Şekli</div>
          </div>

          <div className="divide-y divide-slate-800 text-slate-300">
            <div className="grid grid-cols-12 p-3 items-center">
              <div className="col-span-3 font-bold text-amber-300">Single Responsibility (SRP)</div>
              <div className="col-span-9">
                Her sınıf yalnızca kendi biyolojik grubuna ait özellikleri ve hesaplama formüllerini yönetir.
              </div>
            </div>
            <div className="grid grid-cols-12 p-3 items-center">
              <div className="col-span-3 font-bold text-emerald-300">Open / Closed (OCP)</div>
              <div className="col-span-9">
                Sistem yeni hayvan gruplarına açıktır (Aves / Kuşlar eklenebilir); fakat var olan kodları değiştirmeye kapalıdır.
              </div>
            </div>
            <div className="grid grid-cols-12 p-3 items-center">
              <div className="col-span-3 font-bold text-cyan-300">Liskov Substitution (LSP)</div>
              <div className="col-span-9">
                Tüm alt sınıflar (Horse, Tiger, Beaver), Animal referansı beklenen her yerde hiçbir bozulma olmadan kullanılabilir.
              </div>
            </div>
            <div className="grid grid-cols-12 p-3 items-center">
              <div className="col-span-3 font-bold text-purple-300">Abstraction & Polymorphism</div>
              <div className="col-span-9">
                Animal soyut sınıfı sözleşmeyi tanımlar, çalışma zamanında (dynamic dispatch) doğru metot icra edilir.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Resmi Onay ve İmza Sertifikası (ENES ÖZTÜRK) */}
      <div className="rounded-2xl border-2 border-amber-500/50 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 text-amber-500/5 pointer-events-none">
          <Award className="w-48 h-48" />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <FileCheck className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                YAZILIM MİMARLIK VE MÜHENDİSLİK TASARIM SERTİFİKASI
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Hayvanat Bahçesi Polimorfizm Sınıf Diyagramı Tasarımı
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
              ✓ Teknik Denetimden Geçti
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl mb-6">
          İşbu teknik sınıf diyagramı ve nesne yönelimli mimari; Atlar (Equidae), Kedigiller (Felidae) ve Kemirgenler (Rodentia) sınıflarının ortak özelliklerini soyut bir tabanda birleştirmek, <code className="text-amber-300">getDosage()</code> ve <code className="text-amber-300">getFeedSchedule()</code> fonksiyonlarını polimorfizm ilkesiyle her gruba özgü kılmak üzere tasarlanmıştır.
        </p>

        <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
          <div className="text-xs font-mono text-slate-400 space-y-0.5">
            <div>Standart: UML 2.5 (Unified Modeling Language)</div>
            <div>Metot Bağlama: Dinamik Geç Bağlama (Late / Dynamic Dispatch)</div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Tasarım ve Mimari İmza Sahibi:
            </div>
            <div className="text-xl font-extrabold text-amber-300 font-mono tracking-wide underline decoration-amber-500/40">
              Enes Öztürk
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-0.5">
              Yazılım Mühendisliği & Sistem Mimarisi
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
