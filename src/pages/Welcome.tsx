
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Heart, Users, Sparkles } from 'lucide-react';

const Welcome = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'Smart Matching',
      description: 'AI-powered compatibility scoring based on interests and mutual connections',
      emoji: '✨'
    },
    {
      icon: Users,
      title: 'Friend Recommendations',
      description: 'Discover connections through people you already trust and love',
      emoji: '👥'
    },
    {
      icon: Heart,
      title: 'Meaningful Connections',
      description: 'Build authentic relationships backed by social trust and verification',
      emoji: '💜'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <div className="w-full max-w-sm mx-auto">
        {/* Logo and Tagline */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Friend Link
            </h1>
            <h2 className="text-3xl font-bold text-gray-900">
              Harmony
            </h2>
          </div>
          <p className="text-lg text-gray-700 font-medium">
            Connect through people you trust
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '200ms'}}>
          <Link to="/matches">
            <Button 
              size="lg" 
              className="w-full h-14 text-lg font-semibold rounded-full gradient-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-white"
            >
              Start Connecting 💫
            </Button>
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="space-y-4">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-up rounded-2xl"
              style={{animationDelay: `${300 + index * 150}ms`}}
            >
              <CardContent className="p-5">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center text-2xl">
                      {feature.emoji}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 animate-fade-in-up" style={{animationDelay: '800ms'}}>
          <p className="text-xs text-gray-600">
            Join thousands creating meaningful connections
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
