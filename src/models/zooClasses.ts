/**
 * Hayvanat Bahçesi Yönetim Sistemi - Polimorfik Sınıf Hiyerarşisi
 * Tasarım ve Sistem Mimarisi: Enes Öztürk
 */

import { MedicineType, DosageResult, FeedScheduleResult } from '../types/uml';

/**
 * SOYUT ANA SINIF (ABSTRACT BASE CLASS)
 * Tüm hayvan gruplarında ortak olan öznitelikleri (tür adı, ağırlık, yaş vb.) barındırır.
 * getDosage() ve getFeedSchedule() metotlarını soyut (abstract) tanımlayarak
 * alt sınıfların bu davranışları kendi algoritmalarına göre ezmesini (override) zorunlu kılar.
 */
export abstract class Animal {
  protected id: string;
  protected name: string;
  protected speciesName: string;
  protected weightKg: number;
  protected ageYears: number;
  protected healthStatus: string;

  constructor(id: string, name: string, speciesName: string, weightKg: number, ageYears: number, healthStatus = 'Sağlıklı') {
    this.id = id;
    this.name = name;
    this.speciesName = speciesName;
    this.weightKg = weightKg;
    this.ageYears = ageYears;
    this.healthStatus = healthStatus;
  }

  // Ortak Somut Metotlar (Getters)
  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getSpeciesName(): string {
    return this.speciesName;
  }

  public getWeightKg(): number {
    return this.weightKg;
  }

  public setWeightKg(newWeight: number): void {
    if (newWeight > 0) this.weightKg = newWeight;
  }

  public getAgeYears(): number {
    return this.ageYears;
  }

  public getHealthStatus(): string {
    return this.healthStatus;
  }

  public setHealthStatus(status: string): void {
    this.healthStatus = status;
  }

  /**
   * Polimorfik Metot 1: İlaç Dozajı Hesaplama
   * Her hayvan grubu kendi metabolik ve anatomik katsayılarına göre hesaplar.
   */
  public abstract getDosage(medicine: MedicineType): DosageResult;

  /**
   * Polimorfik Metot 2: Yem Verme Takvimi Hesaplama
   * Her hayvan grubu sindirim sistemi yapısına (otçul, etçil, kemirgen) göre hesaplar.
   */
  public abstract getFeedSchedule(): FeedScheduleResult;

  public abstract getGroupFamily(): string;
}

/**
 * AT VE ATGİLLER GRUBU (EQUIDAE / EQUINES)
 * Atlar, zebralar, eşekler vb.
 * Biyolojik Özellik: Tek mideli, körbağırsak fermentörü (hindgut fermenter) otçul canlılar.
 * Beslenme Mantığı: Mide hacmi küçüktür; gün boyu azar azar, sık sık lifli kaba yem verilmelidir.
 * Dozaj Mantığı: Hassas sindirim florası; sedasyon/ağrı kesici katsayısı ~0.18 - 0.25 mg/kg.
 */
export abstract class Equine extends Animal {
  protected hoofCareCycleDays: number;
  protected dailyGrazingHoursNeeded: number;

  constructor(
    id: string,
    name: string,
    speciesName: string,
    weightKg: number,
    ageYears: number,
    hoofCareCycleDays = 45,
    dailyGrazingHoursNeeded = 14
  ) {
    super(id, name, speciesName, weightKg, ageYears);
    this.hoofCareCycleDays = hoofCareCycleDays;
    this.dailyGrazingHoursNeeded = dailyGrazingHoursNeeded;
  }

  public getGroupFamily(): string {
    return 'Atgiller (Equidae)';
  }

  public getHoofCareCycleDays(): number {
    return this.hoofCareCycleDays;
  }

  /**
   * Atgiller Dozaj Algoritması (Polimorfik Uygulama)
   */
  public getDosage(medicine: MedicineType): DosageResult {
    let mgPerKg = 0.2;
    let frequency = 2;
    let route = 'Oral / Yemle veya İntravenöz';
    let warning = 'Atgillerde bağırsak florasını bozan oral antibiyotiklere karşı dikkatli olunmalıdır.';

    switch (medicine) {
      case 'sedative':
        mgPerKg = 0.22;
        frequency = 1;
        route = 'İntravenöz (IV) yavaş enjeksiyon';
        warning = 'Sedasyon sonrası ayakta kalma refleksi kontrol edilmeli; ani düşüş önlenmelidir.';
        break;
      case 'painkiller':
        mgPerKg = 1.1; // Flunixin meglumine vb.
        frequency = 2;
        route = 'Oral pasta veya IV';
        warning = 'Ülser riski nedeniyle 5 günden uzun kullanılmamalıdır.';
        break;
      case 'antibiotic':
        mgPerKg = 6.6;
        frequency = 2;
        route = 'İntramüsküler (IM)';
        warning = 'Linkosamid grubu antibiyotikler atgillerde KESİNLİKLE yasaktır (ölümcül kolit riski).';
        break;
      case 'vitamin':
        mgPerKg = 0.8;
        frequency = 1;
        route = 'Yem karması içine toz';
        warning = 'Selenyum ve E vitamini toksisitesi için üst sınır aşılmamalıdır.';
        break;
      case 'vaccine':
        mgPerKg = 0.05;
        frequency = 1;
        route = 'İntramüsküler (IM) boyun kası';
        warning = 'Tetanos ve İnfluenza rapel takvimine göre uygulanır.';
        break;
    }

    const totalMg = Math.round(this.weightKg * mgPerKg * 10) / 10;

    return {
      medicineName: medicine.toUpperCase(),
      animalName: this.name,
      species: this.speciesName,
      group: 'Atgiller (Equidae)',
      weightKg: this.weightKg,
      dosageMg: totalMg,
      frequencyPerDay: frequency,
      administrationRoute: route,
      calculationFormula: `${this.weightKg} kg × ${mgPerKg} mg/kg = ${totalMg} mg (${frequency}x/gün)`,
      veterinaryWarning: warning,
      specialMetabolicNote: 'Tek mideli arka bağırsak fermentasyonu nedeniyle sindirim emilimi gecikmeli ve hassastır.',
    };
  }

  /**
   * Atgiller Yem Takvimi Algoritması (Polimorfik Uygulama)
   * Kural: Günlük ağırlığının %2 - %2.5'i kadar kuru madde (ot/kaba yem), günde en az 4 öğüne bölünerek verilir.
   */
  public getFeedSchedule(): FeedScheduleResult {
    const dailyIntakeKg = Math.round(this.weightKg * 0.022 * 10) / 10;
    const mealsCount = 4;
    const portionPerMeal = Math.round((dailyIntakeKg / mealsCount) * 1000); // gram

    return {
      animalName: this.name,
      species: this.speciesName,
      group: 'Atgiller (Equidae)',
      mealsPerDay: mealsCount,
      totalDailyWeightKg: dailyIntakeKg,
      digestiveStrategy: 'Hindgut Fermenter (Körbağırsak Mayalanması - Otçul)',
      fastingOrEnrichmentNote: 'Sürekli çiğneme gereksinimi: Mide asidi sürekli salgılanır, öğün aralıkları 6 saati geçmemelidir.',
      algorithmSummary: `Günde 4 eşit öğün (Sabah 06:30, Öğle 11:30, İkindi 16:30, Gece 21:30). Toplam ${dailyIntakeKg} kg kaliteli çayır kuru otu + yonca.`,
      meals: [
        { time: '06:30', portionGram: portionPerMeal, feedType: 'Çayır Kuru Otu + %15 Yonca Karması' },
        { time: '11:30', portionGram: portionPerMeal, feedType: 'Taze Çayır Otu ve Mineral Yalama Taşı' },
        { time: '16:30', portionGram: portionPerMeal, feedType: 'Kaba Yem / Kuru Ot + Az Miktar Arpa Kepeği' },
        { time: '21:30', portionGram: portionPerMeal, feedType: 'Gece Gezen Samanı ve Lif Destekli Kaba Yem' },
      ],
    };
  }
}

/**
 * KEDİGİLLER GRUBU (FELIDAE / FELIDS)
 * Aslanlar, kaplanlar, jaguarlar, leoparlar vb.
 * Biyolojik Özellik: Zorunlu etçil (obligate carnivores), yüksek protein ve yağ ihtiyacı.
 * Beslenme Mantığı: Vahşi doğada her gün avlanmazlar. Günde 1 veya 2 ana et öğünü + haftada 1 açlık/sindirim günü.
 * Dozaj Mantığı: Karaciğerde glukuronidasyon enzim eksikliği vardır; sedatif ihtiyacı kg başına yüksektir (~0.4 - 0.6 mg/kg).
 */
export abstract class Felid extends Animal {
  protected isObligateCarnivore = true;
  protected fastingDayName: string;

  constructor(
    id: string,
    name: string,
    speciesName: string,
    weightKg: number,
    ageYears: number,
    fastingDayName = 'Pazartesi'
  ) {
    super(id, name, speciesName, weightKg, ageYears);
    this.fastingDayName = fastingDayName;
  }

  public getGroupFamily(): string {
    return 'Kedigiller (Felidae)';
  }

  public getFastingDayName(): string {
    return this.fastingDayName;
  }

  /**
   * Kedigiller Dozaj Algoritması (Polimorfik Uygulama)
   */
  public getDosage(medicine: MedicineType): DosageResult {
    let mgPerKg = 0.45;
    let frequency = 1;
    let route = 'Et içine gizlenmiş oral veya Uzaktan Üfleme İğnesi (Dart)';
    let warning = 'Kedigillerde glukuronil transferaz enzimi eksiktir; parasetamol, fenol ve aspirin ÖLÜMCÜLDÜR!';

    switch (medicine) {
      case 'sedative':
        mgPerKg = 0.55; // Ketamin + Ksilazin / Medetomidin
        frequency = 1;
        route = 'Uzaktan dart ile İntramüsküler (IM) uyluk kası';
        warning = 'Yüksek stres anında adrenalin sedasyon etkisini geciktirebilir; sessiz ortam sağlanmalıdır.';
        break;
      case 'painkiller':
        mgPerKg = 0.2; // Meloksikam vb.
        frequency = 1;
        route = 'Taze et parçası içine enjekte';
        warning = 'Böbrek yetmezliği riski nedeniyle hidrasyon durumu mutlaka kontrol edilmelidir.';
        break;
      case 'antibiotic':
        mgPerKg = 10.0;
        frequency = 1;
        route = 'Et içine gizlenmiş kapsül veya uzun etkili depo enjeksiyon';
        warning = 'İlacın tükürülmediğinden ve çiğnenerek parçalanmadığından emin olunmalıdır.';
        break;
      case 'vitamin':
        mgPerKg = 0.3; // Taurin + A Vitamini desteği (kedigiller sentezleyemez)
        frequency = 1;
        route = 'Kemikli taze et üzerine toz serpiştirme';
        warning = 'Taurin esansiyeldir; eksikliğinde kardiyomiyopati ve körlük oluşur.';
        break;
      case 'vaccine':
        mgPerKg = 0.1;
        frequency = 1;
        route = 'Kafes içi sıkıştırma kafesiyle Subkutan (SC)';
        warning = 'Feline panleukopenia ve kuduz aşıları yıllık uygulanır.';
        break;
    }

    const totalMg = Math.round(this.weightKg * mgPerKg * 10) / 10;

    return {
      medicineName: medicine.toUpperCase(),
      animalName: this.name,
      species: this.speciesName,
      group: 'Kedigiller (Felidae)',
      weightKg: this.weightKg,
      dosageMg: totalMg,
      frequencyPerDay: frequency,
      administrationRoute: route,
      calculationFormula: `${this.weightKg} kg × ${mgPerKg} mg/kg = ${totalMg} mg (${frequency}x/gün)`,
      veterinaryWarning: warning,
      specialMetabolicNote: 'Zorunlu etçil metabolizma; karaciğer toksin atılım yolları memelilerden farklıdır.',
    };
  }

  /**
   * Kedigiller Yem Takvimi Algoritması (Polimorfik Uygulama)
   * Kural: Günlük vücut ağırlığının %4 - %6'sı kadar çiğ kemikli kırmızı/beyaz et;
   * Günde tek öğün (14:00) ve haftada 1 gün doğal oruç (sindirim ve metabolizma dinlendirme).
   */
  public getFeedSchedule(): FeedScheduleResult {
    const dailyMeatKg = Math.round(this.weightKg * 0.05 * 10) / 10;
    const mealsCount = 1;

    return {
      animalName: this.name,
      species: this.speciesName,
      group: 'Kedigiller (Felidae)',
      mealsPerDay: mealsCount,
      totalDailyWeightKg: dailyMeatKg,
      digestiveStrategy: 'Zorunlu Etçil (Kısa Sindirim Kanalı, Yüksek Mide Asiditesi)',
      fastingOrEnrichmentNote: `Haftalık Açlık Günü: ${this.fastingDayName}. Doğal av simülasyonu için haftada 1 gün katı gıda verilmez.`,
      algorithmSummary: `Günde 1 ana öğün (14:30). Toplam ${dailyMeatKg} kg çiğ karkas et (sığır/tavuk/kemikli sakatat) ve taze su.`,
      meals: [
        {
          time: '14:30',
          portionGram: Math.round(dailyMeatKg * 1000),
          feedType: 'Kemikli Bütün Dana/Tavuk Karkası + Taurin/Kalsiyum Takviyesi',
        },
      ],
    };
  }
}

/**
 * KEMİRGENLER GRUBU (RODENTIA / RODENTS)
 * Kunduzlar, sıçanlar, kapibaralar, oklu kirpiler vb.
 * Biyolojik Özellik: Sürekli uzayan kesici dişler, çok yüksek bazal metabolizma hızı.
 * Beslenme Mantığı: Gececil (nocturnal) beslenme eğilimi, lifli kemirme odunları, pelet ve tohumlar.
 * Dozaj Mantığı: Yüksek metabolizma hızı sebebiyle kg başına yüksek doz ve sık uygulama gerektirir.
 */
export abstract class Rodent extends Animal {
  protected incisorGrowthRateMmWeek: number;
  protected requiresGnawingWood: boolean;

  constructor(
    id: string,
    name: string,
    speciesName: string,
    weightKg: number,
    ageYears: number,
    incisorGrowthRateMmWeek = 2.5,
    requiresGnawingWood = true
  ) {
    super(id, name, speciesName, weightKg, ageYears);
    this.incisorGrowthRateMmWeek = incisorGrowthRateMmWeek;
    this.requiresGnawingWood = requiresGnawingWood;
  }

  public getGroupFamily(): string {
    return 'Kemirgenler (Rodentia)';
  }

  public isGnawingWoodRequired(): boolean {
    return this.requiresGnawingWood;
  }

  /**
   * Kemirgenler Dozaj Algoritması (Polimorfik Uygulama)
   */
  public getDosage(medicine: MedicineType): DosageResult {
    // Kleiber kuralı: Küçük cüsseli hayvanların metabolizması çok hızlıdır.
    // Bu yüzden mg/kg dozu büyük memelilere göre 2-3 kat fazladır.
    let mgPerKg = 1.2;
    let frequency = 3;
    let route = 'İçme suyuna katılarak veya aromalı oral şurup';
    let warning = 'Kemirgenlerde sindirim durması (GI Stasis) ölümcüldür; iştah kaybı anında hekime bildirilmelidir.';

    switch (medicine) {
      case 'sedative':
        mgPerKg = 0.85;
        frequency = 1;
        route = 'İnhalasyon (İzofluran gaz) veya Deri altı (SC)';
        warning = 'Hipotermi riski çok yüksektir; operasyon süresince ısıtıcı ped altında tutulmalıdır.';
        break;
      case 'painkiller':
        mgPerKg = 1.5; // Karprofen / Meloksikam yüksek doz
        frequency = 2;
        route = 'Meyve püresi içinde oral damla';
        warning = 'Metabolizma hızı nedeniyle 12 saatte bir tekrarlanmalıdır.';
        break;
      case 'antibiotic':
        mgPerKg = 15.0; // Enrofloksasin / Trimetoprim
        frequency = 2;
        route = 'Oral solüsyon';
        warning = 'Penisilin türevleri kemirgenlerde körbağırsak disbiyozisi yaparak öldürebilir!';
        break;
      case 'vitamin':
        mgPerKg = 4.0; // Özellikle C vitamini (kobay/kapibara sentezleyemez)
        frequency = 1;
        route = 'Doğrudan ağza damlalıkla';
        warning = 'Suda çabuk okside olduğundan suluk yerine taze tabağa verilmelidir.';
        break;
      case 'vaccine':
        mgPerKg = 0.2;
        frequency = 1;
        route = 'Deri altı (SC)';
        warning = 'Kemirgen türüne özel leptospiroz veya viral aşı protokolü uygulanır.';
        break;
    }

    const totalMg = Math.round(this.weightKg * mgPerKg * 100) / 100;

    return {
      medicineName: medicine.toUpperCase(),
      animalName: this.name,
      species: this.speciesName,
      group: 'Kemirgenler (Rodentia)',
      weightKg: this.weightKg,
      dosageMg: totalMg,
      frequencyPerDay: frequency,
      administrationRoute: route,
      calculationFormula: `${this.weightKg} kg × ${mgPerKg} mg/kg = ${totalMg} mg (${frequency}x/gün - Hızlı Metabolizma)`,
      veterinaryWarning: warning,
      specialMetabolicNote: 'Kleiber Metabolik Yasası: Küçük kütlede ilaç yarılanma ömrü çok kısadır, doz sıklığı yüksektir.',
    };
  }

  /**
   * Kemirgenler Yem Takvimi Algoritması (Polimorfik Uygulama)
   * Kural: Günde 2 öğün (Sabah hafif yeşillik, Akşam ana pelet/tohum öğünü) + 24 saat kemirme materyali.
   */
  public getFeedSchedule(): FeedScheduleResult {
    // Ağırlığın yaklaşık %6 - %8'i (küçük kemirgen) veya %3 - %4'ü (kapibara/kunduz)
    const factor = this.weightKg > 20 ? 0.04 : 0.08;
    const dailyFoodKg = Math.round(this.weightKg * factor * 100) / 100;
    const morningPortion = Math.round(dailyFoodKg * 0.3 * 1000);
    const eveningPortion = Math.round(dailyFoodKg * 0.7 * 1000);

    return {
      animalName: this.name,
      species: this.speciesName,
      group: 'Kemirgenler (Rodentia)',
      mealsPerDay: 2,
      totalDailyWeightKg: dailyFoodKg,
      digestiveStrategy: 'Çift Sindirim / Sekotropi Eğilimli & Kemirici Diş Anatomisi',
      fastingOrEnrichmentNote: 'Kesintisiz Kemirme Ağacı (Söğüt/Kavak dalları) kafeste zorunludur; dişler haftada 2-3 mm uzar.',
      algorithmSummary: `Günde 2 öğün (Sabah 08:30 hafif yeşillik lifi, Akşam 19:30 gececil ana öğün). Toplam ${dailyFoodKg} kg.`,
      meals: [
        {
          time: '08:30',
          portionGram: morningPortion,
          feedType: 'Lifli Taze Yeşillikler (Karahindiba, Marul) + Çam/Söğüt Kemirme Odunları',
        },
        {
          time: '19:30',
          portionGram: eveningPortion,
          feedType: 'Zenginleştirilmiş Kemirgen Peleti, Tohum Karışımı ve Kök Sebzeler (Havuç, Pancar)',
        },
      ],
    };
  }
}

// ================= SOMUT TÜRLER (CONCRETE SPECIES CLASSES) =================

// Atgiller
export class Horse extends Equine {
  constructor(id: string, name: string, weightKg: number, ageYears: number) {
    super(id, name, 'Equus caballus (Evcil At)', weightKg, ageYears, 40, 16);
  }
}

export class Zebra extends Equine {
  constructor(id: string, name: string, weightKg: number, ageYears: number) {
    super(id, name, 'Equus quagga (Bozkır Zebrası)', weightKg, ageYears, 60, 14);
  }
}

export class Donkey extends Equine {
  constructor(id: string, name: string, weightKg: number, ageYears: number) {
    super(id, name, 'Equus asinus (Eşek)', weightKg, ageYears, 50, 12);
  }
}

// Kedigiller
export class Tiger extends Felid {
  constructor(id: string, name: string, weightKg: number, ageYears: number) {
    super(id, name, 'Panthera tigris (Bengal Kaplanı)', weightKg, ageYears, 'Salı');
  }
}

export class Lion extends Felid {
  constructor(id: string, name: string, weightKg: number, ageYears: number) {
    super(id, name, 'Panthera leo (Afrika Aslanı)', weightKg, ageYears, 'Çarşamba');
  }
}

export class Leopard extends Felid {
  constructor(id: string, name: string, weightKg: number, ageYears: number) {
    super(id, name, 'Panthera pardus (Leopar)', weightKg, ageYears, 'Perşembe');
  }
}

// Kemirgenler
export class Beaver extends Rodent {
  constructor(id: string, name: string, weightKg: number, ageYears: number) {
    super(id, name, 'Castor fiber (Avrasya Kunduzu)', weightKg, ageYears, 3.0, true);
  }
}

export class Rat extends Rodent {
  constructor(id: string, name: string, weightKg: number, ageYears: number) {
    super(id, name, 'Rattus norvegicus (Kahverengi Sıçan)', weightKg, ageYears, 2.0, true);
  }
}

export class Capybara extends Rodent {
  constructor(id: string, name: string, weightKg: number, ageYears: number) {
    super(id, name, 'Hydrochoerus hydrochaeris (Kapibara)', weightKg, ageYears, 2.2, true);
  }
}

/**
 * HAYVANAT BAHÇESİ YÖNETİM SİSTEMİ (ZOO MANAGEMENT SYSTEM)
 * Polimorfizmin gücünü gösteren ana kontrolör sınıfı.
 *
 * KRİTİK OOP İLKESİ:
 * Sistem hayvanların somut tipini (At mı, Kaplan mı, Kunduz mu) tek tek kontrol ETMEZ (if-else kirliliği yoktur).
 * Sadece Animal referansı üzerinden `animal.getDosage()` ve `animal.getFeedSchedule()` çağırır.
 * Çalışma zamanında (runtime) doğru metot otomatik olarak tetiklenir (Dynamic Binding / Geç Bağlama).
 */
export class ZooManagementSystem {
  private animals: Animal[] = [];

  constructor() {
    this.seedDefaultAnimals();
  }

  public addAnimal(animal: Animal): void {
    this.animals.push(animal);
  }

  public removeAnimal(id: string): boolean {
    const initialLen = this.animals.length;
    this.animals = this.animals.filter((a) => a.getId() !== id);
    return this.animals.length < initialLen;
  }

  public getAllAnimals(): Animal[] {
    return [...this.animals];
  }

  public getAnimalById(id: string): Animal | undefined {
    return this.animals.find((a) => a.getId() === id);
  }

  /**
   * POLİMORFİK ÇAĞRI ÖRNEĞİ 1: Toplu Besleme Takvimi Hesaplama
   * Her hayvan nesnesi kendi sınıfındaki getFeedSchedule() metodunu çalıştırır.
   */
  public calculateAllFeedSchedules(): FeedScheduleResult[] {
    return this.animals.map((animal) => animal.getFeedSchedule());
  }

  /**
   * POLİMORFİK ÇAĞRI ÖRNEĞİ 2: Toplu İlaç Dozajı Hesaplama
   * Her hayvan nesnesi kendi sınıfındaki getDosage() metodunu çalıştırır.
   */
  public calculateAllDosages(medicine: MedicineType): DosageResult[] {
    return this.animals.map((animal) => animal.getDosage(medicine));
  }

  /**
   * Başlangıç Örnek Hayvanları
   */
  private seedDefaultAnimals(): void {
    this.animals = [
      new Horse('eq-1', 'Şahbatur', 520, 7),
      new Zebra('eq-2', 'Çizgili Gazi', 310, 4),
      new Donkey('eq-3', 'Karakaçan', 190, 5),
      new Tiger('fel-1', 'Şerehan', 220, 6),
      new Lion('fel-2', 'Kral Simba', 195, 8),
      new Leopard('fel-3', 'Pars Gece', 68, 3),
      new Beaver('rod-1', 'Mimar Çakıl', 24, 3),
      new Capybara('rod-2', 'Piko', 48, 2),
      new Rat('rod-3', 'Remi', 0.45, 1),
    ];
  }
}
