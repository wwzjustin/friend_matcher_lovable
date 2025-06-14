
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import NavigationBar from '@/components/NavigationBar';
import { Users, Heart, MessageCircle, Shield, Star, Award, UserCheck, Clock, TrendingUp, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Recommendations = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const categories = [
    { id: 'all', label: 'All', icon: Users },
    { id: 'verified', label: 'Verified', icon: Shield },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'recent', label: 'Recent', icon: Clock }
  ];

  const friendRecommendations = [
    {
      id: '1',
      recommender: {
        name: 'Sarah Johnson',
        avatar: 'https://i.pravatar.cc/150?img=44',
        trustScore: 95,
        mutualFriends: 12,
        verificationLevel: 'Gold'
      },
      recommended: {
        name: 'Alex Thompson',
        avatar: 'https://i.pravatar.cc/150?img=12',
        age: 28,
        interests: ['Photography', 'Travel', 'Coffee']
      },
      reason: "Alex is one of the most genuine people I know. You both love photography and have the same sense of humor! I've known Alex for 5 years through college.",
      relationship: 'College Friend',
      socialProof: {
        endorsements: 8,
        mutualConnections: 3,
        responseRate: 92,
        lastActive: '2 hours ago'
      },
      trustMetrics: {
        reliability: 94,
        authenticity: 96,
        compatibility: 88
      },
      timestamp: '2 hours ago',
      category: 'verified'
    },
    {
      id: '2',
      recommender: {
        name: 'Mike Davis',
        avatar: 'https://i.pravatar.cc/150?img=11',
        trustScore: 87,
        mutualFriends: 8,
        verificationLevel: 'Silver'
      },
      recommended: {
        name: 'Emma Chen',
        avatar: 'https://i.pravatar.cc/150?img=49',
        age: 26,
        interests: ['Hiking', 'Books', 'Yoga']
      },
      reason: "Emma would be perfect for you! She's into hiking and coffee just like you, plus she's super easy to talk to. We work together and she's always been incredibly thoughtful.",
      relationship: 'Work Colleague',
      socialProof: {
        endorsements: 12,
        mutualConnections: 5,
        responseRate: 89,
        lastActive: '1 day ago'
      },
      trustMetrics: {
        reliability: 91,
        authenticity: 93,
        compatibility: 92
      },
      timestamp: '1 day ago',
      category: 'trending'
    },
    {
      id: '3',
      recommender: {
        name: 'Jessica Wu',
        avatar: 'https://i.pravatar.cc/150?img=25',
        trustScore: 91,
        mutualFriends: 15,
        verificationLevel: 'Platinum'
      },
      recommended: {
        name: 'David Park',
        avatar: 'https://i.pravatar.cc/150?img=33',
        age: 30,
        interests: ['Music', 'Cooking', 'Art']
      },
      reason: "David is amazing! He's creative, kind, and has this wonderful energy. You both share a love for music and meaningful conversations. I introduced him to my sister last year!",
      relationship: 'Close Friend',
      socialProof: {
        endorsements: 15,
        mutualConnections: 7,
        responseRate: 95,
        lastActive: '30 minutes ago'
      },
      trustMetrics: {
        reliability: 97,
        authenticity: 95,
        compatibility: 90
      },
      timestamp: '30 minutes ago',
      category: 'recent'
    }
  ];

  const getVerificationColor = (level: string) => {
    switch (level) {
      case 'Platinum': return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white';
      case 'Gold': return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 'Silver': return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    return 'text-purple-600 bg-purple-50';
  };

  const handleConnect = (recommendedName: string, recommenderName: string) => {
    toast({
      title: "Connection request sent! 💜",
      description: `Your request to connect with ${recommendedName} has been sent through ${recommenderName}`,
    });
  };

  const handleAskRecommender = (recommenderName: string) => {
    toast({
      title: "Message sent! 💬",
      description: `Your message to ${recommenderName} has been sent`,
    });
  };

  const filteredRecommendations = selectedCategory === 'all' 
    ? friendRecommendations 
    : friendRecommendations.filter(rec => rec.category === selectedCategory);

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b p-4">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-1">
          Friend Recommendations
        </h1>
        <p className="text-center text-gray-600 text-sm">
          Connections backed by people you trust
        </p>
      </div>

      {/* Category Filter */}
      <div className="p-4 pb-2">
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                className={`flex-shrink-0 rounded-full ${
                  selectedCategory === category.id 
                    ? 'gradient-primary text-white' 
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <IconComponent className="w-4 h-4 mr-1" />
                {category.label}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="p-4 pt-2 space-y-6">
        {filteredRecommendations.map((rec, index) => (
          <Card 
            key={rec.id}
            className="bg-white border-0 shadow-lg rounded-3xl animate-fade-in-up overflow-hidden"
            style={{animationDelay: `${index * 200}ms`}}
          >
            {/* Recommender Header */}
            <CardHeader className="pb-3 bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12 border-2 border-white">
                      <AvatarImage src={rec.recommender.avatar} />
                      <AvatarFallback>{rec.recommender.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Badge className={`absolute -bottom-1 -right-1 text-xs px-1 py-0 ${getVerificationColor(rec.recommender.verificationLevel)}`}>
                      <Shield className="w-3 h-3" />
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-gray-900">{rec.recommender.name}</p>
                      <Badge className={`text-xs ${getTrustScoreColor(rec.recommender.trustScore)}`}>
                        {rec.recommender.trustScore}% trust
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-gray-600 space-x-3">
                      <span>{rec.relationship}</span>
                      <span>• {rec.recommender.mutualFriends} mutual friends</span>
                      <span>• {rec.timestamp}</span>
                    </div>
                  </div>
                </div>
                <Heart className="w-6 h-6 text-red-400" />
              </div>
            </CardHeader>
            
            <CardContent className="pt-4">
              {/* Recommended Person */}
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-16 h-16 border-4 border-white shadow-md">
                  <AvatarImage src={rec.recommended.avatar} />
                  <AvatarFallback className="text-xl font-semibold">{rec.recommended.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{rec.recommended.name}, {rec.recommended.age}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {rec.recommended.interests.map((interest, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trust Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 rounded-2xl">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{rec.trustMetrics.reliability}%</div>
                  <div className="text-xs text-gray-600">Reliability</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{rec.trustMetrics.authenticity}%</div>
                  <div className="text-xs text-gray-600">Authenticity</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{rec.trustMetrics.compatibility}%</div>
                  <div className="text-xs text-gray-600">Match</div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="flex items-center justify-between mb-4 p-3 bg-blue-50 rounded-2xl">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center text-gray-700">
                    <Award className="w-4 h-4 mr-1 text-blue-600" />
                    {rec.socialProof.endorsements} endorsements
                  </div>
                  <div className="flex items-center text-gray-700">
                    <UserCheck className="w-4 h-4 mr-1 text-green-600" />
                    {rec.socialProof.responseRate}% response rate
                  </div>
                </div>
                <div className="text-xs text-gray-600">
                  Active {rec.socialProof.lastActive}
                </div>
              </div>
              
              {/* Recommendation Quote */}
              <div className="bg-white border-l-4 border-purple-400 rounded-2xl p-4 mb-4 shadow-sm">
                <p className="text-sm italic text-gray-700 leading-relaxed">"{rec.reason}"</p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 rounded-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={() => handleAskRecommender(rec.recommender.name.split(' ')[0])}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask {rec.recommender.name.split(' ')[0]}
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 rounded-full gradient-primary text-white hover:scale-105 transition-transform"
                  onClick={() => handleConnect(rec.recommended.name, rec.recommender.name)}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Trust Network Stats */}
        <Card className="bg-gradient-to-r from-purple-100 to-blue-100 border-0 rounded-3xl">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Shield className="w-8 h-8 text-purple-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Your Trust Network</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold text-purple-600">47</div>
                <div className="text-xs text-gray-700">Active Recommenders</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">89%</div>
                <div className="text-xs text-gray-700">Trust Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">23</div>
                <div className="text-xs text-gray-700">Successful Matches</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <NavigationBar />
    </div>
  );
};

export default Recommendations;
