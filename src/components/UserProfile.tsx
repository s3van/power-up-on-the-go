
import React from 'react';
import { User, CreditCard, History, Settings, LogOut, Star, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    phone: string;
    totalRentals: number;
    loyaltyPoints: number;
    memberSince: string;
  };
  onSignOut: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onSignOut }) => {
  const recentRentals = [
    { id: '1', date: '2024-06-27', station: 'Central Mall Station', duration: '2h 15m', cost: '$6.75', status: 'completed' },
    { id: '2', date: '2024-06-26', station: 'Train Station Hub', duration: '1h 45m', cost: '$5.25', status: 'completed' },
    { id: '3', date: '2024-06-25', station: 'University Campus', duration: '3h 30m', cost: '$10.50', status: 'completed' },
    { id: '4', date: '2024-06-24', station: 'Shopping Center', duration: '1h 20m', cost: '$4.00', status: 'completed' },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 border-2 border-white/20">
              <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-white/90">{user.email}</p>
              <p className="text-white/90">{user.phone}</p>
              <p className="text-sm text-white/80">Member since {user.memberSince}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{user.totalRentals}</div>
            <div className="text-sm text-gray-600">Total Rentals</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{user.loyaltyPoints}</div>
            <div className="text-sm text-gray-600">Loyalty Points</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <CreditCard className="w-4 h-4 mr-3" />
            Payment Methods
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Star className="w-4 h-4 mr-3" />
            Loyalty Program
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </Button>
        </CardContent>
      </Card>

      {/* Recent Rentals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="w-5 h-5 mr-2" />
            Recent Rentals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentRentals.map((rental) => (
              <div key={rental.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-sm">{rental.station}</div>
                  <div className="text-xs text-gray-600">{rental.date} • {rental.duration}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">{rental.cost}</div>
                  <div className="text-xs text-green-600 capitalize">{rental.status}</div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View All History
          </Button>
        </CardContent>
      </Card>

      {/* Sign Out */}
      <Button 
        onClick={onSignOut}
        variant="outline" 
        className="w-full text-red-600 border-red-200 hover:bg-red-50"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );
};

export default UserProfile;
