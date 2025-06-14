import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import NavigationBar from '@/components/NavigationBar';
import { Heart, X, Users, MapPin, Shield, Star, UserCheck, MessageSquare, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface Match {
  id: string;
  name: string;
  avatar: string;
  age: number;
  mutualFriends: number;
  compatibilityScore: number;
  interests: string[];
  distance: number;
  bio: string;
  // New social trust features
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

const mockMatches: Match[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    avatar: 'https://i.pravatar.cc/150?img=49',
    age: 28,
    mutualFriends: 3,
    compatibilityScore: 87,
    interests: ['Photography', 'Hiking', 'Coffee'],
    distance: 2,
    bio: 'Love exploring new places and capturing moments. Always up for a good conversation over coffee!',
    verificationLevel: 'Gold',
    trustScore: 94,
    friendTestimony: {
      recommender: 'Sarah Johnson',
      recommenderAvatar: 'https://i.pravatar.cc/150?img=44',
      testimony: 'Emma is one of the most genuine people I know. She has great energy and you both love photography!',
      relationship: 'College Friend'
    },
    socialProof: {
      endorsements: 12,
      responseRate: 92,
      mutualConnections: 8
    }
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://i.pravatar.cc/150?img=11',
    age: 31,
    mutualFriends: 5,
    compatibilityScore: 92,
    interests: ['Music', 'Cooking', 'Travel'],
    distance: 5,
    bio: 'Chef by day, musician by night. Looking for someone to share adventures and good food with.',
    verificationLevel: 'Silver',
    trustScore: 89,
    friendTestimony: {
      recommender: 'Mike Davis',
      recommenderAvatar: 'https://i.pravatar.cc/150?img=33',
      testimony: 'Michael is an amazing chef and super thoughtful. You two would get along great!',
      relationship: 'Work Colleague'
    },
    socialProof: {
      endorsements: 15,
      responseRate: 88,
      mutualConnections: 12
    }
  },
  {
    id: '3',
    name: 'Sofia Rodriguez',
    avatar: 'https://i.pravatar.cc/150?img=44',
    age: 26,
    mutualFriends: 2,
    compatibilityScore: 78,
    interests: ['Art', 'Yoga', 'Books'],
    distance: 3,
    bio: 'Artist and bookworm seeking meaningful connections. Love deep conversations and creative collaborations.',
    verificationLevel: 'Verified',
    trustScore: 86,
    friendTestimony: null,
    socialProof: {
      endorsements: 8,
      responseRate: 91,
      mutualConnections: 5
    }
  }
];

const MatchFeed = () => {
  const [matches, setMatches] = useState(mockMatches);
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);
  const [showTestimony, setShowTestimony] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConnect = (matchId: string, name: string) => {
    setMatches(prev => prev.filter(match => match.id !== matchId));
    toast({
      title: "Connection sent! 💜",
      description: `Your request was sent to ${name}`,
    });
  };

  const handleSkip = (matchId: string) => {
    setMatches(prev => prev.filter(match => match.id !== matchId));
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
          Discover Connections
        </h1>
        
        {/* Quick Navigation to Recommendations */}
        <div className="mt-3">
          <Link to="/recommendations">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 hover:shadow-md transition-all">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Friend Recommendations</p>
                      <p className="text-xs text-gray-600">Connections backed by people you trust</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Match Feed */}
      <div className="p-4 space-y-6">
        {matches.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800">All caught up!</h3>
            <p className="text-slate-600 mb-4">Check back later for new connections</p>
            
            {/* Suggest checking recommendations */}
            <Link to="/recommendations">
              <Button className="gradient-primary">
                <Users className="w-4 h-4 mr-2" />
                Check Friend Recommendations
              </Button>
            </Link>
          </div>
        ) : (
          matches.map((match, index) => (
            <Card 
              key={match.id}
              className="gradient-card border-0 shadow-lg rounded-3xl overflow-hidden animate-fade-in-up"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <CardContent className="p-0">
                {/* Profile Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16 border-4 border-white shadow-md">
                        <AvatarImage src={match.avatar} alt={match.name} />
                        <AvatarFallback className="text-slate-800 font-semibold">{match.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {/* Verification Badge */}
                      <Badge className={`absolute -bottom-1 -right-1 text-xs px-1 py-0 ${getVerificationColor(match.verificationLevel)}`}>
                        <Shield className="w-3 h-3" />
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-xl font-semibold text-slate-800">{match.name}, {match.age}</h3>
                        <Badge className={`text-xs ${getTrustScoreColor(match.trustScore)}`}>
                          <Star className="w-3 h-3 mr-1" />
                          {match.trustScore}%
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-slate-600">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {match.mutualFriends} mutual
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {match.distance}km away
                        </div>
                        <div className="flex items-center">
                          <UserCheck className="w-4 h-4 mr-1" />
                          {match.socialProof.responseRate}% response
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getCompatibilityColor(match.compatibilityScore)} border-0 font-semibold`}>
                      {match.compatibilityScore}%
                    </Badge>
                  </div>

                  {/* Social Proof */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-slate-50 rounded-2xl">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center text-slate-700">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {match.socialProof.endorsements} endorsements
                      </div>
                      <div className="flex items-center text-slate-700">
                        <Users className="w-4 h-4 mr-1 text-blue-500" />
                        {match.socialProof.mutualConnections} connections
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {match.verificationLevel}
                    </Badge>
                  </div>

                  {/* Friend Testimony */}
                  {match.friendTestimony && (
                    <div className="mb-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start p-3 h-auto bg-blue-50 hover:bg-blue-100 rounded-2xl"
                        onClick={() => setShowTestimony(showTestimony === match.id ? null : match.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={match.friendTestimony.recommenderAvatar} />
                            <AvatarFallback className="text-xs">{match.friendTestimony.recommender.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="text-left">
                            <div className="flex items-center space-x-2">
                              <MessageSquare className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-medium text-slate-800">
                                {match.friendTestimony.recommender} recommends
                              </span>
                            </div>
                            <p className="text-xs text-slate-600">{match.friendTestimony.relationship}</p>
                          </div>
                        </div>
                      </Button>
                      
                      {showTestimony === match.id && (
                        <div className="mt-3 p-4 bg-white border-l-4 border-blue-400 rounded-2xl shadow-sm animate-fade-in">
                          <p className="text-sm italic text-slate-700 leading-relaxed">
                            "{match.friendTestimony.testimony}"
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Interests */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {match.interests.map((interest, idx) => (
                      <Badge key={idx} variant="secondary" className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">
                        {interest}
                      </Badge>
                    ))}
                  </div>

                  {/* Bio (Expandable) */}
                  <div 
                    className="cursor-pointer"
                    onClick={() => setExpandedMatch(
                      expandedMatch === match.id ? null : match.id
                    )}
                  >
                    <p className={`text-slate-600 ${
                      expandedMatch === match.id ? '' : 'line-clamp-2'
                    }`}>
                      {match.bio}
                    </p>
                    {match.bio.length > 100 && (
                      <span className="text-primary text-sm font-medium">
                        {expandedMatch === match.id ? 'Show less' : 'Read more'}
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
                    onClick={() => handleSkip(match.id)}
                  >
                    <X className="w-5 h-5 mr-2" />
                    Skip
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1 rounded-full gradient-primary hover:scale-105 transition-transform"
                    onClick={() => handleConnect(match.id, match.name)}
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

      <NavigationBar />
    </div>
  );
};

export default MatchFeed;
