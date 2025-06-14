import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import NavigationBar from '@/components/NavigationBar';
import { Settings, Edit, MapPin, Heart, Users, Star } from 'lucide-react';

const Profile = () => {
  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b p-4">
        <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Your Profile
        </h1>
      </div>

      <div className="p-4 space-y-6">
        <Card className="gradient-card border-0 shadow-lg rounded-3xl overflow-hidden animate-fade-in-up">
          <CardContent className="p-0">
            <div className="p-6 pb-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <Avatar className="w-20 h-20 border-4 border-white shadow-md">
                    <AvatarImage src="https://i.pravatar.cc/150?img=47" alt="Profile" />
                    <AvatarFallback className="text-slate-800 font-semibold">JD</AvatarFallback>
                  </Avatar>
                  <Badge className="absolute -bottom-1 -right-1 text-xs px-1 py-0 bg-gradient-to-r from-green-400 to-blue-500 text-white">
                    <Star className="w-3 h-3" />
                  </Badge>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-slate-800">John Doe, 30</h3>
                  <div className="flex items-center space-x-4 text-sm text-slate-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      New York, USA
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      5 mutual matches
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      15 common interests
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">
                  Photography
                </Badge>
                <Badge variant="secondary" className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">
                  Travel
                </Badge>
                <Badge variant="secondary" className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">
                  Hiking
                </Badge>
                {/* Add more interests as needed */}
              </div>

              <p className="text-slate-600">
                Passionate about exploring new cultures, capturing moments through my lens, and scaling mountains.
                Looking for like-minded individuals to share experiences with.
              </p>
            </div>

            <div className="flex p-4 pt-0 space-x-3">
              <Button
                variant="outline"
                size="lg"
                className="flex-1 rounded-full border-2 hover:bg-gray-50 text-slate-700 border-slate-300"
              >
                <Edit className="w-5 h-5 mr-2" />
                Edit Profile
              </Button>
              <Button
                size="lg"
                className="flex-1 rounded-full gradient-primary hover:scale-105 transition-transform"
              >
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <NavigationBar />
    </div>
  );
};

export default Profile;
