
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import NavigationBar from '@/components/NavigationBar';
import { Heart, X, Users, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
    bio: 'Love exploring new places and capturing moments. Always up for a good conversation over coffee!'
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
    bio: 'Chef by day, musician by night. Looking for someone to share adventures and good food with.'
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
    bio: 'Artist and bookworm seeking meaningful connections. Love deep conversations and creative collaborations.'
  }
];

const MatchFeed = () => {
  const [matches, setMatches] = useState(mockMatches);
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);
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
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    return 'text-purple-600 bg-purple-100';
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b p-4">
        <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Discover Connections
        </h1>
      </div>

      {/* Match Feed */}
      <div className="p-4 space-y-6">
        {matches.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold mb-2">All caught up!</h3>
            <p className="text-muted-foreground">Check back later for new connections</p>
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
                    <Avatar className="w-16 h-16 border-4 border-white shadow-md">
                      <AvatarImage src={match.avatar} alt={match.name} />
                      <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{match.name}, {match.age}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {match.mutualFriends} mutual
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {match.distance}km away
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getCompatibilityColor(match.compatibilityScore)} border-0 font-semibold`}>
                      {match.compatibilityScore}%
                    </Badge>
                  </div>

                  {/* Interests */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {match.interests.map((interest, idx) => (
                      <Badge key={idx} variant="secondary" className="rounded-full">
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
                    <p className={`text-muted-foreground ${
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
                    className="flex-1 rounded-full border-2 hover:bg-gray-50"
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
