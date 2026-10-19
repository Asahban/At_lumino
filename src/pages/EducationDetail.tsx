
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, CheckCircle, Info, Shield, Award, GraduationCap, BookOpen, Map, Calculator, Gem, ScrollText, Scale, History } from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const EducationDetail = () => {
  const { topic } = useParams();
  
  // Content based on topic parameter
  const getTopicContent = () => {
    switch(topic) {
      case 'jewelry-certification':
        return {
          title: "How to Know if Jewelry is Certified & Authentic 🛡️💎",
          subtitle: "Your trusted guide to understanding jewelry certifications like BIS, IGI, GIA, SGL, and ISO",
          content: [
            {
              heading: "Your Trusted Guide to Jewelry Certification",
              text: "Because you deserve to feel safe, confident, and informed—before you even think about buying. At Lumino, we know choosing jewelry can feel overwhelming. Especially when you're unsure about authenticity. That's why we built this space—not just to inform you, but to walk with you. Gently. Clearly. At your pace."
            },
            {
              heading: "What is Jewelry Certification?",
              text: "Think of certification as your jewelry's passport. It proves where it comes from, what it's made of, and that it's worth what you're paying. We only feature jewelry from stores that meet recognized certification standards."
            }
          ],
          certifications: [
            {
              icon: <Award className="h-8 w-8 text-gold" />,
              title: "BIS Hallmark",
              subtitle: "For Gold & Silver Purity",
              description: "Who it's for: Anyone buying gold or silver jewelry. Issued by: Bureau of Indian Standards (BIS), Govt. of India. When you see a BIS hallmark, you're looking at certified purity—measured in karats (like 22K or 18K). It's tested in a BIS-authorized lab.",
              importance: "You're not overpaying for metal that's less pure than promised. You're protected.",
              lookFor: ["BIS logo", "Purity (like 22K916)", "Jeweler's ID mark", "Assaying center's mark"],
              learnMore: "BIS.gov.in"
            },
            {
              icon: <Shield className="h-8 w-8 text-gold" />,
              title: "IGI",
              subtitle: "International Gemological Institute",
              description: "Who it's for: Diamond & gemstone buyers. Issued by: IGI Labs, worldwide. IGI is your global standard for diamonds. It carefully grades stones based on the 4Cs—cut, clarity, color, and carat.",
              importance: "You understand exactly what you're buying—and why it costs what it does.",
              lookFor: ["Certificate", "Laser-inscribed ID on the stone"],
              learnMore: "igi.org"
            },
            {
              icon: <GraduationCap className="h-8 w-8 text-gold" />,
              title: "GIA",
              subtitle: "Gemological Institute of America",
              description: "Who it's for: Buyers who want the strictest diamond standards. Issued by: GIA, the most respected gem authority worldwide. GIA reports are considered the gold standard in diamond grading.",
              importance: "Higher resale value, unmatched trust, and complete transparency.",
              lookFor: ["GIA certificate", "Laser inscription", "Security features"],
              learnMore: "gia.edu"
            },
            {
              icon: <Shield className="h-8 w-8 text-gold" />,
              title: "SGL",
              subtitle: "Solitaire Gemological Labs",
              description: "Who it's for: Indian diamond jewelry buyers. Issued by: SGL, operating across India, UK & Middle East. Trusted by many Indian jewelers for fast, consistent grading.",
              importance: "Efficient certification that helps you shop confidently.",
              lookFor: ["SGL certificate", "Grading report", "Authentication features"],
              learnMore: "solitaire-labs.com"
            },
            {
              icon: <Award className="h-8 w-8 text-gold" />,
              title: "ISO",
              subtitle: "For Brand Quality & Processes",
              description: "Who it's for: Brands that want to show their processes meet world-class quality. Issued by: ISO (via licensed agencies). Not for individual pieces—but it means the brand itself follows reliable, globally accepted practices.",
              importance: "The jewelry you buy comes from a company that values transparency and responsibility.",
              lookFor: ["ISO certification display", "Quality management mentions", "Process transparency"],
              learnMore: "iso.org"
            }
          ],
          checklist: [
            "BIS Hallmark (for Gold/Silver)",
            "Diamond certificate (IGI, GIA, SGL)",
            "Laser-inscribed stone ID",
            "Branded packaging with certificate ID",
            "Option to verify online"
          ],
          benefitsTable: [
            { certification: "Verified metal/gem purity", experience: "Peace of mind" },
            { certification: "Recognized grading", experience: "Transparent pricing" },
            { certification: "Legal & resale backing", experience: "Long-term value" },
            { certification: "Trusted seller practices", experience: "A more honest shopping experience" }
          ],
          conclusion: "This guide is just a start. When you browse our store listings or jewelry items, you'll see trust badges, purity indicators, and a 1-click certificate view—so you always feel supported. We're not here to sell to you. We're here to serve you.",
          imagePath: "/gold-purity.jpg"
        };
      case 'gold-purity':
        return {
          title: "Gold Purity Guide",
          subtitle: "Understanding karats, purity measurements, and BIS standards",
          content: [
            {
              heading: "What is Gold Purity?",
              text: "Gold purity refers to the percentage of pure gold in a piece of jewelry compared to other metals. Pure gold (24K) is too soft for most jewelry applications, so it's typically mixed with other metals to create an alloy that's more durable while still maintaining gold's desirable properties."
            },
            {
              heading: "The Karat System",
              text: "The karat system is the most common way to measure gold purity in jewelry. 24K represents pure gold (99.9%), while lower numbers indicate a lower percentage of gold in the alloy. 22K gold contains 91.7% gold, 18K contains 75% gold, and 14K contains 58.3% gold."
            },
            {
              heading: "BIS Hallmarking",
              text: "In India, the Bureau of Indian Standards (BIS) hallmarking system ensures that gold jewelry meets specific purity standards. A BIS hallmark includes the BIS mark, purity in karats, assay center's identification mark, jeweler's identification mark, and year of marking."
            },
            {
              heading: "Testing Gold Purity",
              text: "There are several methods to test gold purity, including the acid test, electronic gold testers, and X-ray fluorescence (XRF) analysis. Professional jewelers and certified laboratories can provide accurate purity assessments."
            },
            {
              heading: "Practical Application",
              text: "When shopping for gold jewelry, always check for hallmarks and certification. The higher the karat, the purer the gold, but also the softer and more prone to scratches and dents. Lower karat gold is more durable for everyday wear but contains less pure gold. Consider your lifestyle and how you'll wear the piece when choosing a gold purity level."
            },
            {
              heading: "Value Considerations",
              text: "Higher purity gold typically commands a higher price, but the true value of a piece depends on both its gold content and its craftsmanship. Understanding gold purity helps you assess whether you're paying a fair price for the material content of your jewelry."
            }
          ],
          imagePath: "/gold-purity.jpg"
        };
      case 'diamond-certification':
        return {
          title: "Diamond Certification",
          subtitle: "Understanding the 4Cs and diamond grading systems",
          content: [
            {
              heading: "The 4Cs of Diamond Quality",
              text: "Diamond quality is evaluated using the 4Cs: Cut, Color, Clarity, and Carat weight. The cut affects a diamond's brilliance, color ranges from colorless to yellow, clarity measures internal flaws, and carat refers to the diamond's weight."
            },
            {
              heading: "Diamond Certification Bodies",
              text: "Reputable diamond certification bodies include the Gemological Institute of America (GIA), International Gemological Institute (IGI), and American Gem Society (AGS). Each provides detailed reports on a diamond's characteristics and quality."
            },
            {
              heading: "Reading a Diamond Certificate",
              text: "A diamond certificate includes information about the 4Cs, measurements, proportions, fluorescence, and sometimes additional details like symmetry and polish. Understanding how to read these certificates helps make informed purchasing decisions."
            },
            {
              heading: "Importance of Certification",
              text: "Diamond certification provides third-party verification of a diamond's quality and characteristics, ensuring transparency and fair pricing. Always look for certified diamonds when making significant purchases."
            },
            {
              heading: "Beyond the Certificate",
              text: "While a certificate provides important technical details, it's also essential to visually inspect the diamond. Some aspects of beauty, like fire and scintillation, aren't fully captured in certificates but significantly impact a diamond's appeal."
            },
            {
              heading: "Value Protection",
              text: "A diamond with proper certification typically maintains better resale value and provides assurance if you need to make an insurance claim. Keep certificates in a safe place along with your purchase receipts and appraisals."
            }
          ],
          imagePath: "/gemstone-grading.jpg"
        };
      case 'regional-styles':
        return {
          title: "Regional Jewelry Styles",
          subtitle: "Exploring traditional jewelry styles from different regions",
          content: [
            {
              heading: "South Indian Jewelry",
              text: "South Indian jewelry is characterized by intricate temple designs, often featuring motifs of deities, peacocks, and mangoes. Traditional pieces include the Kasumala (coin necklace), Oddiyanam (waistband), and Jhumkas (bell-shaped earrings). These designs typically use pure gold (22K or higher) and often incorporate ruby and emerald gemstones with pearl accents. The craftsmanship showcases ancient techniques passed down through generations of artisans."
            },
            {
              heading: "North Indian Jewelry",
              text: "North Indian jewelry often features Kundan and Meenakari work. Kundan involves setting glass or gemstones in gold foil, while Meenakari is a technique of colorful enameling. Popular pieces include Polki (uncut diamond) sets and Jadau jewelry. The designs often draw inspiration from Mughal aesthetics with intricate patterns and layered elements. These pieces frequently combine gold with precious and semi-precious stones in elaborate arrangements."
            },
            {
              heading: "West Indian Jewelry",
              text: "Gujarati and Rajasthani jewelry is known for bold designs and vibrant colors. Traditional pieces include Raani Haar (layered necklace), Bajuband (armlet), and Borla (forehead ornament). The region is famous for its lac jewelry with mirror work and the distinctive Thewa art technique, where gold is fused onto glass. Desert influences can be seen in the geometric patterns and the use of large statement pieces designed to be worn with traditional attire."
            },
            {
              heading: "East Indian Jewelry",
              text: "Bengali jewelry often features floral and nature-inspired motifs. Traditional pieces include the Chik (choker), Sankha Pola (red and white bangles), and Kaan (earrings). The region is known for delicate filigree work called 'taar' and distinctive designs like the Sita Haar (a long necklace with a pendant). These pieces typically use softer, flowing designs with cultural significance tied to Bengali traditions and celebrations."
            },
            {
              heading: "Cross-Cultural Influences",
              text: "Over centuries, trade routes and migration have created fascinating fusion styles across regions. Colonial influences from Portuguese, Dutch, and British settlers also contributed to unique hybrid designs, particularly in coastal areas. Today, modern designers often blend regional elements to create contemporary pieces that honor traditional craftsmanship while appealing to global tastes."
            }
          ],
          imagePath: "/regional-jewelry.jpg"
        };
      case 'making-charges':
        return {
          title: "Making Charges Explained",
          subtitle: "Understanding jewelry making charges and pricing",
          content: [
            {
              heading: "What Are Making Charges?",
              text: "Making charges represent the cost of crafting gold jewelry, including labor, design work, and manufacturing processes. These charges are typically calculated as a percentage of the gold weight or as a fixed amount per gram. They cover not just the physical crafting but also the jeweler's expertise, overhead costs, and profit margin. Understanding these charges is crucial for comparing prices across different jewelers."
            },
            {
              heading: "Factors Affecting Making Charges",
              text: "Making charges vary based on design complexity, craftsmanship level (handmade vs. machine-made), regional practices, and the jeweler's brand value. Intricate designs and handcrafted pieces command higher making charges. Pieces requiring specialized techniques like filigree work or microscopic settings typically have higher making charges compared to simpler designs. The reputation and brand positioning of the jeweler also significantly impacts these charges."
            },
            {
              heading: "Regional Variations",
              text: "Making charges can vary significantly across regions and cities. Metropolitan areas often have higher making charges, while traditional jewelry hubs might offer better rates for specific styles. For example, a particular style might have lower making charges in its region of origin where craftsmen are specialized in that technique. Understanding these regional differences can help you plan purchases based on location."
            },
            {
              heading: "Negotiating Making Charges",
              text: "Unlike gold prices (which are market-determined), making charges can often be negotiated. Understanding the typical range for making charges in your area can help you negotiate a fair price. Building a relationship with a jeweler, purchasing during promotional periods, or buying multiple pieces can sometimes lead to discounts on making charges. Remember that extremely low making charges might indicate compromised craftsmanship."
            },
            {
              heading: "Hidden Costs to Watch For",
              text: "Some jewelers may advertise low making charges but compensate with higher charges elsewhere. Look out for added waste charges, stone-setting fees, or inflated gold rates. A transparent jeweler will provide a detailed breakdown of all costs. Always request an itemized bill that clearly separates the metal value from various charges to ensure you understand exactly what you're paying for."
            },
            {
              heading: "Value Assessment",
              text: "When evaluating making charges, consider them in relation to the total piece. For investment-oriented purchases like plain gold bangles, lower making charges are preferable. For statement pieces or gifts, higher making charges might be justified by superior design and craftsmanship. The true value comes from understanding the relationship between the charges and the quality of work you receive."
            }
          ],
          imagePath: "/gold-standards.jpg"
        };
      default:
        return {
          title: "Jewelry Education",
          subtitle: "Expanding your knowledge about jewelry",
          content: [
            {
              heading: "Why Jewelry Education Matters",
              text: "Understanding jewelry helps you make informed purchases, appreciate craftsmanship, and avoid overpaying or being misled about quality. Knowledge of materials, craftsmanship techniques, and regional styles enhances your ability to identify quality pieces and recognize fair pricing."
            },
            {
              heading: "The Value of Expertise",
              text: "By learning about jewelry's technical aspects, cultural significance, and historical context, you gain the confidence to make purchases that align with your personal preferences and investment goals. This knowledge transforms you from a passive consumer to an informed collector who can appreciate the true artistry behind fine jewelry."
            }
          ],
          imagePath: "/gold-standards.jpg"
        };
    }
  };
  
  const topicContent = getTopicContent();

  // Detect if we're on the jewelry certification page
  const isCertificationPage = topic === 'jewelry-certification';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link to="/education" className="inline-flex items-center text-sm font-medium text-gold hover:text-gold-dark mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Education
          </Link>
          
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
              {topicContent.title}
            </h1>
            <p className="text-xl text-graphite/70">
              {topicContent.subtitle}
            </p>
            
            {isCertificationPage && (
              <div className="mt-4 p-4 bg-gold/5 border border-gold/20 rounded-lg">
                <p className="text-base text-graphite/80">
                  Not sure if the gold is real or the diamond is certified?
                  Here's your simple, trusted guide to understanding jewelry certifications like BIS, IGI, GIA, SGL, and ISO — so you always know exactly what you're buying.
                </p>
              </div>
            )}
          </div>
          
          <div 
            className="aspect-video rounded-lg overflow-hidden mb-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${topicContent.imagePath})` }}
          ></div>
          
          {isCertificationPage ? (
            <>
              {/* Visual Checklist Quick View */}
              <Card className="mb-8 border-gold/20 bg-white/95 backdrop-blur-sm shadow-sm">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-serif font-semibold mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 text-gold mr-2" />
                    What to Look for in Certified Jewelry:
                  </h3>
                  <ul className="space-y-3">
                    {topicContent.checklist.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Main content */}
              <div className="prose prose-lg max-w-none mb-10">
                {topicContent.content.map((section, index) => (
                  <div key={index} className="mb-8">
                    <h2 className="text-2xl font-serif font-medium mb-3 flex items-center">
                      {index === 0 ? (
                        <Shield className="h-6 w-6 text-gold mr-2" />
                      ) : (
                        <Info className="h-6 w-6 text-gold mr-2" />
                      )}
                      {section.heading}
                    </h2>
                    <p className="text-graphite/80">{section.text}</p>
                  </div>
                ))}
              </div>
              
              {/* Certification Tabs */}
              <div className="mb-10">
                <h2 className="text-2xl font-serif font-medium mb-6">Certifications You Should Know</h2>
                <Tabs defaultValue="bis" className="w-full">
                  <TabsList className="w-full flex mb-6 bg-background/50 p-1 backdrop-blur-sm border border-gold/10">
                    {topicContent.certifications.map((cert, index) => (
                      <TabsTrigger 
                        key={index} 
                        value={cert.title.toLowerCase().replace(/\s+/g, '-')}
                        className="flex-1 data-[state=active]:bg-gold/10 data-[state=active]:text-gold-dark"
                      >
                        {cert.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {topicContent.certifications.map((cert, index) => (
                    <TabsContent 
                      key={index} 
                      value={cert.title.toLowerCase().replace(/\s+/g, '-')}
                      className="p-6 bg-white/90 backdrop-blur-sm rounded-lg border border-gold/10 shadow-sm"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/4 flex justify-center">
                          <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center">
                            {cert.icon}
                          </div>
                        </div>
                        <div className="md:w-3/4">
                          <h3 className="text-xl font-serif font-medium mb-1">{cert.title}</h3>
                          <h4 className="text-gold-dark mb-3 text-lg">{cert.subtitle}</h4>
                          <p className="mb-4 text-graphite/80">{cert.description}</p>
                          
                          <div className="mb-4">
                            <h5 className="font-medium text-gold-dark mb-2 flex items-center">
                              <Award className="h-4 w-4 mr-2" /> 
                              Why it matters to you:
                            </h5>
                            <p className="text-graphite/80">{cert.importance}</p>
                          </div>
                          
                          <div className="mb-4">
                            <h5 className="font-medium text-gold-dark mb-2">What to look for:</h5>
                            <ul className="list-disc pl-5 space-y-1">
                              {cert.lookFor.map((item, idx) => (
                                <li key={idx} className="text-graphite/80">{item}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <a 
                            href={`https://${cert.learnMore}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gold hover:text-gold-dark text-sm inline-flex items-center"
                          >
                            🌐 Learn more → {cert.learnMore}
                          </a>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
              
              {/* How to Identify Section */}
              <div className="mb-10 p-6 bg-white/90 backdrop-blur-sm rounded-lg border border-gold/10 shadow-sm">
                <h2 className="text-2xl font-serif font-medium mb-4 flex items-center">
                  <CheckCircle className="h-6 w-6 text-gold mr-2" />
                  How to Identify a Certified Piece
                </h2>
                <p className="mb-4 text-graphite/80">We'll show this clearly on product pages, but here's what to keep an eye on:</p>
                <ul className="space-y-2">
                  {topicContent.checklist.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-graphite/80">Still unsure? Just tap "Need Help?" on any product—we'll walk you through it.</p>
              </div>
              
              {/* Benefits Table */}
              <div className="mb-10">
                <h2 className="text-2xl font-serif font-medium mb-4">
                  Why This Matters
                </h2>
                <div className="p-4 mb-4 bg-gold/5 border-l-4 border-gold rounded-r-lg">
                  <p className="italic text-graphite/80">"Why should I care about certification if I just like the design?"</p>
                  <p className="mt-2 text-graphite/90">Because when you know your jewelry is real, pure, and certified, it becomes more than an accessory. It becomes a smart, secure, and joyful purchase.</p>
                </div>
                
                <div className="overflow-hidden rounded-lg border border-gold/20 bg-white/90 backdrop-blur-sm">
                  <table className="min-w-full divide-y divide-gold/10">
                    <thead className="bg-gold/5">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-graphite">
                          🛡️ Certification Means...
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-graphite">
                          ❤️ You Experience...
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gold/10 bg-white">
                      {topicContent.benefitsTable.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gold/5'}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-graphite">
                            {row.certification}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-graphite/80">
                            {row.experience}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Conclusion */}
              <div className="p-6 bg-gold/5 rounded-lg border border-gold/20 text-center">
                <h2 className="text-2xl font-serif font-medium mb-4">You Deserve a Better Buying Experience</h2>
                <p className="text-graphite/80 mb-2">{topicContent.conclusion}</p>
              </div>
            </>
          ) : (
            <div className="prose prose-lg max-w-none">
              {topicContent.content.map((section, index) => (
                <div key={index} className="mb-8 bg-white/90 backdrop-blur-sm rounded-lg p-6 border border-gold/10 shadow-sm">
                  <h2 className="text-2xl font-serif font-medium mb-3 flex items-center">
                    {index === 0 ? <BookOpen className="h-6 w-6 text-gold mr-2" /> : 
                     index === 1 ? <Award className="h-6 w-6 text-gold mr-2" /> :
                     index === 2 ? <Shield className="h-6 w-6 text-gold mr-2" /> :
                     index === 3 ? <Map className="h-6 w-6 text-gold mr-2" /> :
                     index === 4 ? <Calculator className="h-6 w-6 text-gold mr-2" /> :
                     <Gem className="h-6 w-6 text-gold mr-2" />}
                    {section.heading}
                  </h2>
                  <p className="text-graphite/80 leading-relaxed">{section.text}</p>
                  
                  {/* Visual aid boxes for certain topics */}
                  {topic === 'gold-purity' && index === 1 && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gold/5 p-4 rounded-lg border border-gold/10">
                        <h5 className="font-medium mb-2 text-center">24K Gold</h5>
                        <p className="text-sm text-center">99.9% pure gold</p>
                        <div className="h-4 w-full bg-gold mt-2 rounded"></div>
                      </div>
                      <div className="bg-gold/5 p-4 rounded-lg border border-gold/10">
                        <h5 className="font-medium mb-2 text-center">18K Gold</h5>
                        <p className="text-sm text-center">75% pure gold</p>
                        <div className="h-4 w-full bg-gradient-to-r from-gold to-transparent mt-2 rounded" style={{width: "75%"}}></div>
                      </div>
                      <div className="bg-gold/5 p-4 rounded-lg border border-gold/10">
                        <h5 className="font-medium mb-2 text-center">14K Gold</h5>
                        <p className="text-sm text-center">58.3% pure gold</p>
                        <div className="h-4 w-full bg-gradient-to-r from-gold to-transparent mt-2 rounded" style={{width: "58.3%"}}></div>
                      </div>
                    </div>
                  )}
                  
                  {topic === 'making-charges' && index === 0 && (
                    <div className="mt-4 p-4 bg-gold/5 rounded-lg border border-gold/10">
                      <h5 className="font-medium mb-2">Example Calculation:</h5>
                      <p className="text-sm">
                        For a 10-gram 22K gold necklace with 15% making charges:<br/>
                        • Gold value: ₹55,000 (at ₹5,500 per gram)<br/>
                        • Making charges: ₹8,250 (15% of gold value)<br/>
                        • Total cost: ₹63,250 (plus taxes)
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EducationDetail;
