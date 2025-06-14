import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import NavigationBar from '@/components/NavigationBar';
import ProfileModal from '@/components/ProfileModal';
import { Heart, X, Users, MapPin, Shield, Star, UserCheck, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Recommendation {
  id: string;
  name: string;
  avatar: string;
  age: number;
  mutualFriends: number;
  compatibilityScore: number;
  interests: string[];
  distance: number;
  bio: string;
  verificationLevel: 'Gold' | 'Silver' | 'Verified' | 'Basic';
  trustScore: number;
  friendTestimony: {
    recommender: string;
    recommenderAvatar: string;
    testimony: string;
    relationship: string;
  } | null;
  socialProof: {
    endorsements: number;
    responseRate: number;
    mutualConnections: number;
  };
}

const mockRecommendations: Recommendation[] = [
  {
    id: '4',
    name: 'Olivia Bennett',
    avatar: 'https://i.pravatar.cc/150?img=12',
    age: 29,
    mutualFriends: 4,
    compatibilityScore: 89,
    interests: ['Reading', 'Travel', 'Yoga'],
    distance: 7,
    bio: 'Book lover and travel enthusiast. Looking for someone to explore new cultures and share quiet moments with.',
    verificationLevel: 'Gold',
    trustScore: 91,
    friendTestimony: {
      recommender: 'Daniel Clark',
      recommenderAvatar: 'https://i.pravatar.cc/150?img=5',
      testimony: 'Olivia is a fantastic person to be around. You both love to read and travel!',
      relationship: 'Friend'
    },
    socialProof: {
      endorsements: 10,
      responseRate: 95,
      mutualConnections: 7
    }
  },
  {
    id: '5',
    name: 'Ethan Martinez',
    avatar: 'https://i.pravatar.cc/150?img=50',
    age: 33,
    mutualFriends: 6,
    compatibilityScore: 91,
    interests: ['Gaming', 'Movies', 'Tech'],
    distance: 10,
    bio: 'Gamer and tech enthusiast. Seeking someone to share virtual adventures and movie nights with.',
    verificationLevel: 'Silver',
    trustScore: 87,
    friendTestimony: {
      recommender: 'Ava White',
      recommenderAvatar: 'https://i.pravatar.cc/150?img=9',
      testimony: 'Ethan is a great guy, always up for a good game. You both are into tech, so you will have a lot to talk about!',
      relationship: 'Gaming Buddy'
    },
    socialProof: {
      endorsements: 13,
      responseRate: 89,
      mutualConnections: 10
    }
  },
  {
    id: '6',
    name: 'Isabella Garcia',
    avatar: 'https://i.pravatar.cc/150?img=27',
    age: 27,
    mutualFriends: 3,
    compatibilityScore: 82,
    interests: ['Dancing', 'Fitness', 'Cooking'],
    distance: 4,
    bio: 'Dance enthusiast and fitness lover. Looking for someone to share healthy recipes and dance moves with.',
    verificationLevel: 'Verified',
    trustScore: 84,
    friendTestimony: null,
    socialProof: {
      endorsements: 7,
      responseRate: 92,
      mutualConnections: 6
    }
  }
];

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState(mockRecommendations);
  const [expandedRecommendation, setExpandedRecommendation] = useState<string | null>(null);
  const [showTestimony, setShowTestimony] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<Recommendation | null>(null);
  const { toast } = useToast();

  const handleConnect = (recommendationId: string, name: string) => {
    setRecommendations(prev => prev.filter(recommendation => recommendation.id !== recommendationId));
    toast({
      title: "Connection sent! 💜",
      description: `Your request was sent to ${name}`,
    });
    setSelectedProfile(null);
  };

  const handleSkip = (recommendationId: string) => {
    setRecommendations(prev => prev.filter(recommendation => recommendation.id !== recommendationId));
  };

  const handleProfileClick = (recommendation: Recommendation) => {
    setSelectedProfile(recommendation);
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 85) return 'text-green-700 bg-green-100';
    if (score >= 70) return 'text-blue-700 bg-blue-100';
    return 'text-purple-700 bg-purple-100';
  };

  const getVerificationColor = (level: string) => {
    switch (level) {
      case 'Gold': return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 'Silver': return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 'Verified': return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    return 'text-purple-600 bg-purple-50';
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b p-4">
        <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Friend Recommendations
        </h1>
      </div>

      {/* Recommendation Feed */}
      <div className="p-4 space-y-6">
        {recommendations.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800">No new recommendations!</h3>
            <p className="text-slate-600 mb-4">Check back later for more friend recommendations</p>
          </div>
        ) : (
          recommendations.map((recommendation, index) => (
            <Card
              key={recommendation.id}
              className="gradient-card border-0 shadow-lg rounded-3xl overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                {/* Profile Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative cursor-pointer" onClick={() => handleProfileClick(recommendation)}>
                      <Avatar className="w-16 h-16 border-4 border-white shadow-md hover:scale-105 transition-transform">
                        <AvatarImage src={recommendation.avatar} alt={recommendation.name} />
                        <AvatarFallback className="text-slate-800 font-semibold">{recommendation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {/* Verification Badge */}
                      <Badge className={`absolute -bottom-1 -right-1 text-xs px-1 py-0 ${getVerificationColor(recommendation.verificationLevel)}`}>
                        <Shield className="w-3 h-3" />
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-xl font-semibold text-slate-800">{recommendation.name}, {recommendation.age}</h3>
                        <Badge className={`text-xs ${getTrustScoreColor(recommendation.trustScore)}`}>
                          <Star className="w-3 h-3 mr-1" />
                          {recommendation.trustScore}%
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-slate-600">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {recommendation.mutualFriends} mutual
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {recommendation.distance}km away
                        </div>
                        <div className="flex items-center">
                          <UserCheck className="w-4 h-4 mr-1" />
                          {recommendation.socialProof.responseRate}% response
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getCompatibilityColor(recommendation.compatibilityScore)} border-0 font-semibold`}>
                      {recommendation.compatibilityScore}%
                    </Badge>
                  </div>

                  {/* Social Proof */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-slate-50 rounded-2xl">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center text-slate-700">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {recommendation.socialProof.endorsements} endorsements
                      </div>
                      <div className="flex items-center text-slate-700">
                        <Users className="w-4 h-4 mr-1 text-blue-500" />
                        {recommendation.socialProof.mutualConnections} connections
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {recommendation.verificationLevel}
                    </Badge>
                  </div>

                  {/* Friend Testimony */}
                  {recommendation.friendTestimony && (
                    <div className="mb-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start p-3 h-auto bg-blue-50 hover:bg-blue-100 rounded-2xl"
                        onClick={() => setShowTestimony(showTestimony === recommendation.id ? null : recommendation.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={recommendation.friendTestimony.recommenderAvatar} />
                            <AvatarFallback className="text-xs">{recommendation.friendTestimony.recommender.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="text-left">
                            <div className="flex items-center space-x-2">
                              <MessageSquare className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-medium text-slate-800">
                                {recommendation.friendTestimony.recommender} recommends
                              </span>
                            </div>
                            <p className="text-xs text-slate-600">{recommendation.friendTestimony.relationship}</p>
                          </div>
                        </div>
                      </Button>

                      {showTestimony === recommendation.id && (
                        <div className="mt-3 p-4 bg-white border-l-4 border-blue-400 rounded-2xl shadow-sm animate-fade-in">
                          <p className="text-sm italic text-slate-700 leading-relaxed">
                            "{recommendation.friendTestimony.testimony}"
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Interests */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {recommendation.interests.map((interest, idx) => (
                      <Badge key={idx} variant="secondary" className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">
                        {interest}
                      </Badge>
                    ))}
                  </div>

                  {/* Bio (Expandable) */}
                  <div
                    className="cursor-pointer"
                    onClick={() => setExpandedRecommendation(
                      expandedRecommendation === recommendation.id ? null : recommendation.id
                    )}
                  >
                    <p className={`text-slate-600 ${
                      expandedRecommendation === recommendation.id ? '' : 'line-clamp-2'
                    }`}>
                      {recommendation.bio}
                    </p>
                    {recommendation.bio.length > 100 && (
                      <span className="text-primary text-sm font-medium">
                        {expandedRecommendation === recommendation.id ? 'Show less' : 'Read more'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex p-4 pt-0 space-x-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 rounded-full border-2 hover:bg-gray-50 text-slate-700 border-slate-300"
                    onClick={() => handleSkip(recommendation.id)}
                  >
                    <X className="w-5 h-5 mr-2" />
                    Skip
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1 rounded-full gradient-primary hover:scale-105 transition-transform"
                    onClick={() => handleConnect(recommendation.id, recommendation.name)}
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Profile Modal */}
      {selectedProfile && (
        <ProfileModal
          isOpen={true}
          onClose={() => setSelectedProfile(null)}
          profile={{
            ...selectedProfile,
            compatibility: selectedProfile.compatibilityScore,
            friendTestimony: selectedProfile.friendTestimony ? {
              recommender: selectedProfile.friendTestimony.recommender,
              recommenderAvatar: selectedProfile.friendTestimony.recommenderAvatar,
              testimony: selectedProfile.friendTestimony.testimony,
              relationship: selectedProfile.friendTestimony.relationship
            } : undefined
          }}
          onAction={() => handleConnect(selectedProfile.id, selectedProfile.name)}
          actionLabel="Connect"
        />
      )}
      
      <NavigationBar />
    </div>
  );
};

export default Recommendations;
