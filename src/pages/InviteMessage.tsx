import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import NavigationBar from '@/components/NavigationBar';
import { MessageSquare, Send, Users, ArrowRight } from 'lucide-react';

const InviteMessage = () => {
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b p-4">
        <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Invite Friends
        </h1>
        <p className="text-sm text-center text-muted-foreground">
          Share the love and grow our community!
        </p>
      </div>

      {/* Invite Options */}
      <div className="p-4 space-y-4">
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 hover:shadow-md transition-all">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Invite from Contacts</h3>
                  <p className="text-sm text-gray-600">Sync your contacts to find friends</p>
                </div>
              </div>
              <Button variant="secondary">
                Connect <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 hover:shadow-md transition-all">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-6 h-6 text-pink-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Share Invite Link</h3>
                  <p className="text-sm text-gray-600">Send a custom invite message</p>
                </div>
              </div>
              <Button variant="secondary">
                Share <Send className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <NavigationBar />
    </div>
  );
};

export default InviteMessage;
