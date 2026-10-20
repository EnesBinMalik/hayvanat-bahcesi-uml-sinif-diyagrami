import { UMLClassNode, UMLRelationship } from '../types/uml';

export interface CodeTemplates {
  typescript: string;
  java: string;
  csharp: string;
  python: string;
}

export const UML_CLASSES: UMLClassNode[] = [
  // 1. ANIMAL (SOYUT ANA SINIF)
  {
    id: 'Animal',
    name: 'Animal',
    stereotype: 'abstract',
    isAbstract: true,
    category: 'core',
    description: 'Tüm hayvan türleri için ortak öznitelikleri barındıran ve polimorfik sözleşmeyi belirleyen soyut ana sınıf.',
    x: 480,
    y: 40,
    width: 380,
    height: 320,
    colorTheme: {
      border: 'border-amber-500/80',
      headerBg: 'bg-gradient-to-r from-amber-950/80 to-amber-900/60',
      headerText: 'text-amber-200',
      bodyBg: 'bg-slate-900/95',
      accent: 'amber-400',
    },
    attributes: [
      { id: 'a1', name: 'id', type: 'String', visibility: '#', description: 'Benzersiz kimlik kodu' },
      { id: 'a2', name: 'name', type: 'String', visibility: '#', description: 'Hayvanın bireysel adı / lakabı' },
      { id: 'a3', name: 'speciesName', type: 'String', visibility: '#', description: 'Tür adı (tüm gruplar için ortak)' },
      { id: 'a4', name: 'weightKg', type: 'Double', visibility: '#', description: 'Ağırlık (kg cinsinden, ortak)' },
      { id: 'a5', name: 'ageYears', type: 'Integer', visibility: '#', description: 'Yaş (ortak bilgi)' },
      { id: 'a6', name: 'healthStatus', type: 'String', visibility: '#', description: 'Sağlık durumu kaydı' },
    ],
    methods: [
      {
        id: 'm1',
        name: 'Animal',
        returnType: '',
        visibility: '+',
        parameters: [
          { name: 'id', type: 'String' },
          { name: 'name', type: 'String' },
          { name: 'species', type: 'String' },
          { name: 'weight', type: 'Double' },
          { name: 'age', type: 'Integer' },
        ],
        description: 'Kurucu metot',
      },
      { id: 'm2', name: 'getName', returnType: 'String', visibility: '+', parameters: [] },
      { id: 'm3', name: 'getSpeciesName', returnType: 'String', visibility: '+', parameters: [] },
      { id: 'm4', name: 'getWeightKg', returnType: 'Double', visibility: '+', parameters: [] },
      { id: 'm5', name: 'setWeightKg', returnType: 'void', visibility: '+', parameters: [{ name: 'weight', type: 'Double' }] },
      { id: 'm6', name: 'getAgeYears', returnType: 'Integer', visibility: '+', parameters: [] },
      {
        id: 'm7',
        name: 'getDosage',
        returnType: 'DosageResult',
        visibility: '+',
        parameters: [{ name: 'medicine', type: 'MedicineType' }],
        isAbstract: true,
        description: 'Polimorfik Sözleşme: İlaç dozajını her türe özgü metabolizmayla hesaplar.',
        algorithmNote: 'Alt sınıflar tarafından mutlaka ezilmelidir (override).',
      },
      {
        id: 'm8',
        name: 'getFeedSchedule',
        returnType: 'FeedScheduleResult',
        visibility: '+',
        parameters: [],
        isAbstract: true,
        description: 'Polimorfik Sözleşme: Sindirim sistemi yapısına göre yem takvimini hesaplar.',
        algorithmNote: 'Atlar, kedigiller ve kemirgenler için farklı algoritmalar çalışır.',
      },
      { id: 'm9', name: 'getGroupFamily', returnType: 'String', visibility: '+', parameters: [], isAbstract: true },
    ],
  },

  // 2. EQUINE (ATGİLLER SOYUT GRUP SINIFI)
  {
    id: 'Equine',
    name: 'Equine',
    stereotype: 'abstract',
    isAbstract: true,
    category: 'equine',
    description: 'Atlar, zebralar ve eşekler grubu. Tek mideli körbağırsak fermentörleri (hindgut fermenter).',
    x: 40,
    y: 430,
    width: 380,
    height: 290,
    colorTheme: {
      border: 'border-emerald-500/80',
      headerBg: 'bg-gradient-to-r from-emerald-950/80 to-emerald-900/60',
      headerText: 'text-emerald-200',
      bodyBg: 'bg-slate-900/95',
      accent: 'emerald-400',
    },
    attributes: [
      { id: 'eq_a1', name: 'hoofCareCycleDays', type: 'Integer', visibility: '#', description: 'Nal / tırnak bakım periyodu (gün)' },
      { id: 'eq_a2', name: 'dailyGrazingHoursNeeded', type: 'Double', visibility: '#', description: 'Günlük otlama gereksinimi' },
    ],
    methods: [
      {
        id: 'eq_m1',
        name: 'Equine',
        returnType: '',
        visibility: '+',
        parameters: [
          { name: 'id', type: 'String' },
          { name: 'name', type: 'String' },
          { name: 'species', type: 'String' },
          { name: 'weight', type: 'Double' },
          { name: 'age', type: 'Integer' },
        ],
      },
      {
        id: 'eq_m2',
        name: 'getDosage',
        returnType: 'DosageResult',
        visibility: '+',
        parameters: [{ name: 'medicine', type: 'MedicineType' }],
        isOverride: true,
        description: 'Atgiller dozajı: Duyarlı körbağırsak florası; sedasyon ~0.22 mg/kg, kaba yeme karıştırılır.',
      },
      {
        id: 'eq_m3',
        name: 'getFeedSchedule',
        returnType: 'FeedScheduleResult',
        visibility: '+',
        parameters: [],
        isOverride: true,
        description: 'Atgiller besleme takvimi: Ağırlığın %2.2’si kuru ot; günde 4 eşit öğün (mide asidi durmaz).',
      },
      { id: 'eq_m4', name: 'getHoofCareCycleDays', returnType: 'Integer', visibility: '+', parameters: [] },
      { id: 'eq_m5', name: 'getGroupFamily', returnType: 'String', visibility: '+', parameters: [], isOverride: true },
    ],
  },

  // 3. FELID (KEDİGİLLER SOYUT GRUP SINIFI)
  {
    id: 'Felid',
    name: 'Felid',
    stereotype: 'abstract',
    isAbstract: true,
    category: 'felid',
    description: 'Kaplanlar, aslanlar, leoparlar grubu. Zorunlu etçiller (obligate carnivores).',
    x: 480,
    y: 430,
    width: 380,
    height: 290,
    colorTheme: {
      border: 'border-orange-500/80',
      headerBg: 'bg-gradient-to-r from-orange-950/80 to-orange-900/60',
      headerText: 'text-orange-200',
      bodyBg: 'bg-slate-900/95',
      accent: 'orange-400',
    },
    attributes: [
      { id: 'fel_a1', name: 'isObligateCarnivore', type: 'Boolean = true', visibility: '#', description: 'Zorunlu etçillik kuralı' },
      { id: 'fel_a2', name: 'fastingDayName', type: 'String', visibility: '#', description: 'Haftalık açlık/oruç günü' },
    ],
    methods: [
      {
        id: 'fel_m1',
        name: 'Felid',
        returnType: '',
        visibility: '+',
        parameters: [
          { name: 'id', type: 'String' },
          { name: 'name', type: 'String' },
          { name: 'species', type: 'String' },
          { name: 'weight', type: 'Double' },
          { name: 'age', type: 'Integer' },
        ],
      },
      {
        id: 'fel_m2',
        name: 'getDosage',
        returnType: 'DosageResult',
        visibility: '+',
        parameters: [{ name: 'medicine', type: 'MedicineType' }],
        isOverride: true,
        description: 'Kedigiller dozajı: Karaciğer glukuronil enzim eksikliği; parasetamol toksik! Dart/etin içinde verilir.',
      },
      {
        id: 'fel_m3',
        name: 'getFeedSchedule',
        returnType: 'FeedScheduleResult',
        visibility: '+',
        parameters: [],
        isOverride: true,
        description: 'Kedigiller besleme takvimi: Günde 1 ana çiğ et öğünü (14:30) + haftada 1 gün sindirim orucu.',
      },
      { id: 'fel_m4', name: 'getFastingDayName', returnType: 'String', visibility: '+', parameters: [] },
      { id: 'fel_m5', name: 'getGroupFamily', returnType: 'String', visibility: '+', parameters: [], isOverride: true },
    ],
  },

  // 4. RODENT (KEMİRGENLER SOYUT GRUP SINIFI)
  {
    id: 'Rodent',
    name: 'Rodent',
    stereotype: 'abstract',
    isAbstract: true,
    category: 'rodent',
    description: 'Sıçanlar, kunduzlar, kapibaralar grubu. Sürekli büyüyen kesiciler ve ultra hızlı metabolizma.',
    x: 920,
    y: 430,
    width: 380,
    height: 290,
    colorTheme: {
      border: 'border-cyan-500/80',
      headerBg: 'bg-gradient-to-r from-cyan-950/80 to-cyan-900/60',
      headerText: 'text-cyan-200',
      bodyBg: 'bg-slate-900/95',
      accent: 'cyan-400',
    },
    attributes: [
      { id: 'rod_a1', name: 'incisorGrowthRateMmWeek', type: 'Double', visibility: '#', description: 'Diş uzama hızı (mm/hafta)' },
      { id: 'rod_a2', name: 'requiresGnawingWood', type: 'Boolean = true', visibility: '#', description: 'Kemirme odunu zorunluluğu' },
    ],
    methods: [
      {
        id: 'rod_m1',
        name: 'Rodent',
        returnType: '',
        visibility: '+',
        parameters: [
          { name: 'id', type: 'String' },
          { name: 'name', type: 'String' },
          { name: 'species', type: 'String' },
          { name: 'weight', type: 'Double' },
          { name: 'age', type: 'Integer' },
        ],
      },
      {
        id: 'rod_m2',
        name: 'getDosage',
        returnType: 'DosageResult',
        visibility: '+',
        parameters: [{ name: 'medicine', type: 'MedicineType' }],
        isOverride: true,
        description: 'Kemirgenler dozajı: Kleiber Yasası (hızlı eliminasyon). Yüksek mg/kg dozu ve günde 2-3 kez uygulama.',
      },
      {
        id: 'rod_m3',
        name: 'getFeedSchedule',
        returnType: 'FeedScheduleResult',
        visibility: '+',
        parameters: [],
        isOverride: true,
        description: 'Kemirgenler besleme takvimi: Sabah lifli yeşillik, akşam tohum/pelet ve 7/24 kemirme dalı.',
      },
      { id: 'rod_m4', name: 'isGnawingWoodRequired', returnType: 'Boolean', visibility: '+', parameters: [] },
      { id: 'rod_m5', name: 'getGroupFamily', returnType: 'String', visibility: '+', parameters: [], isOverride: true },
    ],
  },

  // 5. ATGİLLER SOMUT TÜRLERİ (HORSE, ZEBRA, DONKEY)
  {
    id: 'Horse',
    name: 'Horse',
    stereotype: 'class',
    category: 'equine',
    description: 'At türü (Equus caballus)',
    x: 20,
    y: 770,
    width: 170,
    height: 110,
    colorTheme: {
      border: 'border-emerald-600/60',
      headerBg: 'bg-emerald-950/60',
      headerText: 'text-emerald-300',
      bodyBg: 'bg-slate-900/90',
      accent: 'emerald-400',
    },
    attributes: [],
    methods: [
      { id: 'h_m1', name: 'Horse', returnType: '', visibility: '+', parameters: [{ name: 'id, name, weight, age', type: '...' }] },
    ],
  },
  {
    id: 'Zebra',
    name: 'Zebra',
    stereotype: 'class',
    category: 'equine',
    description: 'Zebra türü (Equus quagga)',
    x: 200,
    y: 770,
    width: 170,
    height: 110,
    colorTheme: {
      border: 'border-emerald-600/60',
      headerBg: 'bg-emerald-950/60',
      headerText: 'text-emerald-300',
      bodyBg: 'bg-slate-900/90',
      accent: 'emerald-400',
    },
    attributes: [],
    methods: [
      { id: 'z_m1', name: 'Zebra', returnType: '', visibility: '+', parameters: [{ name: 'id, name, weight, age', type: '...' }] },
    ],
  },
  {
    id: 'Donkey',
    name: 'Donkey',
    stereotype: 'class',
    category: 'equine',
    description: 'Eşek türü (Equus asinus)',
    x: 380,
    y: 770,
    width: 170,
    height: 110,
    colorTheme: {
      border: 'border-emerald-600/60',
      headerBg: 'bg-emerald-950/60',
      headerText: 'text-emerald-300',
      bodyBg: 'bg-slate-900/90',
      accent: 'emerald-400',
    },
    attributes: [],
    methods: [
      { id: 'd_m1', name: 'Donkey', returnType: '', visibility: '+', parameters: [{ name: 'id, name, weight, age', type: '...' }] },
    ],
  },

  // 6. KEDİGİLLER SOMUT TÜRLERİ (TIGER, LION, LEOPARD)
  {
    id: 'Tiger',
    name: 'Tiger',
    stereotype: 'class',
    category: 'felid',
    description: 'Kaplan türü (Panthera tigris)',
    x: 560,
    y: 770,
    width: 170,
    height: 110,
    colorTheme: {
      border: 'border-orange-600/60',
      headerBg: 'bg-orange-950/60',
      headerText: 'text-orange-300',
      bodyBg: 'bg-slate-900/90',
      accent: 'orange-400',
    },
    attributes: [],
    methods: [
      { id: 't_m1', name: 'Tiger', returnType: '', visibility: '+', parameters: [{ name: 'id, name, weight, age', type: '...' }] },
    ],
  },
  {
    id: 'Lion',
    name: 'Lion',
    stereotype: 'class',
    category: 'felid',
    description: 'Aslan türü (Panthera leo)',
    x: 740,
    y: 770,
    width: 170,
    height: 110,
    colorTheme: {
      border: 'border-orange-600/60',
      headerBg: 'bg-orange-950/60',
      headerText: 'text-orange-300',
      bodyBg: 'bg-slate-900/90',
      accent: 'orange-400',
    },
    attributes: [],
    methods: [
      { id: 'l_m1', name: 'Lion', returnType: '', visibility: '+', parameters: [{ name: 'id, name, weight, age', type: '...' }] },
    ],
  },

  // 7. KEMİRGENLER SOMUT TÜRLERİ (BEAVER, CAPYBARA, RAT)
  {
    id: 'Beaver',
    name: 'Beaver',
    stereotype: 'class',
    category: 'rodent',
    description: 'Kunduz türü (Castor fiber)',
    x: 920,
    y: 770,
    width: 170,
    height: 110,
    colorTheme: {
      border: 'border-cyan-600/60',
      headerBg: 'bg-cyan-950/60',
      headerText: 'text-cyan-300',
      bodyBg: 'bg-slate-900/90',
      accent: 'cyan-400',
    },
    attributes: [],
    methods: [
      { id: 'b_m1', name: 'Beaver', returnType: '', visibility: '+', parameters: [{ name: 'id, name, weight, age', type: '...' }] },
    ],
  },
  {
    id: 'Rat',
    name: 'Rat',
    stereotype: 'class',
    category: 'rodent',
    description: 'Sıçan türü (Rattus norvegicus)',
    x: 1100,
    y: 770,
    width: 170,
    height: 110,
    colorTheme: {
      border: 'border-cyan-600/60',
      headerBg: 'bg-cyan-950/60',
      headerText: 'text-cyan-300',
      bodyBg: 'bg-slate-900/90',
      accent: 'cyan-400',
    },
    attributes: [],
    methods: [
      { id: 'r_m1', name: 'Rat', returnType: '', visibility: '+', parameters: [{ name: 'id, name, weight, age', type: '...' }] },
    ],
  },

  // 8. ZOO MANAGEMENT SYSTEM (KONTROLÖR & POLİMORFİZM ÇAĞIRICI)
  {
    id: 'ZooManagementSystem',
    name: 'ZooManagementSystem',
    stereotype: 'class',
    category: 'manager',
    description: 'Hayvan koleksiyonunu yöneten ve polimorfik çağrılarla (dynamic dispatch) tüm hayvanat bahçesini koordine eden sistem.',
    x: 40,
    y: 40,
    width: 390,
    height: 270,
    colorTheme: {
      border: 'border-purple-500/80',
      headerBg: 'bg-gradient-to-r from-purple-950/80 to-purple-900/60',
      headerText: 'text-purple-200',
      bodyBg: 'bg-slate-900/95',
      accent: 'purple-400',
    },
    attributes: [
      { id: 'z_a1', name: 'animals', type: 'List<Animal>', visibility: '-', description: 'Polimorfik hayvan koleksiyonu' },
    ],
    methods: [
      { id: 'z_m1', name: 'addAnimal', returnType: 'void', visibility: '+', parameters: [{ name: 'animal', type: 'Animal' }] },
      { id: 'z_m2', name: 'removeAnimal', returnType: 'Boolean', visibility: '+', parameters: [{ name: 'id', type: 'String' }] },
      { id: 'z_m3', name: 'getAllAnimals', returnType: 'List<Animal>', visibility: '+', parameters: [] },
      {
        id: 'z_m4',
        name: 'calculateAllDosages',
        returnType: 'List<DosageResult>',
        visibility: '+',
        parameters: [{ name: 'medicine', type: 'MedicineType' }],
        description: 'Polimorfik çağrı: Tüm hayvanlar için animal.getDosage() tetikler.',
      },
      {
        id: 'z_m5',
        name: 'calculateAllFeedSchedules',
        returnType: 'List<FeedScheduleResult>',
        visibility: '+',
        parameters: [],
        description: 'Polimorfik çağrı: Tüm hayvanlar için animal.getFeedSchedule() tetikler.',
      },
    ],
  },

  // 9. DTOs: DosageResult & FeedScheduleResult & MedicineType
  {
    id: 'DosageResult',
    name: 'DosageResult',
    stereotype: 'class',
    category: 'dto',
    description: 'Hesaplanan ilaç dozajı detaylarını döndüren veri aktarım nesnesi (DTO).',
    x: 920,
    y: 40,
    width: 250,
    height: 220,
    colorTheme: {
      border: 'border-blue-500/80',
      headerBg: 'bg-blue-950/70',
      headerText: 'text-blue-200',
      bodyBg: 'bg-slate-900/95',
      accent: 'blue-400',
    },
    attributes: [
      { id: 'dr_1', name: 'dosageMg', type: 'Double', visibility: '+', description: 'Hesaplanan miligram' },
      { id: 'dr_2', name: 'frequencyPerDay', type: 'Integer', visibility: '+', description: 'Günlük tekrar' },
      { id: 'dr_3', name: 'administrationRoute', type: 'String', visibility: '+', description: 'Uygulama yolu' },
      { id: 'dr_4', name: 'calculationFormula', type: 'String', visibility: '+', description: 'Formül ifadesi' },
      { id: 'dr_5', name: 'veterinaryWarning', type: 'String', visibility: '+', description: 'Kritik uyarı' },
    ],
    methods: [],
  },

  {
    id: 'FeedScheduleResult',
    name: 'FeedScheduleResult',
    stereotype: 'class',
    category: 'dto',
    description: 'Hesaplanan günlük yem takvimini ve porsiyonları döndüren veri aktarım nesnesi (DTO).',
    x: 1200,
    y: 40,
    width: 260,
    height: 220,
    colorTheme: {
      border: 'border-emerald-500/80',
      headerBg: 'bg-emerald-950/70',
      headerText: 'text-emerald-200',
      bodyBg: 'bg-slate-900/95',
      accent: 'emerald-400',
    },
    attributes: [
      { id: 'fs_1', name: 'mealsPerDay', type: 'Integer', visibility: '+', description: 'Öğün sayısı' },
      { id: 'fs_2', name: 'meals', type: 'List<Meal>', visibility: '+', description: 'Saatler ve tür' },
      { id: 'fs_3', name: 'totalDailyWeightKg', type: 'Double', visibility: '+', description: 'Toplam kg' },
      { id: 'fs_4', name: 'digestiveStrategy', type: 'String', visibility: '+', description: 'Sindirim stratejisi' },
      { id: 'fs_5', name: 'fastingOrEnrichmentNote', type: 'String', visibility: '+', description: 'Açlık/kemirme notu' },
    ],
    methods: [],
  },
];

export const UML_RELATIONSHIPS: UMLRelationship[] = [
  // Generalization (Inheritance): Subclasses -> Animal
  {
    id: 'rel_eq_an',
    sourceId: 'Equine',
    targetId: 'Animal',
    type: 'inheritance',
    label: 'is-a (Kalıtım)',
  },
  {
    id: 'rel_fel_an',
    sourceId: 'Felid',
    targetId: 'Animal',
    type: 'inheritance',
    label: 'is-a (Kalıtım)',
  },
  {
    id: 'rel_rod_an',
    sourceId: 'Rodent',
    targetId: 'Animal',
    type: 'inheritance',
    label: 'is-a (Kalıtım)',
  },

  // Concrete species -> Family Subclasses
  { id: 'rel_h_eq', sourceId: 'Horse', targetId: 'Equine', type: 'inheritance' },
  { id: 'rel_z_eq', sourceId: 'Zebra', targetId: 'Equine', type: 'inheritance' },
  { id: 'rel_d_eq', sourceId: 'Donkey', targetId: 'Equine', type: 'inheritance' },

  { id: 'rel_t_fel', sourceId: 'Tiger', targetId: 'Felid', type: 'inheritance' },
  { id: 'rel_l_fel', sourceId: 'Lion', targetId: 'Felid', type: 'inheritance' },

  { id: 'rel_b_rod', sourceId: 'Beaver', targetId: 'Rodent', type: 'inheritance' },
  { id: 'rel_r_rod', sourceId: 'Rat', targetId: 'Rodent', type: 'inheritance' },

  // Aggregation: ZooManagementSystem o--> Animal [0..*]
  {
    id: 'rel_zoo_an',
    sourceId: 'ZooManagementSystem',
    targetId: 'Animal',
    type: 'aggregation',
    label: 'has-many (animals)',
    multiplicitySource: '1',
    multiplicityTarget: '0..*',
  },

  // Dependencies: Animal ..> DosageResult & FeedScheduleResult
  {
    id: 'rel_an_dr',
    sourceId: 'Animal',
    targetId: 'DosageResult',
    type: 'dependency',
    label: 'returns',
  },
  {
    id: 'rel_an_fs',
    sourceId: 'Animal',
    targetId: 'FeedScheduleResult',
    type: 'dependency',
    label: 'returns',
  },
];

export const CODE_TEMPLATES: CodeTemplates = {
  typescript: `/**
 * =======================================================================
 * HAYVANAT BAHÇESİ YÖNETİM SİSTEMİ - POLİMORFİZM SINIF MİMARİSİ
 * =======================================================================
 * Tasarım ve Sistem Mimarisi : Enes Öztürk
 * Desen                        : Polimorfizm (Çok Biçimlilik) & Soyutlama (Abstraction)
 * Tarih                        : 2026
 * =======================================================================
 */

export type MedicineType = 'painkiller' | 'antibiotic' | 'sedative' | 'vitamin' | 'vaccine';

export interface DosageResult {
  medicineName: string;
  dosageMg: number;
  frequencyPerDay: number;
  route: string;
  formula: string;
  veterinaryWarning?: string;
}

export interface FeedScheduleResult {
  mealsPerDay: number;
  scheduleTimes: string[];
  totalDailyKg: number;
  dietDescription: string;
}

/**
 * SOYUT ANA SINIF: Animal
 * Tür adı, ağırlık, yaş gibi ortak verileri tutar.
 * getDosage() ve getFeedSchedule() metotlarını soyut bırakarak polimorfizmi zorunlu kılar.
 */
export abstract class Animal {
  protected id: string;
  protected name: string;
  protected speciesName: string; // Tür adı (ortak)
  protected weightKg: number;    // Ağırlık (ortak)
  protected ageYears: number;    // Yaş (ortak)

  constructor(id: string, name: string, speciesName: string, weightKg: number, ageYears: number) {
    this.id = id;
    this.name = name;
    this.speciesName = speciesName;
    this.weightKg = weightKg;
    this.ageYears = ageYears;
  }

  // Ortak getters
  public getName(): string { return this.name; }
  public getSpeciesName(): string { return this.speciesName; }
  public getWeightKg(): number { return this.weightKg; }
  public getAgeYears(): number { return this.ageYears; }

  // POLİMORFİK SOYUT METOTLAR (Alt sınıflar ezmek zorundadır)
  public abstract getDosage(medicine: MedicineType): DosageResult;
  public abstract getFeedSchedule(): FeedScheduleResult;
}

/**
 * 1. ATGİLLER (EQUIDAE - Atlar, Zebralar, Eşekler)
 * Tek mideli kaba otçul (hindgut fermenter).
 * Algoritma: Günde 4-5 öğün azar azar kuru ot; sedatif dozu hassas bağırsak katsayısı ile ~0.22 mg/kg.
 */
export abstract class Equine extends Animal {
  public override getDosage(medicine: MedicineType): DosageResult {
    const mgPerKg = medicine === 'sedative' ? 0.22 : 1.1;
    const totalMg = this.weightKg * mgPerKg;
    return {
      medicineName: medicine,
      dosageMg: totalMg,
      frequencyPerDay: 2,
      route: 'Oral pasta veya İntravenöz',
      formula: \`\${this.weightKg} kg × \${mgPerKg} mg/kg = \${totalMg} mg\`,
      veterinaryWarning: 'Hassas bağırsak florası: Linkozamid türevi antibiyotikler ölümcüldür!'
    };
  }

  public override getFeedSchedule(): FeedScheduleResult {
    const totalKg = this.weightKg * 0.022; // Ağırlığın %2.2'si
    return {
      mealsPerDay: 4,
      scheduleTimes: ['06:30', '11:30', '16:30', '21:30'],
      totalDailyKg: totalKg,
      dietDescription: 'Günde 4 öğün kaliteli çayır kuru otu ve yonca karması (sürekli mide asidi dengesi).'
    };
  }
}

/**
 * 2. KEDİGİLLER (FELIDAE - Kaplanlar, Aslanlar, Leoparlar)
 * Zorunlu etçiller (obligate carnivores).
 * Algoritma: Günde 1 ana et öğünü + haftada 1 oruç günü; karaciğer enzim profili dikkate alınır.
 */
export abstract class Felid extends Animal {
  public override getDosage(medicine: MedicineType): DosageResult {
    const mgPerKg = medicine === 'sedative' ? 0.55 : 0.2;
    const totalMg = this.weightKg * mgPerKg;
    return {
      medicineName: medicine,
      dosageMg: totalMg,
      frequencyPerDay: 1,
      route: 'Taze et içine enjekte veya uzaktan dart',
      formula: \`\${this.weightKg} kg × \${mgPerKg} mg/kg = \${totalMg} mg\`,
      veterinaryWarning: 'Glukuronil transferaz eksikliği: Parasetamol ve aspirin KESİNLİKLE yasaktır!'
    };
  }

  public override getFeedSchedule(): FeedScheduleResult {
    const totalKg = this.weightKg * 0.05; // Ağırlığın %5'i kemikli et
    return {
      mealsPerDay: 1,
      scheduleTimes: ['14:30'],
      totalDailyKg: totalKg,
      dietDescription: 'Günde tek ana öğün kemikli taze karkas et; haftada 1 gün sindirim orucu uygulanır.'
    };
  }
}

/**
 * 3. KEMİRGENLER (RODENTIA - Sıçanlar, Kunduzlar, Kapibaralar)
 * Yüksek metabolik hız (Kleiber Yasası) ve sürekli büyüyen kesiciler.
 * Algoritma: Günde 2 öğün lif/tohum + 7/24 kemirme dalı; hızlı metabolizma nedeniyle mg/kg dozu 2-3 kat yüksektir.
 */
export abstract class Rodent extends Animal {
  public override getDosage(medicine: MedicineType): DosageResult {
    const mgPerKg = medicine === 'sedative' ? 0.85 : 1.5;
    const totalMg = this.weightKg * mgPerKg;
    return {
      medicineName: medicine,
      dosageMg: totalMg,
      frequencyPerDay: 3,
      route: 'Oral şurup / İçme suyuna katılarak',
      formula: \`\${this.weightKg} kg × \${mgPerKg} mg/kg = \${totalMg} mg (Kleiber Hızlı Metabolizma)\`,
      veterinaryWarning: 'Hızlı ilaç atılımı nedeniyle günde 3 doz uygulanmalıdır.'
    };
  }

  public override getFeedSchedule(): FeedScheduleResult {
    const totalKg = this.weightKg * 0.06;
    return {
      mealsPerDay: 2,
      scheduleTimes: ['08:30', '19:30'],
      totalDailyKg: totalKg,
      dietDescription: 'Sabah taze yeşillik, akşam kemirgen peleti/tohumu + sürekli kavak/söğüt kemirme odunları.'
    };
  }
}

// Somut Tür Sınıfları
export class Horse extends Equine {}
export class Zebra extends Equine {}
export class Donkey extends Equine {}
export class Tiger extends Felid {}
export class Lion extends Felid {}
export class Beaver extends Rodent {}
export class Rat extends Rodent {}

/**
 * HAYVANAT BAHÇESİ YÖNETİM SİSTEMİ
 * Polimorfizmin gücü: if-else tipi kontroller OLMADAN,
 * dynamic dispatch sayesinde her hayvan kendi kuralını icra eder.
 */
export class ZooManagementSystem {
  private animals: Animal[] = [];

  public addAnimal(animal: Animal): void {
    this.animals.push(animal);
  }

  // POLİMORFİK ÇAĞRI
  public runDailyCareRoutine(): void {
    for (const animal of this.animals) {
      // Çalışma zamanında nesnenin gerçek tipine göre doğru metot çalıştırılır:
      const feed = animal.getFeedSchedule();
      const dose = animal.getDosage('sedative');
      console.log(\`[\${animal.getName()} - \${animal.getSpeciesName()}]: \${feed.dietDescription} | Dozaj: \${dose.dosageMg}mg\`);
    }
  }
}
`,

  java: `/**
 * =======================================================================
 * HAYVANAT BAHÇESİ YÖNETİM SİSTEMİ - JAVA POLİMORFİZM MİMARİSİ
 * =======================================================================
 * Tasarım ve Sistem Mimarisi : Enes Öztürk
 * Dil                          : Java 17+ (OOP / Polymorphism)
 * =======================================================================
 */

package com.zoo.management;

import java.util.*;

enum MedicineType {
    PAINKILLER, ANTIBIOTIC, SEDATIVE, VITAMIN, VACCINE
}

record DosageResult(String medicine, double dosageMg, int frequencyPerDay, String route, String formula, String warning) {}

record FeedScheduleResult(int mealsPerDay, List<String> times, double totalKg, String dietNote) {}

/**
 * SOYUT ANA SINIF: Animal
 * Tür adı, ağırlık, yaş tüm hayvanlar için ortaktır.
 */
public abstract class Animal {
    protected String id;
    protected String name;
    protected String speciesName; // Tür adı (ortak)
    protected double weightKg;    // Ağırlık (ortak)
    protected int ageYears;       // Yaş (ortak)

    public Animal(String id, String name, String speciesName, double weightKg, int ageYears) {
        this.id = id;
        this.name = name;
        this.speciesName = speciesName;
        this.weightKg = weightKg;
        this.ageYears = ageYears;
    }

    public String getName() { return name; }
    public String getSpeciesName() { return speciesName; }
    public double getWeightKg() { return weightKg; }
    public int getAgeYears() { return ageYears; }

    // POLİMORFİK SOYUT METOTLAR
    public abstract DosageResult getDosage(MedicineType medicine);
    public abstract FeedScheduleResult getFeedSchedule();
}

/**
 * AT VE ATGİLLER GRUBU (EQUIDAE)
 */
abstract class Equine extends Animal {
    public Equine(String id, String name, String speciesName, double weightKg, int ageYears) {
        super(id, name, speciesName, weightKg, ageYears);
    }

    @Override
    public DosageResult getDosage(MedicineType medicine) {
        double mgPerKg = (medicine == MedicineType.SEDATIVE) ? 0.22 : 1.1;
        double totalMg = this.weightKg * mgPerKg;
        return new DosageResult(
            medicine.name(), totalMg, 2, "Oral pasta / IV",
            weightKg + " kg * " + mgPerKg + " mg/kg = " + totalMg + " mg",
            "Atgillerde bağırsak florasına duyarlı antibiyotik seçilmelidir."
        );
    }

    @Override
    public FeedScheduleResult getFeedSchedule() {
        double dailyKg = weightKg * 0.022; // Ağırlığın %2.2'si kaba ot
        return new FeedScheduleResult(
            4, List.of("06:30", "11:30", "16:30", "21:30"), dailyKg,
            "Tek mideli körbağırsak fermentasyonu: Günde 4 eşit öğün kaba ot/yonca."
        );
    }
}

/**
 * KEDİGİLLER GRUBU (FELIDAE)
 */
abstract class Felid extends Animal {
    public Felid(String id, String name, String speciesName, double weightKg, int ageYears) {
        super(id, name, speciesName, weightKg, ageYears);
    }

    @Override
    public DosageResult getDosage(MedicineType medicine) {
        double mgPerKg = (medicine == MedicineType.SEDATIVE) ? 0.55 : 0.2;
        double totalMg = this.weightKg * mgPerKg;
        return new DosageResult(
            medicine.name(), totalMg, 1, "Et içinde oral veya Dart (IM)",
            weightKg + " kg * " + mgPerKg + " mg/kg = " + totalMg + " mg",
            "Glukuronil transferaz eksikliği: Parasetamol kedigiller için toksiktir!"
        );
    }

    @Override
    public FeedScheduleResult getFeedSchedule() {
        double dailyMeatKg = weightKg * 0.05; // Ağırlığın %5'i çiğ et
        return new FeedScheduleResult(
            1, List.of("14:30"), dailyMeatKg,
            "Zorunlu etçil: Günde 1 ana öğün taze karkas et + haftada 1 gün sindirim orucu."
        );
    }
}

/**
 * KEMİRGENLER GRUBU (RODENTIA)
 */
abstract class Rodent extends Animal {
    public Rodent(String id, String name, String speciesName, double weightKg, int ageYears) {
        super(id, name, speciesName, weightKg, ageYears);
    }

    @Override
    public DosageResult getDosage(MedicineType medicine) {
        // Kleiber metabolik yasası: Yüksek kütle/yüzey oranı -> hızlı metabolizma
        double mgPerKg = (medicine == MedicineType.SEDATIVE) ? 0.85 : 1.5;
        double totalMg = this.weightKg * mgPerKg;
        return new DosageResult(
            medicine.name(), totalMg, 3, "İçme suyu / Oral damla",
            weightKg + " kg * " + mgPerKg + " mg/kg = " + totalMg + " mg (Hızlı Metabolizma)",
            "Hızlı atılım nedeniyle günde 3 doz uygulanmalıdır."
        );
    }

    @Override
    public FeedScheduleResult getFeedSchedule() {
        double dailyKg = weightKg * 0.06;
        return new FeedScheduleResult(
            2, List.of("08:30", "19:30"), dailyKg,
            "Sabah yeşillik, akşam pelet/tohum + kesintisiz kemirme odunları."
        );
    }
}

// Somut Sınıflar
class Horse extends Equine { public Horse(String id, String name, double w, int a) { super(id, name, "Equus caballus", w, a); } }
class Zebra extends Equine { public Zebra(String id, String name, double w, int a) { super(id, name, "Equus quagga", w, a); } }
class Tiger extends Felid { public Tiger(String id, String name, double w, int a) { super(id, name, "Panthera tigris", w, a); } }
class Beaver extends Rodent { public Beaver(String id, String name, double w, int a) { super(id, name, "Castor fiber", w, a); } }

/**
 * POLİMORFİK YÖNETİM SİSTEMİ
 */
public class ZooManagementSystem {
    private List<Animal> animals = new ArrayList<>();

    public void addAnimal(Animal a) { animals.add(a); }

    // POLİMORFİZMİN GÜCÜ: Tip kontrolü (instanceof) olmadan çalışma zamanı yönlendirmesi
    public void processAllAnimals() {
        for (Animal animal : animals) {
            FeedScheduleResult feed = animal.getFeedSchedule(); // Dinamik Metot Çağrısı
            DosageResult dose = animal.getDosage(MedicineType.SEDATIVE);
            System.out.printf("[%s (%s)] Yem: %s | Doz: %.2f mg%n",
                animal.getName(), animal.getSpeciesName(), feed.dietNote(), dose.dosageMg());
        }
    }
}
`,

  csharp: `/**
 * =======================================================================
 * HAYVANAT BAHÇESİ YÖNETİM SİSTEMİ - C# POLİMORFİZM MİMARİSİ
 * =======================================================================
 * Tasarım ve Sistem Mimarisi : Enes Öztürk
 * Dil                          : C# (.NET 8)
 * =======================================================================
 */

namespace ZooManagementSystem;

public enum MedicineType { Painkiller, Antibiotic, Sedative, Vitamin, Vaccine }

public record DosageResult(string Medicine, double DosageMg, int Frequency, string Route, string Formula, string Warning);
public record FeedScheduleResult(int MealsPerDay, string[] Times, double TotalKg, string StrategyNotes);

/// <summary>
/// SOYUT ANA SINIF (ABSTRACT BASE CLASS)
/// </summary>
public abstract class Animal
{
    public string Id { get; protected set; }
    public string Name { get; protected set; }
    public string SpeciesName { get; protected set; } // Tür adı (ortak)
    public double WeightKg { get; set; }             // Ağırlık (ortak)
    public int AgeYears { get; set; }                // Yaş (ortak)

    protected Animal(string id, string name, string speciesName, double weightKg, int ageYears)
    {
        Id = id;
        Name = name;
        SpeciesName = speciesName;
        WeightKg = weightKg;
        AgeYears = ageYears;
    }

    // Polimorfik Soyut Metotlar
    public abstract DosageResult GetDosage(MedicineType medicine);
    public abstract FeedScheduleResult GetFeedSchedule();
}

/// <summary>
/// AT VE ATGİLLER GRUBU (EQUINES)
/// </summary>
public abstract class Equine : Animal
{
    protected Equine(string id, string name, string species, double weight, int age) 
        : base(id, name, species, weight, age) {}

    public override DosageResult GetDosage(MedicineType medicine)
    {
        double mgPerKg = medicine == MedicineType.Sedative ? 0.22 : 1.1;
        double total = WeightKg * mgPerKg;
        return new DosageResult(medicine.ToString(), total, 2, "Oral/IV", $"{WeightKg}kg x {mgPerKg}mg/kg = {total}mg", "Hassas floraya dikkat!");
    }

    public override FeedScheduleResult GetFeedSchedule()
    {
        return new FeedScheduleResult(4, new[] { "06:30", "11:30", "16:30", "21:30" }, WeightKg * 0.022, "Günde 4 öğün kaba ot (tek mideli otçul).");
    }
}

/// <summary>
/// KEDİGİLLER GRUBU (FELIDS)
/// </summary>
public abstract class Felid : Animal
{
    protected Felid(string id, string name, string species, double weight, int age) 
        : base(id, name, species, weight, age) {}

    public override DosageResult GetDosage(MedicineType medicine)
    {
        double mgPerKg = medicine == MedicineType.Sedative ? 0.55 : 0.2;
        double total = WeightKg * mgPerKg;
        return new DosageResult(medicine.ToString(), total, 1, "Dart / Taze et içi", $"{WeightKg}kg x {mgPerKg}mg/kg = {total}mg", "Parasetamol toksiktir!");
    }

    public override FeedScheduleResult GetFeedSchedule()
    {
        return new FeedScheduleResult(1, new[] { "14:30" }, WeightKg * 0.05, "Günde 1 ana çiğ et öğünü + haftada 1 gün açlık orucu.");
    }
}

/// <summary>
/// KEMİRGENLER GRUBU (RODENTS)
/// </summary>
public abstract class Rodent : Animal
{
    protected Rodent(string id, string name, string species, double weight, int age) 
        : base(id, name, species, weight, age) {}

    public override DosageResult GetDosage(MedicineType medicine)
    {
        double mgPerKg = medicine == MedicineType.Sedative ? 0.85 : 1.5;
        double total = WeightKg * mgPerKg;
        return new DosageResult(medicine.ToString(), total, 3, "Oral damla / Su", $"{WeightKg}kg x {mgPerKg}mg/kg = {total}mg (Kleiber)", "Hızlı metabolizma nedeniyle sık dozaj.");
    }

    public override FeedScheduleResult GetFeedSchedule()
    {
        return new FeedScheduleResult(2, new[] { "08:30", "19:30" }, WeightKg * 0.06, "Sabah yeşillik, akşam pelet + 7/24 kemirme odunu.");
    }
}

// Somut Sınıflar
public class Horse : Equine { public Horse(string id, string name, double w, int a) : base(id, name, "Equus caballus", w, a) {} }
public class Tiger : Felid { public Tiger(string id, string name, double w, int a) : base(id, name, "Panthera tigris", w, a) {} }
public class Beaver : Rodent { public Beaver(string id, string name, double w, int a) : base(id, name, "Castor fiber", w, a) {} }

/// <summary>
/// KONTROLÖR SİSTEMİ
/// </summary>
public class ZooSystem
{
    private readonly List<Animal> _animals = new();

    public void Add(Animal animal) => _animals.Add(animal);

    // Dynamic Polymorphic Dispatch
    public void ProcessCareSchedules()
    {
        foreach (var animal in _animals)
        {
            var schedule = animal.GetFeedSchedule();
            var dosage = animal.GetDosage(MedicineType.Sedative);
            Console.WriteLine($"{animal.Name} ({animal.SpeciesName}): {schedule.StrategyNotes}");
        }
    }
}
`,

  python: `"""
=======================================================================
HAYVANAT BAHÇESİ YÖNETİM SİSTEMİ - PYTHON POLİMORFİZM MİMARİSİ
=======================================================================
Tasarım ve Sistem Mimarisi : Enes Öztürk
Model                        : Polimorfizm & Abstract Base Classes (ABC)
=======================================================================
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import List

@dataclass
class DosageResult:
    medicine_name: str
    dosage_mg: float
    frequency_per_day: int
    route: str
    formula: str
    warning: str

@dataclass
class FeedScheduleResult:
    meals_per_day: int
    schedule_times: List[str]
    total_daily_kg: float
    diet_description: str

class Animal(ABC):
    """
    SOYUT ANA SINIF (ABSTRACT BASE CLASS)
    Tür adı, ağırlık, yaş tüm hayvan grupları için ortaktır.
    """
    def __init__(self, id_: str, name: str, species_name: str, weight_kg: float, age_years: int):
        self.id = id_
        self.name = name
        self.species_name = species_name  # Ortak öznitelik
        self.weight_kg = weight_kg        # Ortak öznitelik
        self.age_years = age_years        # Ortak öznitelik

    @abstractmethod
    def get_dosage(self, medicine_type: str) -> DosageResult:
        """Polimorfik sözleşme: Her hayvan grubu kendi metabolik formülüyle ezer."""
        pass

    @abstractmethod
    def get_feed_schedule(self) -> FeedScheduleResult:
        """Polimorfik sözleşme: Her hayvan grubu kendi sindirim algoritmasıyla ezer."""
        pass


class Equine(Animal):
    """Atlar, Zebralar, Eşekler (Atgiller)"""
    def get_dosage(self, medicine_type: str) -> DosageResult:
        mg_per_kg = 0.22 if medicine_type == "sedative" else 1.1
        total_mg = round(self.weight_kg * mg_per_kg, 2)
        return DosageResult(
            medicine_name=medicine_type,
            dosage_mg=total_mg,
            frequency_per_day=2,
            route="Oral pasta / İntravenöz",
            formula=f"{self.weight_kg} kg x {mg_per_kg} mg/kg = {total_mg} mg",
            warning="Hassas bağırsak florası: Belirli antibiyotikler ölümcüldür."
        )

    def get_feed_schedule(self) -> FeedScheduleResult:
        daily_kg = round(self.weight_kg * 0.022, 2)
        return FeedScheduleResult(
            meals_per_day=4,
            schedule_times=["06:30", "11:30", "16:30", "21:30"],
            total_daily_kg=daily_kg,
            diet_description="Günde 4 eşit öğün kaba çayır otu ve yonca (sürekli mide asidi dengesi)."
        )


class Felid(Animal):
    """Kaplanlar, Aslanlar, Leoparlar (Kedigiller)"""
    def get_dosage(self, medicine_type: str) -> DosageResult:
        mg_per_kg = 0.55 if medicine_type == "sedative" else 0.2
        total_mg = round(self.weight_kg * mg_per_kg, 2)
        return DosageResult(
            medicine_name=medicine_type,
            dosage_mg=total_mg,
            frequency_per_day=1,
            route="Taze et parçası içi veya Uzaktan dart",
            formula=f"{self.weight_kg} kg x {mg_per_kg} mg/kg = {total_mg} mg",
            warning="Glukuronidasyon eksikliği: Parasetamol ve aspirin ölümcüldür!"
        )

    def get_feed_schedule(self) -> FeedScheduleResult:
        daily_meat_kg = round(self.weight_kg * 0.05, 2)
        return FeedScheduleResult(
            meals_per_day=1,
            schedule_times=["14:30"],
            total_daily_kg=daily_meat_kg,
            diet_description="Günde 1 ana çiğ karkas et öğünü + haftada 1 gün sindirim orucu."
        )


class Rodent(Animal):
    """Kunduzlar, Sıçanlar, Kapibaralar (Kemirgenler)"""
    def get_dosage(self, medicine_type: str) -> DosageResult:
        mg_per_kg = 0.85 if medicine_type == "sedative" else 1.5
        total_mg = round(self.weight_kg * mg_per_kg, 2)
        return DosageResult(
            medicine_name=medicine_type,
            dosage_mg=total_mg,
            frequency_per_day=3,
            route="Aromalı oral damla / İçme suyuna katılarak",
            formula=f"{self.weight_kg} kg x {mg_per_kg} mg/kg = {total_mg} mg (Kleiber)",
            warning="Hızlı metabolik atılım nedeniyle günde 3 kez uygulanmalıdır."
        )

    def get_feed_schedule(self) -> FeedScheduleResult:
        daily_food_kg = round(self.weight_kg * 0.06, 2)
        return FeedScheduleResult(
            meals_per_day=2,
            schedule_times=["08:30", "19:30"],
            total_daily_kg=daily_food_kg,
            diet_description="Sabah lifli yeşillik, akşam pelet/tohum + 7/24 kemirme odunu."
        )


# Somut Türler
class Horse(Equine): pass
class Tiger(Felid): pass
class Beaver(Rodent): pass


class ZooManagementSystem:
    """Hayvanat Bahçesi Yönetim Sistemi (Polimorfik Kontrolör)"""
    def __init__(self):
        self.animals: List[Animal] = []

    def add_animal(self, animal: Animal):
        self.animals.append(animal)

    def execute_daily_care(self):
        # POLİMORFİZM: animal nesnesinin gerçek türü ne olursa olsun
        # dynamic binding ile ait olduğu sınıfın fonksiyonu çağrılır!
        for animal in self.animals:
            feed = animal.get_feed_schedule()
            dose = animal.get_dosage("sedative")
            print(f"[{animal.name} - {animal.species_name}] Yem: {feed.diet_description} | Doz: {dose.dosage_mg} mg")
`,
};
