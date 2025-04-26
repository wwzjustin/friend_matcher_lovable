import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Handshake, MapPin } from "lucide-react";
import CompatibilityScore from './CompatibilityScore';

interface ProfileCardProps {
  name: string;
  avatar: string;
  compatibility: number;
  interests: string[];
  mutualFriends: number;
  distance?: number | null;
  onConnect: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  avatar,
  compatibility,
  interests,
  mutualFriends,
  distance,
  onConnect
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden shadow-lg animate-fade-in">
      <div className="relative">
        <div className="absolute top-4 right-4 z-10">
          <CompatibilityScore score={compatibility} />
        </div>
        <div className="h-40 bg-gradient-to-r from-primary/80 to-secondary/80" />
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <Avatar className="w-24 h-24 border-4 border-background">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="text-xl font-medium">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <CardContent className="pt-16 pb-5">
        <h3 className="text-xl font-semibold text-center mb-2">{name}</h3>
        {distance !== undefined && distance !== null && (
          <Badge variant="secondary" className="flex items-center gap-1 mx-auto mb-4">
            <MapPin className="h-3 w-3" />
            {distance} km away
          </Badge>
        )}
        <div className="flex justify-center mb-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <UserCheck className="h-3 w-3" /> {mutualFriends} mutual connections
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {interests.map((interest, index) => (
            <Badge key={index} variant="secondary">{interest}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-center">
        <Button onClick={onConnect} className="w-full">
          <Handshake className="mr-2 h-4 w-4" /> Connect
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
