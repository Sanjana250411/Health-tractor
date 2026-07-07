export type HeightUnit = 'cm' | 'm' | 'ft-in';
export type WeightUnit = 'kg' | 'lbs';
export type Gender = 'male' | 'female';

export type BMICategory = 'underweight' | 'normal' | 'overweight' | 'obese';

export interface BMIInput {
  name: string;
  age: string;
  gender: Gender;
  heightUnit: HeightUnit;
  weightUnit: WeightUnit;
  heightCm: string;
  heightM: string;
  heightFt: string;
  heightIn: string;
  weightVal: string;
}

export interface BMIResult {
  name: string;
  age: number;
  gender: Gender;
  height: string; // descriptive height e.g., "175 cm" or "5'9\""
  weight: string; // descriptive weight e.g., "70 kg" or "154 lbs"
  bmi: number;
  category: BMICategory;
  status: string; // friendly title e.g. "Normal Weight"
  advice: string;
  quote: string;
}

export interface HealthTip {
  icon: string;
  title: string;
  description: string;
  color: string;
}
