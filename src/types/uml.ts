export type Visibility = '+' | '-' | '#' | '~';

export interface UMLAttribute {
  id: string;
  name: string;
  type: string;
  visibility: Visibility;
  isStatic?: boolean;
  defaultValue?: string;
  description?: string;
}

export interface UMLMethod {
  id: string;
  name: string;
  returnType: string;
  visibility: Visibility;
  parameters: { name: string; type: string }[];
  isAbstract?: boolean;
  isOverride?: boolean;
  description?: string;
  algorithmNote?: string;
}

export interface UMLClassNode {
  id: string;
  name: string;
  stereotype?: 'abstract' | 'interface' | 'enumeration' | 'class';
  isAbstract?: boolean;
  category: 'core' | 'equine' | 'felid' | 'rodent' | 'manager' | 'dto';
  description: string;
  attributes: UMLAttribute[];
  methods: UMLMethod[];
  x: number;
  y: number;
  width: number;
  height: number;
  colorTheme: {
    border: string;
    headerBg: string;
    headerText: string;
    bodyBg: string;
    accent: string;
  };
}

export interface UMLRelationship {
  id: string;
  sourceId: string;
  targetId: string;
  type: 'inheritance' | 'composition' | 'aggregation' | 'association' | 'dependency';
  label?: string;
  multiplicitySource?: string;
  multiplicityTarget?: string;
}

export type MedicineType = 'painkiller' | 'antibiotic' | 'sedative' | 'vitamin' | 'vaccine';

export interface MedicineInfo {
  id: MedicineType;
  nameTr: string;
  descriptionTr: string;
}

export interface DosageResult {
  medicineName: string;
  animalName: string;
  species: string;
  group: string;
  weightKg: number;
  dosageMg: number;
  frequencyPerDay: number;
  administrationRoute: string; // Oral, İntramüsküler, Yemle Karışık
  calculationFormula: string;
  veterinaryWarning?: string;
  specialMetabolicNote: string;
}

export interface FeedMeal {
  time: string;
  portionGram: number;
  feedType: string;
}

export interface FeedScheduleResult {
  animalName: string;
  species: string;
  group: string;
  mealsPerDay: number;
  meals: FeedMeal[];
  totalDailyWeightKg: number;
  digestiveStrategy: string;
  fastingOrEnrichmentNote: string;
  algorithmSummary: string;
}
