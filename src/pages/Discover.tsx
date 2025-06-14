import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import NavigationBar from '@/components/NavigationBar';
import ProfileCard from '@/components/ProfileCard';
import FriendVoucher from '@/components/FriendVoucher';
import ProfileModal from '@/components/ProfileModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Star, UserCheck, Handshake } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import { useGeolocation } from '@/hooks/useGeolocation';
import { calculateDistance, Coordinates } from '@/utils/locationUtils';

interface Profile {
  id: string;
  name: string;
  avatar: string;
  compatibility: number;
  interests: string[];
  mutualFriends: number;
  location: Coordinates;
  distance?: number;
  bio?: string;
  vouchers: {
    friendName: string;
    friendAvatar: string;
    recommendation: string;
    relationshipToTarget: string;
  }[];
  // Enhanced social proof
  socialProof: {
    endorsements: number;
    responseRate: number;
    mutualConnections: number;
  };
  verificationLevel: 'Gold' | 'Silver' | 'Verified' | 'Basic';
  trustScore: number;
}

const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    avatar: 'https://i.pravatar.cc/150?img=49',
    compatibility: 87,
    interests: ['Photography', 'Hiking', 'Reading'],
    mutualFriends: 3,
    location: { latitude: 40.7128, longitude: -74.0060 },
    bio: 'Love exploring new places and capturing moments. Always up for a good conversation over coffee!',
    socialProof: {
      endorsements: 12,
      responseRate: 94,
      mutualConnections: 8
    },
    verificationLevel: 'Gold',
    trustScore: 92,
    vouchers: [
      {
        friendName: 'Alex Johnson',
        friendAvatar: 'https://i.pravatar.cc/150?img=10',
        recommendation: "Emma is one of the most genuine people I know. She's easy to talk to and would be a great friend for you!",
        relationshipToTarget: 'College Friend'
      }
    ]
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://i.pravatar.cc/150?img=11',
    compatibility: 76,
    interests: ['Music', 'Travel', 'Cooking'],
    mutualFriends: 2,
    location: { latitude: 40.7306, longitude: -73.9352 },
    bio: 'Chef by day, musician by night. Looking for someone to share adventures and good food with.',
    socialProof: {
      endorsements: 15,
      responseRate: 88,
      mutualConnections: 12
    },
    verificationLevel: 'Silver',
    trustScore: 89,
    vouchers: [
      {
        friendName: 'Sarah Lee',
        friendAvatar: 'https://i.pravatar.cc/150?img=44',
        recommendation: "Michael is super thoughtful and always the one organizing get-togethers. You two would get along so well!",
        relationshipToTarget: 'Work Colleague'
      }
    ]
  },
  {
    id: '3',
    name: 'Olivia Taylor',
    avatar: 'https://i.pravatar.cc/150?img=1',
    compatibility: 92,
    interests: ['Art', 'Yoga', 'Coffee'],
    mutualFriends: 4,
    location: { latitude: 40.7580, longitude: -73.9855 },
    bio: 'Artist and bookworm seeking meaningful connections. Love deep conversations and creative collaborations.',
    socialProof: {
      endorsements: 8,
      responseRate: 91,
      mutualConnections: 5
    },
    verificationLevel: 'Verified',
    trustScore: 86,
    vouchers: [
      {
        friendName: 'James Williams',
        friendAvatar: 'https://i.pravatar.cc/150?img=12',
        recommendation: "Olivia is the kind of friend who's always there when you need her. She's creative and has the best recommendations for everything!",
        relationshipToTarget: 'Childhood Friend'
      }
    ]
  }
];

const Discover = () => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const { toast } = useToast();
  const { coordinates } = useGeolocation();

  const filteredProfiles = useMemo(() => {
    return mockProfiles.filter(profile => {
      const matchesSearch = searchQuery.toLowerCase().split(' ').every(term =>
        profile.name.toLowerCase().includes(term) ||
        profile.interests.some(interest => 
          interest.toLowerCase().includes(term)
        )
      );

      return matchesSearch;
    });
  }, [searchQuery]);

  const profilesWithDistance = useMemo(() => {
    if (!coordinates) return filteredProfiles;

    return filteredProfiles.map(profile => ({
      ...profile,
      distance: calculateDistance(coordinates, profile.location)
    }));
  }, [filteredProfiles, coordinates]);

  const handleConnect = (name: string) => {
    toast({
      title: "Connection Request Sent",
      description: `You've sent a connection request to ${name}`,
      action: <Handshake className="h-4 w-4" />
    });
    setSelectedProfile(null);
  };

  const handleProfileClick = (profile: Profile) => {
    setSelectedProfile(profile);
  };

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <div className="p-4 flex-1">
        <h1 className="text-2xl font-bold mb-4">Discover Connections</h1>
        
        <SearchBar
          value={searchQuery}
          onSearch={setSearchQuery}
        />
        
        <Tabs defaultValue="recommended" className="mb-4" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="recommended">
              <Star className="h-4 w-4 mr-1" /> For You
            </TabsTrigger>
            <TabsTrigger value="mutual">
              <UserCheck className="h-4 w-4 mr-1" /> Mutual
            </TabsTrigger>
            <TabsTrigger value="interests">Interests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommended" className="space-y-4">
            {profilesWithDistance.map((profile, index) => (
              <div key={profile.id} className="mb-8 cursor-pointer" style={{animationDelay: `${index * 150}ms`}}>
                <div onClick={() => handleProfileClick(profile)}>
                  <ProfileCard 
                    name={profile.name}
                    avatar={profile.avatar}
                    compatibility={profile.compatibility}
                    interests={profile.interests}
                    mutualFriends={profile.mutualFriends}
                    distance={profile.distance}
                    onConnect={() => handleConnect(profile.name)}
                  />
                </div>
                
                {profile.vouchers.map((voucher, idx) => (
                  <div key={idx} className="mt-3 px-2">
                    <FriendVoucher
                      friendName={voucher.friendName}
                      friendAvatar={voucher.friendAvatar}
                      recommendation={voucher.recommendation}
                      relationshipToTarget={voucher.relationshipToTarget}
                    />
                  </div>
                ))}
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="mutual">
            <div className="text-center py-10">
              <UserCheck className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-3" />
              <p className="text-muted-foreground">View people who share your connections</p>
            </div>
          </TabsContent>
          
          <TabsContent value="interests">
            <div className="mb-4 flex flex-wrap gap-2">
              <p className="w-full mb-2 text-sm text-muted-foreground">Select interests to filter:</p>
              {['Photography', 'Travel', 'Music', 'Art', 'Reading', 
                'Hiking', 'Cooking', 'Coffee', 'Yoga', 'Gaming'].map(interest => (
                <Badge key={interest} variant="outline" className="cursor-pointer hover:bg-accent">
                  {interest}
                </Badge>
              ))}
            </div>
            
            <div className="text-center py-10">
              <p className="text-muted-foreground">Select interests to find matches</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Profile Modal */}
      {selectedProfile && (
        <ProfileModal
          isOpen={true}
          onClose={() => setSelectedProfile(null)}
          profile={selectedProfile}
          onAction={() => handleConnect(selectedProfile.name)}
          actionLabel="Connect"
        />
      )}

      <NavigationBar />
    </div>
  );
};

export default Discover;
