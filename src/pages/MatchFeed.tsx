import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import NavigationBar from '@/components/NavigationBar';
import ProfileModal from '@/components/ProfileModal';
import { Heart, Users, MessageSquare, ArrowRight, Send, Clock, CheckCircle2 } from 'lucide-react';
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
  lastMessage?: {
    text: string;
    timestamp: string;
    isRead: boolean;
  };
  isOnline?: boolean;
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
    },
    lastMessage: {
      text: "Thanks for the coffee recommendation! I'll definitely check it out ☕",
      timestamp: "2h ago",
      isRead: true
    },
    isOnline: true
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
    },
    lastMessage: {
      text: "Hey! How was your weekend? I tried that new recipe you mentioned",
      timestamp: "1d ago",
      isRead: false
    },
    isOnline: false
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
    },
    lastMessage: {
      text: "I loved that book recommendation! Do you have any other favorites?",
      timestamp: "3d ago",
      isRead: true
    },
    isOnline: false
  }
];

const MatchFeed = () => {
  const [matches, setMatches] = useState(mockMatches);
  const [selectedProfile, setSelectedProfile] = useState<Match | null>(null);
  const { toast } = useToast();

  const handleSendMessage = (matchId: string, name: string) => {
    toast({
      title: "Opening chat... 💬",
      description: `Starting conversation with ${name}`,
    });
  };

  const handleProfileClick = (match: Match) => {
    setSelectedProfile(match);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b p-4">
        <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Your Connections
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
                      <p className="text-sm font-medium text-gray-900">Find New Connections</p>
                      <p className="text-xs text-gray-600">Discover people backed by friends you trust</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Chat Feed */}
      <div className="p-4 space-y-4">
        {matches.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800">No connections yet!</h3>
            <p className="text-slate-600 mb-4">Start connecting with people you'd like to meet</p>
            
            <Link to="/recommendations">
              <Button className="gradient-primary">
                <Users className="w-4 h-4 mr-2" />
                Find New Connections
              </Button>
            </Link>
          </div>
        ) : (
          matches.map((match, index) => (
            <Card 
              key={match.id}
              className="border-0 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow animate-fade-in-up"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  {/* Clickable Avatar */}
                  <div 
                    className="relative cursor-pointer"
                    onClick={() => handleProfileClick(match)}
                  >
                    <Avatar className="w-14 h-14 border-2 border-white shadow-sm">
                      <AvatarImage src={match.avatar} alt={match.name} />
                      <AvatarFallback className="text-slate-800 font-semibold">{match.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {match.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  {/* Chat Preview */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-slate-800 truncate">{match.name}</h3>
                      <div className="flex items-center space-x-2">
                        {match.lastMessage && (
                          <span className="text-xs text-slate-500">{match.lastMessage.timestamp}</span>
                        )}
                        {match.lastMessage && !match.lastMessage.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    {match.lastMessage ? (
                      <p className="text-sm text-slate-600 truncate">{match.lastMessage.text}</p>
                    ) : (
                      <p className="text-sm text-slate-500 italic">Start a conversation...</p>
                    )}
                    
                    <div className="flex items-center mt-2 space-x-3 text-xs text-slate-500">
                      <div className="flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {match.compatibilityScore}% match
                      </div>
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {match.mutualFriends} mutual
                      </div>
                      {match.isOnline && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                          Online
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Message Button */}
                  <Button
                    size="sm"
                    className="rounded-full gradient-primary hover:scale-105 transition-transform"
                    onClick={() => handleSendMessage(match.id, match.name)}
                  >
                    <MessageSquare className="w-4 h-4" />
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
            vouchers: selectedProfile.friendTestimony ? [{
              friendName: selectedProfile.friendTestimony.recommender,
              friendAvatar: selectedProfile.friendTestimony.recommenderAvatar,
              recommendation: selectedProfile.friendTestimony.testimony,
              relationshipToTarget: selectedProfile.friendTestimony.relationship
            }] : []
          }}
          onAction={() => handleSendMessage(selectedProfile.id, selectedProfile.name)}
          actionLabel="Send Message"
        />
      )}

      <NavigationBar />
    </div>
  );
};

export default MatchFeed;
