
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import NavigationBar from '@/components/NavigationBar';
import { MessageCircle, Clock, Check, X } from 'lucide-react';

const InviteMessage = () => {
  const [activeTab, setActiveTab] = useState<'invites' | 'messages'>('invites');

  const invites = [
    {
      id: '1',
      name: 'Emma Wilson',
      avatar: 'https://i.pravatar.cc/150?img=49',
      status: 'pending',
      sentAt: '2 hours ago',
      note: 'Hi! Would love to connect and maybe grab coffee sometime!'
    },
    {
      id: '2',
      name: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?img=11',
      status: 'accepted',
      sentAt: '1 day ago',
      note: 'Hey! Sarah mentioned we should meet. Love your photography work!'
    },
    {
      id: '3',
      name: 'Sofia Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=44',
      status: 'declined',
      sentAt: '3 days ago',
      note: 'Would love to chat about art and maybe collaborate!'
    }
  ];

  const messages = [
    {
      id: '1',
      name: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?img=11',
      lastMessage: 'That sounds great! I know a perfect spot for photos...',
      timestamp: '10 min ago',
      unread: 2
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'accepted':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'declined':
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Connections
          </h1>
          
          {/* Tab Navigation */}
          <div className="flex bg-muted rounded-full p-1">
            <button
              onClick={() => setActiveTab('invites')}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                activeTab === 'invites'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-muted-foreground'
              }`}
            >
              Invites ({invites.length})
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                activeTab === 'messages'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-muted-foreground'
              }`}
            >
              Messages ({messages.length})
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'invites' ? (
          <div className="space-y-4">
            {invites.map((invite, index) => (
              <Card 
                key={invite.id}
                className="gradient-card border-0 shadow-lg rounded-2xl animate-fade-in-up"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={invite.avatar} />
                        <AvatarFallback>{invite.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{invite.name}</h3>
                        <p className="text-xs text-muted-foreground">{invite.sentAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(invite.status)}
                      <Badge className={`${getStatusColor(invite.status)} border-0 text-xs`}>
                        {invite.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="bg-accent/30 rounded-xl p-3 mb-3">
                    <p className="text-sm">{invite.note}</p>
                  </div>
                  
                  {invite.status === 'accepted' && (
                    <Button size="sm" className="w-full rounded-full gradient-primary">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Start Chat
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <Card 
                key={message.id}
                className="gradient-card border-0 shadow-lg rounded-2xl cursor-pointer hover:scale-105 transition-transform animate-fade-in-up"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={message.avatar} />
                      <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold truncate">{message.name}</h3>
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{message.lastMessage}</p>
                    </div>
                    {message.unread > 0 && (
                      <Badge className="bg-primary text-white rounded-full min-w-[20px] h-5 text-xs flex items-center justify-center">
                        {message.unread}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <NavigationBar />
    </div>
  );
};

export default InviteMessage;
