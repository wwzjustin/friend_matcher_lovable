
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface FriendVoucherProps {
  friendName: string;
  friendAvatar: string;
  recommendation: string;
  relationshipToTarget: string;
}

const FriendVoucher: React.FC<FriendVoucherProps> = ({
  friendName,
  friendAvatar,
  recommendation,
  relationshipToTarget
}) => {
  return (
    <Card className="w-full mb-4 animate-fade-in">
      <CardContent className="pt-4">
        <div className="flex items-center mb-3">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={friendAvatar} alt={friendName} />
            <AvatarFallback>{friendName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{friendName}</p>
            <Badge variant="outline" className="text-xs">
              {relationshipToTarget}
            </Badge>
          </div>
        </div>
        <div className="pl-2 border-l-2 border-primary/30 mt-2">
          <p className="text-sm text-muted-foreground italic">"{recommendation}"</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FriendVoucher;
