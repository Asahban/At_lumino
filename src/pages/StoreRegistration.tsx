import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  ArrowLeft, 
  ArrowRight, 
  Store, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  FileCheck, 
  Building, 
  Upload, 
  CheckCircle, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube,
  User
} from 'lucide-react';
import LuxuryBackground from '@/components/LuxuryBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import storeRegistrationService from '@/services/storeRegistrationService';

const statesData = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const StoreRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  const storeLogoRef = useRef<HTMLInputElement>(null);
  const coverImageRef = useRef<HTMLInputElement>(null);
  const licenseRef = useRef<HTMLInputElement>(null);
  const registrationRef = useRef<HTMLInputElement>(null);
  
  const [storeInfo, setStoreInfo] = useState({
    name: '',
    tagline: '',
    description: '',
    establishedYear: '',
    logo: null as File | null,
    logoPreview: '',
    coverImage: null as File | null,
    coverPreview: '',
  });
  
  const [contactInfo, setContactInfo] = useState({
    ownerName: '',
    email: '',
    phone: '',
    whatsapp: '',
    website: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  
  const [socialMedia, setSocialMedia] = useState({
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    youtube: '',
  });
  
  const [verification, setVerification] = useState({
    license: null as File | null,
    licensePreview: '',
    gstin: '',
    registrationCert: null as File | null,
    registrationPreview: '',
    termsAgreed: false,
  });
  
  const isStep1Complete = () => {
    return (
      storeInfo.name && 
      storeInfo.description && 
      storeInfo.logo
    );
  };
  
  const isStep2Complete = () => {
    return (
      contactInfo.ownerName && 
      contactInfo.email && 
      contactInfo.phone &&
      contactInfo.address &&
      contactInfo.city &&
      contactInfo.state &&
      contactInfo.pincode
    );
  };
  
  const isStep4Complete = () => {
    return (
      verification.license && 
      verification.gstin && 
      verification.registrationCert &&
      verification.termsAgreed
    );
  };
  
  const handleStoreInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoreInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialMedia(prev => ({ ...prev, [name]: value }));
  };
  
  const handleVerificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVerification(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    if (name.includes('state') || name.includes('city')) {
      setContactInfo(prev => ({ ...prev, [name]: value }));
    } else {
      setStoreInfo(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setVerification(prev => ({ ...prev, termsAgreed: checked }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        if (fileType === 'logo') {
          setStoreInfo(prev => ({ 
            ...prev, 
            logo: file,
            logoPreview: reader.result as string
          }));
        } else if (fileType === 'cover') {
          setStoreInfo(prev => ({ 
            ...prev, 
            coverImage: file,
            coverPreview: reader.result as string
          }));
        } else if (fileType === 'license') {
          setVerification(prev => ({ 
            ...prev, 
            license: file,
            licensePreview: reader.result as string
          }));
        } else if (fileType === 'registration') {
          setVerification(prev => ({ 
            ...prev, 
            registrationCert: file,
            registrationPreview: reader.result as string
          }));
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleNext = () => {
    if (step === 1 && !isStep1Complete()) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields before continuing.",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 2 && !isStep2Complete()) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields before continuing.",
        variant: "destructive",
      });
      return;
    }
    
    setStep(prev => prev + 1);
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      navigate('/auth');
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isStep4Complete()) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields and agree to the terms.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const registrationData = {
        storeInfo: {
          name: storeInfo.name,
          tagline: storeInfo.tagline,
          description: storeInfo.description,
          establishedYear: storeInfo.establishedYear,
          logo: storeInfo.logo,
          coverImage: storeInfo.coverImage,
        },
        contactInfo: {
          ownerName: contactInfo.ownerName,
          email: contactInfo.email,
          phone: contactInfo.phone,
          whatsapp: contactInfo.whatsapp,
          website: contactInfo.website,
          address: contactInfo.address,
          city: contactInfo.city,
          state: contactInfo.state,
          pincode: contactInfo.pincode,
        },
        socialMedia: {
          facebook: socialMedia.facebook,
          instagram: socialMedia.instagram,
          twitter: socialMedia.twitter,
          linkedin: socialMedia.linkedin,
          youtube: socialMedia.youtube,
        },
        verification: {
          license: verification.license,
          gstin: verification.gstin,
          registrationCert: verification.registrationCert,
          termsAgreed: verification.termsAgreed,
        }
      };

      await storeRegistrationService.registerStore(registrationData);
      
      setLoading(false);
      setShowSuccessDialog(true);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your store registration. Please try again.",
        variant: "destructive",
      });
      console.error('Store Registration Error:', error);
    }
  };
  
  const handleFinish = () => {
    setShowSuccessDialog(false);
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 z-0">
        <LuxuryBackground theme="light" />
      </div>
      
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <button 
              onClick={handleBack}
              className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              {step > 1 ? 'Back to previous step' : 'Back to sign up'}
            </button>
          </div>
          
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gold/20 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="mb-8">
                <div className="flex items-center justify-center mb-6">
                  {[1, 2, 3, 4].map((stepNumber) => (
                    <React.Fragment key={stepNumber}>
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step >= stepNumber ? 'bg-gold text-white' : 'bg-gold/20 text-gold'
                        }`}
                      >
                        {stepNumber}
                      </div>
                      {stepNumber < 4 && (
                        <div className={`w-16 h-1 ${step > stepNumber ? 'bg-gold' : 'bg-gold/20'}`}></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                
                <h1 className="text-2xl font-serif font-bold text-center">
                  {step === 1 ? 'Basic Store Information' : 
                   step === 2 ? 'Contact & Business Details' : 
                   step === 3 ? 'Social Media & Online Presence' :
                   'Business Verification'}
                </h1>
                <p className="text-graphite/70 mt-1 text-center">
                  {step === 1 ? 'Tell us about your jewelry store' : 
                   step === 2 ? 'How can customers reach you?' : 
                   step === 3 ? 'Share your online presence (optional)' :
                   'Verify your business credentials'}
                </p>
              </div>
              
              <form onSubmit={step === 4 ? handleSubmit : (e) => e.preventDefault()}>
                {step === 1 && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center">
                        <Store className="h-4 w-4 mr-1.5 text-gold" />
                        Store Name
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input 
                        id="name" 
                        name="name"
                        value={storeInfo.name}
                        onChange={handleStoreInfoChange}
                        placeholder="Your jewelry store name" 
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tagline">
                        Store Tagline
                      </Label>
                      <Input 
                        id="tagline" 
                        name="tagline"
                        value={storeInfo.tagline}
                        onChange={handleStoreInfoChange}
                        placeholder="A short, catchy phrase that describes your store (optional)" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Store Description
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Textarea 
                        id="description" 
                        name="description"
                        value={storeInfo.description}
                        onChange={handleStoreInfoChange}
                        placeholder="Tell customers about your store, history, and specialty..." 
                        rows={4}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="establishedYear" className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1.5 text-gold" />
                        Year Established
                      </Label>
                      <Input 
                        id="establishedYear" 
                        name="establishedYear"
                        value={storeInfo.establishedYear}
                        onChange={handleStoreInfoChange}
                        placeholder="e.g., 2005" 
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="flex items-center">
                          <Upload className="h-4 w-4 mr-1.5 text-gold" />
                          Store Logo
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <div className="border-2 border-dashed border-gold/20 rounded-lg p-4 text-center hover:bg-gold/5 transition-colors cursor-pointer" onClick={() => storeLogoRef.current?.click()}>
                          <input 
                            type="file" 
                            ref={storeLogoRef}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, 'logo')}
                          />
                          
                          {storeInfo.logoPreview ? (
                            <div className="relative w-full h-40 overflow-hidden rounded-md">
                              <img 
                                src={storeInfo.logoPreview} 
                                alt="Store logo preview" 
                                className="w-full h-full object-contain"
                              />
                              <button 
                                type="button"
                                className="absolute top-1 right-1 bg-white/80 rounded-full p-1 hover:bg-white"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setStoreInfo(prev => ({ ...prev, logo: null, logoPreview: '' }));
                                }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <div className="py-4">
                              <Upload className="h-10 w-10 text-gold/40 mx-auto mb-2" />
                              <p className="text-sm text-graphite/60">Click to upload your store logo</p>
                              <p className="text-xs text-graphite/40 mt-1">JPG, PNG or SVG (max 2MB)</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="flex items-center">
                          <Upload className="h-4 w-4 mr-1.5 text-gold" />
                          Cover Image
                        </Label>
                        <div className="border-2 border-dashed border-gold/20 rounded-lg p-4 text-center hover:bg-gold/5 transition-colors cursor-pointer" onClick={() => coverImageRef.current?.click()}>
                          <input 
                            type="file" 
                            ref={coverImageRef}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, 'cover')}
                          />
                          
                          {storeInfo.coverPreview ? (
                            <div className="relative w-full h-40 overflow-hidden rounded-md">
                              <img 
                                src={storeInfo.coverPreview} 
                                alt="Cover image preview" 
                                className="w-full h-full object-cover"
                              />
                              <button 
                                type="button"
                                className="absolute top-1 right-1 bg-white/80 rounded-full p-1 hover:bg-white"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setStoreInfo(prev => ({ ...prev, coverImage: null, coverPreview: '' }));
                                }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <div className="py-4">
                              <Upload className="h-10 w-10 text-gold/40 mx-auto mb-2" />
                              <p className="text-sm text-graphite/60">Click to upload a cover image</p>
                              <p className="text-xs text-graphite/40 mt-1">JPG or PNG (max 5MB)</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {step === 2 && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="ownerName" className="flex items-center">
                        <User className="h-4 w-4 mr-1.5 text-gold" />
                        Owner's Full Name
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input 
                        id="ownerName" 
                        name="ownerName"
                        value={contactInfo.ownerName}
                        onChange={handleContactInfoChange}
                        placeholder="Full name of the store owner" 
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center">
                          <Mail className="h-4 w-4 mr-1.5 text-gold" />
                          Email Address
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email"
                          value={contactInfo.email}
                          onChange={handleContactInfoChange}
                          placeholder="business@example.com" 
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center">
                          <Phone className="h-4 w-4 mr-1.5 text-gold" />
                          Phone Number
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Input 
                          id="phone" 
                          name="phone"
                          value={contactInfo.phone}
                          onChange={handleContactInfoChange}
                          placeholder="Your business phone number" 
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="whatsapp" className="flex items-center">
                          WhatsApp Number
                        </Label>
                        <Input 
                          id="whatsapp" 
                          name="whatsapp"
                          value={contactInfo.whatsapp}
                          onChange={handleContactInfoChange}
                          placeholder="WhatsApp number (if different from phone)" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="website" className="flex items-center">
                          Website URL
                        </Label>
                        <Input 
                          id="website" 
                          name="website"
                          value={contactInfo.website}
                          onChange={handleContactInfoChange}
                          placeholder="https://www.yourstore.com" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address" className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1.5 text-gold" />
                        Store Address
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Textarea 
                        id="address" 
                        name="address"
                        value={contactInfo.address}
                        onChange={handleContactInfoChange}
                        placeholder="Full address of your jewelry store" 
                        rows={2}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">
                          City
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Input 
                          id="city" 
                          name="city"
                          value={contactInfo.city}
                          onChange={handleContactInfoChange}
                          placeholder="City" 
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">
                          State
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange('state', value)} 
                          defaultValue={contactInfo.state}
                        >
                          <SelectTrigger id="state">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent className="max-h-80">
                            {statesData.map((state) => (
                              <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pincode">
                          PIN Code
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Input 
                          id="pincode" 
                          name="pincode"
                          value={contactInfo.pincode}
                          onChange={handleContactInfoChange}
                          placeholder="PIN code" 
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {step === 3 && (
                  <div className="space-y-5">
                    <div className="bg-gold/5 border border-gold/20 rounded-lg p-5 mb-5">
                      <p className="text-graphite/70 text-sm">
                        Sharing your social media profiles helps customers connect with your store and discover your latest collections.
                        All fields in this section are optional.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="facebook" className="flex items-center">
                        <Facebook className="h-4 w-4 mr-1.5 text-gold" />
                        Facebook Page
                      </Label>
                      <Input 
                        id="facebook" 
                        name="facebook"
                        value={socialMedia.facebook}
                        onChange={handleSocialMediaChange}
                        placeholder="https://facebook.com/yourstore" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="instagram" className="flex items-center">
                        <Instagram className="h-4 w-4 mr-1.5 text-gold" />
                        Instagram Handle
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                          @
                        </div>
                        <Input 
                          id="instagram" 
                          name="instagram"
                          value={socialMedia.instagram}
                          onChange={handleSocialMediaChange}
                          placeholder="yourstorename" 
                          className="pl-7"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="twitter" className="flex items-center">
                        <Twitter className="h-4 w-4 mr-1.5 text-gold" />
                        Twitter/X Profile
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                          @
                        </div>
                        <Input 
                          id="twitter" 
                          name="twitter"
                          value={socialMedia.twitter}
                          onChange={handleSocialMediaChange}
                          placeholder="yourstorename" 
                          className="pl-7"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="linkedin" className="flex items-center">
                        <Linkedin className="h-4 w-4 mr-1.5 text-gold" />
                        LinkedIn Business Page
                      </Label>
                      <Input 
                        id="linkedin" 
                        name="linkedin"
                        value={socialMedia.linkedin}
                        onChange={handleSocialMediaChange}
                        placeholder="https://linkedin.com/company/yourstore" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="youtube" className="flex items-center">
                        <Youtube className="h-4 w-4 mr-1.5 text-gold" />
                        YouTube Channel
                      </Label>
                      <Input 
                        id="youtube" 
                        name="youtube"
                        value={socialMedia.youtube}
                        onChange={handleSocialMediaChange}
                        placeholder="https://youtube.com/c/yourstore" 
                      />
                    </div>
                  </div>
                )}
                
                {step === 4 && (
                  <div className="space-y-5">
                    <div className="bg-gold/5 border border-gold/20 rounded-lg p-5 mb-5">
                      <h3 className="font-serif text-lg mb-3 flex items-center">
                        <FileCheck className="h-5 w-5 text-gold mr-2" />
                        Business Verification
                      </h3>
                      <p className="text-graphite/70 text-sm">
                        To ensure a safe and trustworthy marketplace, we verify all jewelry stores on our platform.
                        Please provide the following documents to complete your registration.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="flex items-center">
                        <FileCheck className="h-4 w-4 mr-1.5 text-gold" />
                        Trade License / Shop Establishment Certificate
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <div className="border-2 border-dashed border-gold/20 rounded-lg p-4 text-center hover:bg-gold/5 transition-colors cursor-pointer" onClick={() => licenseRef.current?.click()}>
                        <input 
                          type="file" 
                          ref={licenseRef}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, 'license')}
                        />
                        
                        {verification.licensePreview ? (
                          <div className="relative w-full overflow-hidden rounded-md p-2 bg-gold/5 flex items-center justify-between">
                            <div className="flex items-center">
                              <FileCheck className="h-5 w-5 text-gold mr-2" />
                              <span className="text-sm">Document uploaded successfully</span>
                            </div>
                            <button 
                              type="button"
                              className="bg-white/80 rounded-full p-1 hover:bg-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                setVerification(prev => ({ ...prev, license: null, licensePreview: '' }));
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div className="py-4">
                            <Upload className="h-10 w-10 text-gold/40 mx-auto mb-2" />
                            <p className="text-sm text-graphite/60">Click to upload your business license</p>
                            <p className="text-xs text-graphite/40 mt-1">PDF, JPG or PNG (max 5MB)</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="gstin" className="flex items-center">
                        <Building className="h-4 w-4 mr-1.5 text-gold" />
                        Tax Identification Number (GSTIN)
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input 
                        id="gstin" 
                        name="gstin"
                        value={verification.gstin}
                        onChange={handleVerificationChange}
                        placeholder="Your GSTIN number" 
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Format: 22AAAAA0000A1Z5
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="flex items-center">
                        <FileCheck className="h-4 w-4 mr-1.5 text-gold" />
                        Business Registration Certificate
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <div className="border-2 border-dashed border-gold/20 rounded-lg p-4 text-center hover:bg-gold/5 transition-colors cursor-pointer" onClick={() => registrationRef.current?.click()}>
                        <input 
                          type="file" 
                          ref={registrationRef}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, 'registration')}
                        />
                        
                        {verification.registrationPreview ? (
                          <div className="relative w-full overflow-hidden rounded-md p-2 bg-gold/5 flex items-center justify-between">
                            <div className="flex items-center">
                              <FileCheck className="h-5 w-5 text-gold mr-2" />
                              <span className="text-sm">Document uploaded successfully</span>
                            </div>
                            <button 
                              type="button"
                              className="bg-white/80 rounded-full p-1 hover:bg-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                setVerification(prev => ({ ...prev, registrationCert: null, registrationPreview: '' }));
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div className="py-4">
                            <Upload className="h-10 w-10 text-gold/40 mx-auto mb-2" />
                            <p className="text-sm text-graphite/60">Click to upload registration certificate</p>
                            <p className="text-xs text-graphite/40 mt-1">PDF, JPG or PNG (max 5MB)</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center space-x-2">
                      <Checkbox 
                        id="terms" 
                        checked={verification.termsAgreed}
                        onCheckedChange={handleCheckboxChange}
                        required
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I confirm that my business is legally registered and agree to Lumino's <a href="#" className="text-gold hover:underline">Terms & Conditions</a>
                      </Label>
                    </div>
                  </div>
                )}
                
                <div className="mt-8 flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="border-gold/30 hover:bg-gold/10"
                    onClick={handleBack}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  
                  {step < 4 ? (
                    <Button 
                      type="button" 
                      className="bg-gold hover:bg-gold/90"
                      onClick={handleNext}
                    >
                      Next Step
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      className="bg-gold hover:bg-gold/90"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Complete Registration"}
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center flex flex-col items-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
              Registration Successful!
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Thank you for registering your jewelry store with Lumino. We've received your information and will review it shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-gold/5 border border-gold/20 rounded-lg p-4 my-4">
            <h4 className="font-medium mb-2">What happens next?</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center mr-2 mt-0.5">1</span>
                <span>Our verification team will review your submission within 48 hours</span>
              </li>
              <li className="flex items-start">
                <span className="w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center mr-2 mt-0.5">2</span>
                <span>You'll receive an email confirmation once your store is approved</span>
              </li>
              <li className="flex items-start">
                <span className="w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center mr-2 mt-0.5">3</span>
                <span>Log in to your account and start listing your jewelry pieces</span>
              </li>
            </ul>
          </div>
          <DialogFooter>
            <Button 
              className="w-full bg-gold hover:bg-gold/90" 
              onClick={handleFinish}
            >
              Return to Home
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default StoreRegistration;
