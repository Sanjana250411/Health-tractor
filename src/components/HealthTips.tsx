import { Salad, Dumbbell, Droplets, Moon, Ban, HeartHandshake } from 'lucide-react';

export default function HealthTips() {
  const tips = [
    {
      icon: Salad,
      title: 'Healthy Diet',
      description: 'Prioritize whole, nutrient-dense foods. Fill half your plate with colorful vegetables and fruits, choose lean proteins, and eat healthy fats.',
      color: 'text-green-500 bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900/30',
    },
    {
      icon: Dumbbell,
      title: 'Exercise Daily',
      description: 'Aim for at least 30 minutes of moderate activity like walking, jogging, or cycling. Daily movement strengthens muscles and boosts cardiovascular health.',
      color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/20 border-orange-100 dark:border-orange-900/30',
    },
    {
      icon: Droplets,
      title: 'Drink Water',
      description: 'Stay hydrated by drinking 8-10 glasses of water daily. Water aids digestion, supports healthy cell function, and keeps energy levels balanced.',
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30',
    },
    {
      icon: Moon,
      title: 'Sleep Well',
      description: 'Get 7-9 hours of deep, restful sleep every night. Sleep is essential for muscle recovery, cognitive focus, hormone balance, and cellular repair.',
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/30',
    },
    {
      icon: Ban,
      title: 'Reduce Sugar',
      description: 'Limit ultra-processed items and added sugars. Swapping sweet drinks with water or herbal tea protects against rapid insulin and energy spikes.',
      color: 'text-red-500 bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/30',
    },
    {
      icon: HeartHandshake,
      title: 'Manage Stress',
      description: 'Practice mindfulness, meditation, or deep breathing daily. Lowering cortisol levels supports physical immunity and positive mental outlook.',
      color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/20 border-teal-100 dark:border-teal-900/30',
    },
  ];

  return (
    <section id="health-tips" className="py-16 sm:py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 dark:text-white tracking-tight">
            Daily Health & Lifestyle Tips
          </h2>
          <div className="w-16 h-1.5 bg-green-500 rounded-full mx-auto mt-4 mb-4" />
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Fostering simple habit adjustments generates tremendous compound benefits for your cardiovascular fitness and daily energy.
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {tips.map((tip, idx) => {
            const IconComponent = tip.icon;
            return (
              <div
                key={idx}
                className="group relative bg-slate-50 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-900 border border-slate-100 dark:border-slate-800/80 hover:border-slate-200 dark:hover:border-slate-700/80 rounded-3xl p-6 sm:p-8 hover:shadow-xl hover:shadow-slate-100 dark:hover:shadow-none transition-all duration-300 transform hover:-translate-y-1.5"
              >
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/0 group-hover:bg-green-500/5 rounded-full blur-2xl transition-all duration-300 pointer-events-none" />

                {/* Styled Icon */}
                <div className={`inline-flex p-3.5 rounded-2xl border ${tip.color} mb-6 shadow-sm`}>
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-sans font-bold text-slate-800 dark:text-white mb-3">
                  {tip.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {tip.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
