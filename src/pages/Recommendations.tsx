
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import NavigationBar from '@/components/NavigationBar';
import { Users, Heart, MessageCircle } from 'lucide-react';

const Recommendations = () => {
  const friendRecommendations = [
    {
      id: '1',
      recommender: {
        name: 'Sarah Johnson',
        avatar: 'https://i.pravatar.cc/150?img=44'
      },
      recommended: {
        name: 'Alex Thompson',
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      reason: "Alex is one of the most genuine people I know. You both love photography and have the same sense of humor!",
      relationship: 'College Friend'
    },
    {
      id: '2',
      recommender: {
        name: 'Mike Davis',
        avatar: 'https://i.pravatar.cc/150?img=11'
      },
      recommended: {
        name: 'Emma Chen',
        avatar: 'https://i.pravatar.cc/150?img=49'
      },
      reason: "Emma would be perfect for you! She's into hiking and coffee just like you, plus she's super easy to talk to.",
      relationship: 'Work Colleague'
    }
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b p-4">
        <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Friend Recommendations
        </h1>
        <p className="text-center text-muted-foreground text-sm mt-1">
          Connections backed by people you trust
        </p>
      </div>

      <div className="p-4 space-y-6">
        {friendRecommendations.map((rec, index) => (
          <Card 
            key={rec.id}
            className="gradient-card border-0 shadow-lg rounded-3xl animate-fade-in-up"
            style={{animationDelay: `${index * 200}ms`}}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={rec.recommender.avatar} />
                  <AvatarFallback>{rec.recommender.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{rec.recommender.name}</p>
                  <p className="text-xs text-muted-foreground">{rec.relationship}</p>
                </div>
                <div className="ml-auto">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-16 h-16 border-4 border-white shadow-md">
                  <AvatarImage src={rec.recommended.avatar} />
                  <AvatarFallback>{rec.recommended.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{rec.recommended.name}</h3>
                  <p className="text-sm text-muted-foreground">Recommended by {rec.recommender.name}</p>
                </div>
              </div>
              
              <div className="bg-accent/50 rounded-2xl p-4 mb-4">
                <p className="text-sm italic text-foreground">"{rec.reason}"</p>
              </div>
              
              <div className="flex space-x-3">
                <Button variant="outline" size="sm" className="flex-1 rounded-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask {rec.recommender.name.split(' ')[0]}
                </Button>
                <Button size="sm" className="flex-1 rounded-full gradient-primary">
                  <Users className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <NavigationBar />
    </div>
  );
};

export default Recommendations;
