
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  HoverCard, 
  HoverCardTrigger, 
  HoverCardContent 
} from '@/components/ui/hover-card';
import { 
  Award, 
  BadgeCheck, 
  FileCheck, 
  Medal, 
  Shield, 
  Star, 
  Verified 
} from 'lucide-react';
import { CertificationType } from '@/services/storeService';
import { Badge } from '@/components/ui/badge';

interface CertificationBadgeProps {
  type: CertificationType;
  showTooltip?: boolean;
  className?: string;
  size?: string;
}

const CertificationBadge = ({ 
  type, 
  showTooltip = true,
  className,
  size
}: CertificationBadgeProps) => {
  // Get icon and description based on certification type
  const getCertificationDetails = (certType: CertificationType) => {
    switch (certType) {
      case 'BIS Hallmark':
        return {
          icon: <Shield className="h-3.5 w-3.5" />,
          color: 'bg-amber-100 text-amber-900 border-amber-200 hover:bg-amber-200',
          description: 'Bureau of Indian Standards certification ensuring gold purity and quality standards. Required for all gold jewelry sold in India.'
        };
      case 'BIS':
        return {
          icon: <Shield className="h-3.5 w-3.5" />,
          color: 'bg-amber-100 text-amber-900 border-amber-200 hover:bg-amber-200',
          description: 'Bureau of Indian Standards certification ensuring gold purity and quality standards. Required for all gold jewelry sold in India.'
        };
      case 'GIA':
        return {
          icon: <Medal className="h-3.5 w-3.5" />,
          color: 'bg-blue-100 text-blue-900 border-blue-200 hover:bg-blue-200',
          description: 'Gemological Institute of America certification for diamonds, considered the global standard for diamond quality assessment.'
        };
      case 'IGI':
        return {
          icon: <FileCheck className="h-3.5 w-3.5" />,
          color: 'bg-violet-100 text-violet-900 border-violet-200 hover:bg-violet-200',
          description: 'International Gemological Institute certification for diamonds and gemstones, widely recognized across the world.'
        };
      case 'SGL':
        return {
          icon: <Star className="h-3.5 w-3.5" />,
          color: 'bg-emerald-100 text-emerald-900 border-emerald-200 hover:bg-emerald-200',
          description: 'Solitaire Gem Labs certification, specializing in diamond grading and authentication services.'
        };
      case 'Platinum Guild':
        return {
          icon: <Award className="h-3.5 w-3.5" />,
          color: 'bg-slate-100 text-slate-900 border-slate-200 hover:bg-slate-200',
          description: 'Platinum Guild International certification ensuring platinum purity and quality in jewelry pieces.'
        };
      case 'Lab-Certified Gemstones':
        return {
          icon: <BadgeCheck className="h-3.5 w-3.5" />,
          color: 'bg-rose-100 text-rose-900 border-rose-200 hover:bg-rose-200',
          description: 'Independently verified gemstones that have been professionally certified for authenticity and quality.'
        };
      case 'ISO':
        return {
          icon: <Verified className="h-3.5 w-3.5" />,
          color: 'bg-gray-100 text-gray-900 border-gray-200 hover:bg-gray-200',
          description: 'International Organization for Standardization compliance, ensuring business processes meet global quality standards.'
        };
      default:
        return {
          icon: <Shield className="h-3.5 w-3.5" />,
          color: 'bg-gray-100 text-gray-900 border-gray-200 hover:bg-gray-200',
          description: 'Official certification ensuring quality and authenticity standards.'
        };
    }
  };

  const { icon, color, description } = getCertificationDetails(type);

  if (showTooltip) {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Badge 
            variant="outline" 
            className={cn("flex items-center gap-1 py-1 px-2 text-xs font-medium", color, className)}
          >
            {icon}
            <span>{type}</span>
          </Badge>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 text-sm">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className={cn("p-1.5 rounded-full", color)}>
                {icon}
              </div>
              <h4 className="font-medium">{type}</h4>
            </div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  }

  return (
    <Badge 
      variant="outline" 
      className={cn("flex items-center gap-1 py-1 px-2 text-xs font-medium", color, className)}
    >
      {icon}
      <span>{type}</span>
    </Badge>
  );
};

export default CertificationBadge;
