import { useState, FormEvent } from 'react';
import { User, Calendar, Ruler, Weight, RefreshCw, AlertCircle } from 'lucide-react';
import { HeightUnit, WeightUnit, Gender, BMIInput, BMIResult, BMICategory } from '../types';

interface CalculatorProps {
  onCalculate: (result: BMIResult) => void;
  onReset: () => void;
}

export default function Calculator({ onCalculate, onReset }: CalculatorProps) {
  const [formData, setFormData] = useState<BMIInput>({
    name: '',
    age: '',
    gender: 'male',
    heightUnit: 'cm',
    weightUnit: 'kg',
    heightCm: '',
    heightM: '',
    heightFt: '',
    heightIn: '',
    weightVal: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BMIInput | 'global' | 'height' | 'weight', string>>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof BMIInput, value: string) => {
    // Prevent typing negative numbers or letters in numerical fields
    if (['age', 'heightCm', 'heightM', 'heightFt', 'heightIn', 'weightVal'].includes(field)) {
      // Allow only numbers and optionally one decimal for meters or weight
      if (field === 'heightM' || field === 'weightVal') {
        const cleaned = value.replace(/[^0-9.]/g, '');
        // Allow only one decimal point
        const parts = cleaned.split('.');
        if (parts.length > 2) return;
        setFormData((prev) => ({ ...prev, [field]: cleaned }));
      } else {
        const cleaned = value.replace(/[^0-9]/g, '');
        setFormData((prev) => ({ ...prev, [field]: cleaned }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }

    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
    if (field === 'heightCm' || field === 'heightM' || field === 'heightFt' || field === 'heightIn') {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.height;
        return copy;
      });
    }
    if (field === 'weightVal') {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.weight;
        return copy;
      });
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      age: '',
      gender: 'male',
      heightUnit: 'cm',
      weightUnit: 'kg',
      heightCm: '',
      heightM: '',
      heightFt: '',
      heightIn: '',
      weightVal: '',
    });
    setErrors({});
    setIsCalculating(false);
    onReset();
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    // Name is optional, but let's default to "Guest" if blank
    const nameVal = formData.name.trim() || 'Guest';

    // Age validation
    const ageNum = parseInt(formData.age, 10);
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(ageNum) || ageNum < 5) {
      newErrors.age = 'Age must be at least 5 years';
    } else if (ageNum > 120) {
      newErrors.age = 'Age must be 120 or below';
    }

    // Height validation
    let heightMeters = 0;
    let heightDescriptive = '';

    if (formData.heightUnit === 'cm') {
      const cmVal = parseFloat(formData.heightCm);
      if (!formData.heightCm) {
        newErrors.height = 'Height in centimeters is required';
      } else if (isNaN(cmVal) || cmVal <= 0) {
        newErrors.height = 'Height must be greater than 0';
      } else {
        heightMeters = cmVal / 100;
        heightDescriptive = `${formData.heightCm} cm`;
      }
    } else if (formData.heightUnit === 'm') {
      const mVal = parseFloat(formData.heightM);
      if (!formData.heightM) {
        newErrors.height = 'Height in meters is required';
      } else if (isNaN(mVal) || mVal <= 0) {
        newErrors.height = 'Height must be greater than 0';
      } else {
        heightMeters = mVal;
        heightDescriptive = `${formData.heightM} m`;
      }
    } else if (formData.heightUnit === 'ft-in') {
      const ftVal = parseFloat(formData.heightFt);
      const inVal = parseFloat(formData.heightIn || '0');

      if (!formData.heightFt) {
        newErrors.height = 'Feet is required';
      } else if (isNaN(ftVal) || ftVal < 0 || (ftVal === 0 && inVal === 0)) {
        newErrors.height = 'Height must be greater than 0';
      } else {
        const totalInches = ftVal * 12 + inVal;
        heightMeters = totalInches * 0.0254;
        heightDescriptive = `${formData.heightFt}'${formData.heightIn || '0'}"`;
      }
    }

    // Weight validation
    let weightKg = 0;
    let weightDescriptive = '';
    const weightValFloat = parseFloat(formData.weightVal);

    if (!formData.weightVal) {
      newErrors.weight = 'Weight is required';
    } else if (isNaN(weightValFloat) || weightValFloat <= 0) {
      newErrors.weight = 'Weight must be greater than 0';
    } else {
      if (formData.weightUnit === 'kg') {
        weightKg = weightValFloat;
        weightDescriptive = `${formData.weightVal} kg`;
      } else {
        weightKg = weightValFloat * 0.45359237;
        weightDescriptive = `${formData.weightVal} lbs`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsCalculating(true);

    // Simulate analysis loading animation for highly professional feel
    setTimeout(() => {
      let heightMeters = 0;
      let heightText = '';
      if (formData.heightUnit === 'cm') {
        heightMeters = parseFloat(formData.heightCm) / 100;
        heightText = `${formData.heightCm} cm`;
      } else if (formData.heightUnit === 'm') {
        heightMeters = parseFloat(formData.heightM);
        heightText = `${formData.heightM} m`;
      } else if (formData.heightUnit === 'ft-in') {
        const ft = parseFloat(formData.heightFt);
        const inches = parseFloat(formData.heightIn || '0');
        const totalInches = ft * 12 + inches;
        heightMeters = totalInches * 0.0254;
        heightText = `${formData.heightFt}'${formData.heightIn || '0'}"`;
      }

      let weightKg = 0;
      let weightText = '';
      if (formData.weightUnit === 'kg') {
        weightKg = parseFloat(formData.weightVal);
        weightText = `${formData.weightVal} kg`;
      } else {
        weightKg = parseFloat(formData.weightVal) * 0.45359237;
        weightText = `${formData.weightVal} lbs`;
      }

      const bmi = parseFloat((weightKg / (heightMeters * heightMeters)).toFixed(2));

      let category: BMICategory = 'normal';
      let status = 'Normal Weight';
      let advice = 'Great! Maintain a balanced diet and regular exercise.';
      let quote = 'Healthy habits build a healthy life.';

      if (bmi < 18.5) {
        category = 'underweight';
        status = 'Underweight';
        advice = 'Consider speaking with a professional about nutritious weight gain options and building lean muscle.';
        quote = 'Your health is an investment, not an expense.';
      } else if (bmi >= 18.5 && bmi <= 24.99) {
        category = 'normal';
        status = 'Normal Weight';
        advice = 'Excellent! Keep doing what you are doing—maintain a balanced diet, active routine, and good hydration.';
        quote = 'To enjoy the glow of good health, you must exercise.';
      } else if (bmi >= 25 && bmi <= 29.99) {
        category = 'overweight';
        status = 'Overweight';
        advice = 'Aim for at least 150 minutes of moderate exercise per week and integrate whole-food alternatives into meals.';
        quote = 'The ground you walk on is the foundation of your future self.';
      } else {
        category = 'obese';
        status = 'Obese';
        advice = 'Consult a medical specialist or fitness expert for supportive guidelines on cardiovascular workouts and safe weight management.';
        quote = 'It is not about perfect, it is about effort. Effort makes transformation.';
      }

      const result: BMIResult = {
        name: formData.name.trim() || 'Guest',
        age: parseInt(formData.age, 10),
        gender: formData.gender,
        height: heightText,
        weight: weightText,
        bmi,
        category,
        status,
        advice,
        quote,
      };

      onCalculate(result);
      setIsCalculating(false);
    }, 900);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-100 dark:shadow-none border border-slate-100 dark:border-slate-800 p-6 sm:p-8 relative overflow-hidden transition-all duration-300">
      {/* Background graphic elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-2xl pointer-events-none" />

      <h2 className="text-2xl font-sans font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-green-500 rounded-full" />
        BMI Calculator Profile
      </h2>

      <form onSubmit={handleCalculate} className="space-y-6" noValidate>
        {/* Name and Age Input Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label htmlFor="bmi-name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Name (Optional)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <User className="w-5 h-5" />
              </span>
              <input
                id="bmi-name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 focus:border-green-500 dark:focus:border-green-500 focus:bg-white dark:focus:bg-slate-950 rounded-2xl transition-all duration-200 outline-none focus:ring-4 focus:ring-green-500/10 font-medium"
                aria-label="Name"
              />
            </div>
          </div>

          {/* Age Field */}
          <div>
            <label htmlFor="bmi-age" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Age <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Calendar className="w-5 h-5" />
              </span>
              <input
                id="bmi-age"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Years (5 - 120)"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className={`w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border ${
                  errors.age ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 dark:border-slate-800 focus:border-green-500'
                } focus:bg-white dark:focus:bg-slate-950 rounded-2xl transition-all duration-200 outline-none focus:ring-4 focus:ring-green-500/10 font-medium`}
                required
                aria-label="Age"
                aria-invalid={!!errors.age}
                aria-describedby={errors.age ? 'age-error' : undefined}
              />
            </div>
            {errors.age && (
              <p id="age-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.age}
              </p>
            )}
          </div>
        </div>

        {/* Gender Choice */}
        <div>
          <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Gender <span className="text-red-500">*</span>
          </span>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleInputChange('gender', 'male')}
              className={`py-3.5 px-4 rounded-2xl border font-semibold flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 ${
                formData.gender === 'male'
                  ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-700 dark:text-blue-400 shadow-md shadow-blue-500/5'
                  : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
              aria-pressed={formData.gender === 'male'}
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Male
            </button>
            <button
              type="button"
              onClick={() => handleInputChange('gender', 'female')}
              className={`py-3.5 px-4 rounded-2xl border font-semibold flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 ${
                formData.gender === 'female'
                  ? 'bg-pink-50 dark:bg-pink-950/40 border-pink-500 text-pink-700 dark:text-pink-400 shadow-md shadow-pink-500/5'
                  : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
              aria-pressed={formData.gender === 'female'}
            >
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              Female
            </button>
          </div>
        </div>

        {/* Height Choice and Values Row */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label htmlFor="height-unit" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Height <span className="text-red-500">*</span>
            </label>
            <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200/50 dark:border-slate-800">
              {(['cm', 'm', 'ft-in'] as HeightUnit[]).map((unit) => (
                <button
                  key={unit}
                  id="height-unit"
                  type="button"
                  onClick={() => handleInputChange('heightUnit', unit)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all duration-150 ${
                    formData.heightUnit === unit
                      ? 'bg-white dark:bg-slate-800 text-green-600 dark:text-green-400 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {unit === 'cm' ? 'cm' : unit === 'm' ? 'm' : 'ft & in'}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
              <Ruler className="w-5 h-5" />
            </span>

            {/* Render height inputs dynamically based on unit selection */}
            {formData.heightUnit === 'cm' && (
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Centimeters (e.g., 175)"
                value={formData.heightCm}
                onChange={(e) => handleInputChange('heightCm', e.target.value)}
                className={`w-full pl-11 pr-16 py-3.5 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border ${
                  errors.height ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-green-500'
                } rounded-2xl transition-all duration-200 outline-none focus:ring-4 focus:ring-green-500/10 font-medium`}
                aria-invalid={!!errors.height}
              />
            )}

            {formData.heightUnit === 'm' && (
              <input
                type="text"
                placeholder="Meters (e.g., 1.75)"
                value={formData.heightM}
                onChange={(e) => handleInputChange('heightM', e.target.value)}
                className={`w-full pl-11 pr-16 py-3.5 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border ${
                  errors.height ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-green-500'
                } rounded-2xl transition-all duration-200 outline-none focus:ring-4 focus:ring-green-500/10 font-medium`}
                aria-invalid={!!errors.height}
              />
            )}

            {formData.heightUnit === 'ft-in' && (
              <div className="flex gap-2 pl-11">
                <div className="relative flex-1">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Feet"
                    value={formData.heightFt}
                    onChange={(e) => handleInputChange('heightFt', e.target.value)}
                    className={`w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border ${
                      errors.height ? 'border-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-green-500'
                    } rounded-2xl transition-all duration-200 outline-none focus:ring-4 focus:ring-green-500/10 font-medium`}
                    aria-invalid={!!errors.height}
                  />
                  <span className="absolute right-3.5 top-3.5 text-xs font-bold text-slate-400">ft</span>
                </div>
                <div className="relative flex-1">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Inches"
                    value={formData.heightIn}
                    onChange={(e) => handleInputChange('heightIn', e.target.value)}
                    className={`w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border ${
                      errors.height ? 'border-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-green-500'
                    } rounded-2xl transition-all duration-200 outline-none focus:ring-4 focus:ring-green-500/10 font-medium`}
                    aria-invalid={!!errors.height}
                  />
                  <span className="absolute right-3.5 top-3.5 text-xs font-bold text-slate-400">in</span>
                </div>
              </div>
            )}

            {/* Floating Unit Indicator Label */}
            {formData.heightUnit !== 'ft-in' && (
              <span className="absolute right-4 top-3.5 text-sm font-bold text-slate-400 uppercase pointer-events-none">
                {formData.heightUnit}
              </span>
            )}
          </div>
          {errors.height && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.height}
            </p>
          )}
        </div>

        {/* Weight Choice and Value Row */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label htmlFor="weight-unit" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Weight <span className="text-red-500">*</span>
            </label>
            <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200/50 dark:border-slate-800">
              {(['kg', 'lbs'] as WeightUnit[]).map((unit) => (
                <button
                  key={unit}
                  id="weight-unit"
                  type="button"
                  onClick={() => handleInputChange('weightUnit', unit)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all duration-150 ${
                    formData.weightUnit === unit
                      ? 'bg-white dark:bg-slate-800 text-green-600 dark:text-green-400 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
              <Weight className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder={`Weight in ${formData.weightUnit === 'kg' ? 'Kilograms' : 'Pounds'}`}
              value={formData.weightVal}
              onChange={(e) => handleInputChange('weightVal', e.target.value)}
              className={`w-full pl-11 pr-16 py-3.5 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border ${
                errors.weight ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-green-500'
              } rounded-2xl transition-all duration-200 outline-none focus:ring-4 focus:ring-green-500/10 font-medium`}
              aria-invalid={!!errors.weight}
            />
            <span className="absolute right-4 top-3.5 text-sm font-bold text-slate-400 uppercase pointer-events-none">
              {formData.weightUnit}
            </span>
          </div>
          {errors.weight && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.weight}
            </p>
          )}
        </div>

        {/* Buttons Row */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button
            type="submit"
            disabled={isCalculating}
            className="flex-2 py-4 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white font-bold rounded-2xl shadow-lg shadow-green-500/10 hover:shadow-green-500/20 active:scale-98 transition-all duration-150 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-green-500/20"
          >
            {isCalculating ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing profile...
              </>
            ) : (
              'Calculate BMI'
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-2xl active:scale-98 transition-all duration-150 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-slate-500/10"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
