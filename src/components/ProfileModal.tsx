import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  Users, 
  MapPin, 
  Shield, 
  MessageSquare, 
  UserCheck, 
  Heart,
  Clock,
  CheckCircle
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: {
    id: string;
    name: string;
    avatar: string;
    age?: number;
    compatibility?: number;
    interests: string[];
    mutualFriends: number;
    distance?: number;
    bio?: string;
    verificationLevel?: 'Gold' | 'Silver' | 'Verified' | 'Basic';
    trustScore?: number;
    friendTestimony?: {
      recommender: string;
      recommenderAvatar: string;
      testimony: string;
      relationship: string;
    } | null;
    socialProof?: {
      endorsements: number;
      responseRate: number;
      mutualConnections: number;
    };
    vouchers?: {
      friendName: string;
      friendAvatar: string;
      recommendation: string;
      relationshipToTarget: string;
    }[];
    location?: {
      latitude?: number;
      longitude?: number;
      city?: string;
      country?: string;
    };
  };
  onAction?: () => void;
  actionLabel?: string;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onAction,
  actionLabel = "Connect"
}) => {
  const getVerificationColor = (level?: string) => {
    switch (level) {
      case 'Gold': return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 'Silver': return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 'Verified': return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const getTrustScoreColor = (score?: number) => {
    if (!score) return 'text-gray-600 bg-gray-50';
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    return 'text-purple-600 bg-purple-50';
  };

  const getCompatibilityColor = (score?: number) => {
    if (!score) return 'text-gray-700 bg-gray-100';
    if (score >= 85) return 'text-green-700 bg-green-100';
    if (score >= 70) return 'text-blue-700 bg-blue-100';
    return 'text-purple-700 bg-purple-100';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Profile Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="text-xl font-semibold">{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {profile.verificationLevel && (
                <Badge className={`absolute -bottom-1 -right-1 text-xs px-1 py-0 ${getVerificationColor(profile.verificationLevel)}`}>
                  <Shield className="w-3 h-3" />
                </Badge>
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-slate-800">
              {profile.name}{profile.age && `, ${profile.age}`}
            </h2>
            
            <div className="flex items-center justify-center space-x-4 mt-2 text-sm text-slate-600">
              {profile.distance !== undefined && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {profile.distance}km away
                </div>
              )}
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {profile.mutualFriends} mutual
              </div>
            </div>
          </div>

          {/* Trust & Compatibility Scores */}
          <div className="flex space-x-3">
            {profile.trustScore && (
              <Badge className={`flex-1 justify-center py-2 ${getTrustScoreColor(profile.trustScore)}`}>
                <Star className="w-4 h-4 mr-1" />
                Trust: {profile.trustScore}%
              </Badge>
            )}
            {profile.compatibility && (
              <Badge className={`flex-1 justify-center py-2 ${getCompatibilityColor(profile.compatibility)}`}>
                <Heart className="w-4 h-4 mr-1" />
                Match: {profile.compatibility}%
              </Badge>
            )}
          </div>

          {/* Social Proof Details */}
          {profile.socialProof && (
            <Card className="bg-slate-50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  Social Verification
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <div>
                      <div className="font-medium">{profile.socialProof.endorsements}</div>
                      <div className="text-slate-600">Endorsements</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <div>
                      <div className="font-medium">{profile.socialProof.responseRate}%</div>
                      <div className="text-slate-600">Response Rate</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 col-span-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    <div>
                      <div className="font-medium">{profile.socialProof.mutualConnections}</div>
                      <div className="text-slate-600">Mutual Connections</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Friend Testimony */}
          {profile.friendTestimony && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={profile.friendTestimony.recommenderAvatar} />
                    <AvatarFallback className="text-sm">{profile.friendTestimony.recommender.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-slate-800">{profile.friendTestimony.recommender}</div>
                    <div className="text-sm text-slate-600">{profile.friendTestimony.relationship}</div>
                  </div>
                  <MessageSquare className="w-5 h-5 text-blue-600 ml-auto" />
                </div>
                <p className="text-sm italic text-slate-700 leading-relaxed">
                  "{profile.friendTestimony.testimony}"
                </p>
              </CardContent>
            </Card>
          )}

          {/* Vouchers (for Discover page) */}
          {profile.vouchers && profile.vouchers.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-800">Friend Recommendations</h3>
              {profile.vouchers.map((voucher, idx) => (
                <Card key={idx} className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={voucher.friendAvatar} />
                        <AvatarFallback className="text-xs">{voucher.friendName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-slate-800 text-sm">{voucher.friendName}</div>
                        <div className="text-xs text-slate-600">{voucher.relationshipToTarget}</div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      "{voucher.recommendation}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Bio */}
          {profile.bio && (
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">About</h3>
              <p className="text-slate-600 leading-relaxed">{profile.bio}</p>
            </div>
          )}

          {/* Interests */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, idx) => (
                <Badge key={idx} variant="secondary" className="rounded-full bg-slate-100 text-slate-700">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Button */}
          {onAction && (
            <Button
              onClick={onAction}
              className="w-full rounded-full gradient-primary hover:scale-105 transition-transform"
              size="lg"
            >
              <UserCheck className="w-5 h-5 mr-2" />
              {actionLabel}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
