
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import NavigationBar from '@/components/NavigationBar';
import ProfileCard from '@/components/ProfileCard';
import FriendVoucher from '@/components/FriendVoucher';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Star, UserCheck, Handshake } from 'lucide-react';

// Mock data to simulate API response
const mockProfiles = [
  {
    id: '1',
    name: 'Emma Wilson',
    avatar: 'https://i.pravatar.cc/150?img=49',
    compatibility: 87,
    interests: ['Photography', 'Hiking', 'Reading'],
    mutualFriends: 3,
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
  const { toast } = useToast();

  const handleConnect = (name: string) => {
    toast({
      title: "Connection Request Sent",
      description: `You've sent a connection request to ${name}`,
      action: <Handshake className="h-4 w-4" />
    });
  };

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <div className="p-4 flex-1">
        <h1 className="text-2xl font-bold mb-4">Discover Connections</h1>
        
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
            {mockProfiles.map((profile, index) => (
              <div key={profile.id} className="mb-8" style={{animationDelay: `${index * 150}ms`}}>
                <ProfileCard 
                  name={profile.name}
                  avatar={profile.avatar}
                  compatibility={profile.compatibility}
                  interests={profile.interests}
                  mutualFriends={profile.mutualFriends}
                  onConnect={() => handleConnect(profile.name)}
                />
                
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
      <NavigationBar />
    </div>
  );
};

export default Discover;
