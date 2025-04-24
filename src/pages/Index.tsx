
import React from 'react';
import NavigationBar from '@/components/NavigationBar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Handshake, Users, UserCheck, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const features = [
    { 
      icon: Users, 
      title: 'Smart Matching',
      description: 'Find connections based on shared interests and mutual friends'
    },
    { 
      icon: UserCheck, 
      title: 'Friend Recommendations',
      description: 'See who your friends think you'd get along with'
    },
    { 
      icon: LinkIcon, 
      title: 'Meaningful Connections',
      description: 'Build quality relationships through trusted networks'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <div className="flex-1 p-4">
        <div className="py-10 mb-6 text-center">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Friend Link Harmony
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Connect through people you trust
          </p>
          <Link to="/discover">
            <Button size="lg" className="rounded-full">
              <Handshake className="mr-2 h-4 w-4" />
              Start Connecting
            </Button>
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-4 max-w-md mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="animate-fade-in shadow-md" style={{animationDelay: `${index * 100}ms`}}>
              <CardContent className="p-4 flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Proof */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Trusted by thousands of users to make meaningful connections
          </p>
        </div>
      </div>
      <NavigationBar />
    </div>
  );
};

export default Index;
