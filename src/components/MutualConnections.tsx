
import React from 'react';
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface Friend {
  id: string;
  name: string;
  avatar: string;
}

interface MutualConnectionsProps {
  friends: Friend[];
}

const MutualConnections: React.FC<MutualConnectionsProps> = ({ friends }) => {
  const displayedFriends = friends.slice(0, 3);
  const remainingCount = Math.max(0, friends.length - 3);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Mutual Connections</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <AvatarGroup>
            {displayedFriends.map((friend) => (
              <Avatar key={friend.id} className="border-background">
                <AvatarImage src={friend.avatar} alt={friend.name} />
                <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
            {remainingCount > 0 && (
              <Avatar className="border-background">
                <AvatarFallback>+{remainingCount}</AvatarFallback>
              </Avatar>
            )}
          </AvatarGroup>
          <Link to="/mutual-friends" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default MutualConnections;
