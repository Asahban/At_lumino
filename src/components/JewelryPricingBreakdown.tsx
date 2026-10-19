import React from 'react';
import { motion } from 'framer-motion';
import { Gem, Sparkles, TrendingUp, Info, DollarSign, Percent, CreditCard, Wrench } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const JewelryPricingBreakdown = () => {
  const { currentTheme } = useTheme();
  
  const getStyles = () => {
    switch (currentTheme) {
      case 'dark':
        return {
          containerBg: 'bg-gray-900/80',
          headerBg: 'bg-purple-900/50',
          cardBg: 'bg-gray-800/90',
          textMain: 'text-white',
          textMuted: 'text-gray-300',
          borderColor: 'border-purple-500/20',
          accentColor: 'text-purple-400',
          barColors: {
            material: 'bg-purple-500',
            craft: 'bg-purple-700',
            markup: 'bg-purple-300'
          }
        };
      case 'royal':
        return {
          containerBg: 'bg-white/90',
          headerBg: 'bg-indigo-50',
          cardBg: 'bg-white/80',
          textMain: 'text-indigo-950',
          textMuted: 'text-indigo-800/70',
          borderColor: 'border-indigo-200',
          accentColor: 'text-indigo-600',
          barColors: {
            material: 'bg-indigo-500',
            craft: 'bg-indigo-700',
            markup: 'bg-indigo-300'
          }
        };
      default:
        return {
          containerBg: 'bg-white/90',
          headerBg: 'bg-amber-50',
          cardBg: 'bg-white/80',
          textMain: 'text-foreground',
          textMuted: 'text-muted-foreground',
          borderColor: 'border-gold/20',
          accentColor: 'text-gold',
          barColors: {
            material: 'bg-gold/80',
            craft: 'bg-gold-dark/70',
            markup: 'bg-gold-light/60'
          }
        };
    }
  };
  
  const styles = getStyles();
  
  return (
    <div id="pricing-breakdown" className={`w-full py-16 ${styles.containerBg} backdrop-blur-md border-t border-b ${styles.borderColor}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`mb-10 text-center p-6 rounded-xl ${styles.headerBg} ${styles.borderColor} border backdrop-blur-sm`}
          >
            <h2 className={`text-3xl font-serif mb-3 flex items-center justify-center ${styles.textMain}`}>
              <Gem className="h-6 w-6 mr-2 text-gold" />
              Jewelry Pricing Breakdown
            </h2>
            <p className={`${styles.textMuted} max-w-3xl mx-auto`}>
              Understanding the true cost of jewelry helps you make informed decisions. We analyze thousands of jewelry pieces 
              to reveal how much you're really paying for materials versus markups.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className={`p-6 rounded-xl ${styles.cardBg} border ${styles.borderColor} backdrop-blur-sm`}
            >
              <h3 className={`text-xl font-serif mb-6 ${styles.textMain}`}>
                <DollarSign className="h-5 w-5 inline-block mr-1 text-gold" />
                Cost Breakdown by Retailer Type
              </h3>
              
              <div className="space-y-8">
                {[
                  { 
                    retailer: "Luxury Brand Retailer", 
                    markup: 300, 
                    breakdown: { materials: 25, making: 10, retail: 65 }, 
                    description: "Premium brands command the highest prices, with up to 300% markup on material costs."
                  },
                  { 
                    retailer: "Mall Jeweler", 
                    markup: 180, 
                    breakdown: { materials: 35, making: 15, retail: 50 }, 
                    description: "Mall retailers add significant markups while providing moderate craftsmanship quality."
                  },
                  { 
                    retailer: "Local Independent Jeweler", 
                    markup: 120, 
                    breakdown: { materials: 45, making: 25, retail: 30 }, 
                    description: "Independent jewelers often provide better value with lower overhead costs."
                  },
                  { 
                    retailer: "Direct-to-Consumer", 
                    markup: 80, 
                    breakdown: { materials: 55, making: 25, retail: 20 }, 
                    description: "Online direct-to-consumer models offer the best material value with minimal retail markup."
                  }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between mb-1">
                      <span className={`text-sm font-medium ${styles.textMain}`}>{item.retailer}</span>
                      <div className="flex items-center">
                        <Percent className="h-3 w-3 mr-1 text-gold" />
                        <span className={`text-sm font-medium ${styles.accentColor}`}>{item.markup}% markup</span>
                      </div>
                    </div>
                    
                    <div className="h-7 flex rounded-full overflow-hidden">
                      <div 
                        className={`${styles.barColors.material} h-full flex items-center justify-center text-[10px] text-white font-medium`}
                        style={{ width: `${item.breakdown.materials}%` }}
                      >
                        {item.breakdown.materials}%
                      </div>
                      <div 
                        className={`${styles.barColors.craft} h-full flex items-center justify-center text-[10px] text-white font-medium`}
                        style={{ width: `${item.breakdown.making}%` }}
                      >
                        {item.breakdown.making}%
                      </div>
                      <div 
                        className={`${styles.barColors.markup} h-full flex items-center justify-center text-[10px] text-gray-800 font-medium`}
                        style={{ width: `${item.breakdown.retail}%` }}
                      >
                        {item.breakdown.retail}%
                      </div>
                    </div>
                    
                    <p className={`text-xs ${styles.textMuted}`}>{item.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex flex-wrap justify-center gap-6 pt-4 border-t border-gold/10">
                {[
                  { color: styles.barColors.material, label: "Material Cost" },
                  { color: styles.barColors.craft, label: "Craftsmanship" },
                  { color: styles.barColors.markup, label: "Retail Markup" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <div className={`h-3 w-3 rounded-sm ${item.color} mr-1`}></div>
                    <span className={`text-xs ${styles.textMuted}`}>{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl ${styles.cardBg} border ${styles.borderColor} backdrop-blur-sm`}
              >
                <h3 className={`text-xl font-serif mb-4 ${styles.textMain}`}>
                  <Info className="h-5 w-5 inline-block mr-1 text-gold" />
                  What Affects Jewelry Pricing?
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { 
                      icon: Sparkles, 
                      title: "Material Quality", 
                      desc: "Gold purity (10K, 14K, 18K) and gemstone quality dramatically impact base costs." 
                    },
                    { 
                      icon: Wrench, 
                      title: "Craftsmanship", 
                      desc: "Hand-crafted pieces require more labor and skill than machine-made jewelry." 
                    },
                    { 
                      icon: CreditCard, 
                      title: "Retail Channel", 
                      desc: "Brick-and-mortar stores have higher overhead costs than online retailers." 
                    },
                    { 
                      icon: TrendingUp, 
                      title: "Brand Premium", 
                      desc: "Luxury brands charge significantly more for identical materials and quality." 
                    }
                  ].map((item, i) => (
                    <div key={i} className={`p-4 rounded-lg hover:bg-opacity-70 transition-colors border ${styles.borderColor}`}>
                      <div className="flex items-center mb-2">
                        <div className="p-2 rounded-full bg-gold/10 mr-2">
                          <item.icon className="h-4 w-4 text-gold" />
                        </div>
                        <h4 className={`font-medium ${styles.textMain}`}>{item.title}</h4>
                      </div>
                      <p className={`text-sm ${styles.textMuted}`}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl ${styles.cardBg} border ${styles.borderColor} backdrop-blur-sm`}
              >
                <h3 className={`text-xl font-serif mb-4 ${styles.textMain}`}>
                  <TrendingUp className="h-5 w-5 inline-block mr-1 text-gold" />
                  Potential Savings Examples
                </h3>
                
                <div className="space-y-4">
                  {[
                    { 
                      item: "1ct Diamond Engagement Ring", 
                      retailPrice: "$5,999", 
                      fairPrice: "$3,400", 
                      savings: "43%" 
                    },
                    { 
                      item: "14K Gold Chain Necklace", 
                      retailPrice: "$1,200", 
                      fairPrice: "$650", 
                      savings: "45%" 
                    },
                    { 
                      item: "Sapphire and Diamond Earrings", 
                      retailPrice: "$2,499", 
                      fairPrice: "$1,350", 
                      savings: "46%" 
                    }
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className={`flex justify-between items-center p-3 rounded-lg hover:bg-opacity-70 transition-colors border ${styles.borderColor}`}
                    >
                      <div className="flex-1">
                        <h4 className={`font-medium ${styles.textMain}`}>{item.item}</h4>
                        <div className="flex items-center mt-1">
                          <span className={`text-xs line-through ${styles.textMuted}`}>{item.retailPrice}</span>
                          <span className={`text-xs ml-2 ${styles.accentColor} font-medium`}>{item.fairPrice}</span>
                        </div>
                      </div>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Save {item.savings}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JewelryPricingBreakdown;
