import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Basic Plan',
    price: '19.95',
    save: '20%',
    features: ['Website Design', 'Mobile Apps Design', 'Product Design', 'Digital Marketing', 'Custom Support']
  },
  {
    name: 'Standard Plan',
    price: '19.95',
    save: '35%',
    features: ['Website Design', 'Mobile Apps Design', 'Product Design', 'Digital Marketing', 'Custom Support'],
    popular: true
  },
  {
    name: 'Premium Plan',
    price: '19.95',
    save: '45%',
    features: ['Website Design', 'Mobile Apps Design', 'Product Design', 'Digital Marketing', 'Custom Support']
  }
];

export const Pricing = () => {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[#BFFF0B] font-medium tracking-widest uppercase mb-4 text-sm">Pricing Package</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
            Amazing <span className="text-[#BFFF0B]">Pricing</span> For your Projects
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-[40px] border transition-all duration-500 ${plan.popular ? 'bg-[#BFFF0B] border-[#BFFF0B]' : 'bg-[#0a0a0a] border-white/10 hover:border-[#BFFF0B]/50'}`}
            >
              <div className="flex justify-between items-center mb-8">
                <h4 className={`text-xl font-bold ${plan.popular ? 'text-black' : 'text-white'}`}>{plan.name}</h4>
                <div className={`text-xs font-bold px-3 py-1 rounded-full ${plan.popular ? 'bg-black text-[#BFFF0B]' : 'bg-[#BFFF0B] text-black'}`}>
                  Save {plan.save}
                </div>
              </div>

              <div className="mb-8">
                <span className={`text-5xl font-bold ${plan.popular ? 'text-black' : 'text-white'}`}>${plan.price}</span>
                <span className={`text-sm ${plan.popular ? 'text-black/60' : 'text-white/40'}`}>/per month</span>
              </div>

              <div className={`h-px w-full mb-8 ${plan.popular ? 'bg-black/10' : 'bg-white/10'}`} />

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className={`flex items-center gap-3 font-medium ${plan.popular ? 'text-black' : 'text-white/80'}`}>
                    <Check className={`w-5 h-5 ${plan.popular ? 'text-black' : 'text-[#BFFF0B]'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-full font-bold transition-all ${plan.popular ? 'bg-black text-white hover:bg-black/80' : 'bg-white/5 text-white border border-white/10 hover:bg-[#BFFF0B] hover:text-black hover:border-[#BFFF0B]'}`}>
                Choose Package
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
