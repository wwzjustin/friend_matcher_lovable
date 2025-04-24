
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import NavigationBar from '@/components/NavigationBar';
import { Link2, User, Users, Settings, Star } from 'lucide-react';
import MutualConnections from '@/components/MutualConnections';

// Mock data
const userProfile = {
  name: "Alex Johnson",
  avatar: "https://i.pravatar.cc/150?img=5",
  bio: "Photographer, explorer and coffee enthusiast. Looking to connect with like-minded people.",
  interests: ["Photography", "Travel", "Coffee", "Hiking", "Movies"],
  stats: {
    connections: 24,
    vouched: 8,
    recommendations: 5
  },
  mutualFriends: [
    { id: "1", name: "Emma Wilson", avatar: "https://i.pravatar.cc/150?img=49" },
    { id: "2", name: "Michael Chen", avatar: "https://i.pravatar.cc/150?img=11" },
    { id: "3", name: "Sarah Lee", avatar: "https://i.pravatar.cc/150?img=44" },
    { id: "4", name: "James Williams", avatar: "https://i.pravatar.cc/150?img=12" }
  ]
};

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen pb-16">
      <div className="flex-1 p-4">
        <div className="flex justify-end mb-2">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex flex-col items-center mb-6">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
            <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-bold">{userProfile.name}</h1>
          <p className="text-sm text-muted-foreground text-center mt-2 max-w-xs">
            {userProfile.bio}
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-6">
          <Card className="text-center">
            <CardContent className="p-3">
              <p className="text-2xl font-semibold">{userProfile.stats.connections}</p>
              <p className="text-xs text-muted-foreground">Connections</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-3">
              <p className="text-2xl font-semibold">{userProfile.stats.vouched}</p>
              <p className="text-xs text-muted-foreground">Vouched For</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-3">
              <p className="text-2xl font-semibold">{userProfile.stats.recommendations}</p>
              <p className="text-xs text-muted-foreground">Recommended</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Star className="h-4 w-4 mr-2" /> Interests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userProfile.interests.map(interest => (
                <Badge key={interest} variant="secondary">{interest}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <MutualConnections friends={userProfile.mutualFriends} />
        
        <Separator className="my-6" />
        
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full" size="sm">
            <Users className="h-4 w-4 mr-2" /> Invite Friends
          </Button>
          <Button variant="outline" className="w-full" size="sm">
            <Link2 className="h-4 w-4 mr-2" /> Share Profile
          </Button>
        </div>
      </div>
      <NavigationBar />
    </div>
  );
};

export default Profile;
