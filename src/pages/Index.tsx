
import React, { useState, useEffect } from 'react';
import { Map, List, Battery, User, Menu, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import MapView from '@/components/MapView';
import StationList from '@/components/StationList';
import RentalModal from '@/components/RentalModal';
import ActiveRental from '@/components/ActiveRental';
import UserProfile from '@/components/UserProfile';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [selectedStation, setSelectedStation] = useState(null);
  const [showRentalModal, setShowRentalModal] = useState(false);
  const [activeTab, setActiveTab] = useState('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRental, setActiveRental] = useState(null);

  // Mock data
  const mockStations = [
    {
      id: '1',
      name: 'Central Mall Station',
      lat: 40.7589,
      lng: -73.9851,
      available: 8,
      total: 12,
      batteryLevels: [95, 87, 92, 78, 85, 90, 76, 88],
      distance: '0.2 km',
      price: '$2.99'
    },
    {
      id: '2',
      name: 'Train Station Hub',
      lat: 40.7614,
      lng: -73.9776,
      available: 3,
      total: 10,
      batteryLevels: [91, 85, 79],
      distance: '0.5 km',
      price: '$2.99'
    },
    {
      id: '3',
      name: 'University Campus',
      lat: 40.7505,
      lng: -73.9934,
      available: 12,
      total: 15,
      batteryLevels: [88, 92, 95, 84, 87, 91, 89, 93, 86, 90, 85, 94],
      distance: '0.8 km',
      price: '$2.49'
    },
    {
      id: '4',
      name: 'Shopping Center',
      lat: 40.7648,
      lng: -73.9808,
      available: 0,
      total: 8,
      batteryLevels: [],
      distance: '1.1 km',
      price: '$2.99'
    },
    {
      id: '5',
      name: 'Business District',
      lat: 40.7549,
      lng: -73.9840,
      available: 6,
      total: 10,
      batteryLevels: [82, 95, 88, 91, 87, 93],
      distance: '1.3 km',
      price: '$3.49'
    }
  ];

  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    totalRentals: 47,
    loyaltyPoints: 1,240,
    memberSince: 'March 2024'
  };

  const filteredStations = mockStations.filter(station =>
    station.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStationSelect = (station) => {
    console.log('Selected station:', station);
    setSelectedStation(station);
  };

  const handleRentPowerBank = (stationId) => {
    console.log('Renting power bank from station:', stationId);
    const station = mockStations.find(s => s.id === stationId);
    if (station && station.available > 0) {
      setShowRentalModal(true);
    } else {
      toast.error('No power banks available at this station');
    }
  };

  const handleStartRental = () => {
    console.log('Starting rental...');
    const newRental = {
      id: 'rental_' + Date.now(),
      batteryId: 'PB001',
      startTime: new Date(),
      batteryLevel: 95,
      stationName: selectedStation?.name || 'Central Mall Station',
      hourlyRate: 2.99
    };
    setActiveRental(newRental);
    toast.success('Power bank rental started successfully!');
    setShowRentalModal(false);
  };

  const handleReturnRental = () => {
    console.log('Returning rental...');
    setActiveRental(null);
    toast.success('Power bank returned successfully!');
  };

  const handleSignOut = () => {
    console.log('Signing out...');
    setIsAuthenticated(false);
    setActiveRental(null);
    toast.success('Signed out successfully');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Battery className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">PowerShare</h1>
            <p className="text-gray-600">Rent power banks anywhere, anytime</p>
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={() => setIsAuthenticated(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3 rounded-lg font-medium"
            >
              Sign In with Phone
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-gray-300 hover:bg-gray-50 py-3 rounded-lg"
            >
              Sign In with Email
            </Button>
          </div>
          
          <p className="text-center text-sm text-gray-500 mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Battery className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">PowerShare</h1>
                <p className="text-xs text-gray-500">Find & Rent Power Banks</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {activeRental && (
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                  Active Rental
                </div>
              )}
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="map" className="flex items-center space-x-2">
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Map</span>
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center space-x-2">
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">List</span>
            </TabsTrigger>
            <TabsTrigger value="rental" className="flex items-center space-x-2">
              <Battery className="w-4 h-4" />
              <span className="hidden sm:inline">Rental</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="map" className="space-y-4">
              {/* Search Bar */}
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search stations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white shadow-sm border-gray-200"
                  />
                </div>
                <Button variant="outline" size="icon" className="bg-white shadow-sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>

              <MapView
                stations={filteredStations}
                selectedStation={selectedStation}
                onStationSelect={handleStationSelect}
                onRentPowerBank={handleRentPowerBank}
              />
            </TabsContent>

            <TabsContent value="list" className="space-y-4">
              {/* Search Bar */}
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search stations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white shadow-sm border-gray-200"
                  />
                </div>
                <Button variant="outline" size="icon" className="bg-white shadow-sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>

              <StationList
                stations={filteredStations}
                onStationSelect={handleStationSelect}
                onRentPowerBank={handleRentPowerBank}
              />
            </TabsContent>

            <TabsContent value="rental">
              <ActiveRental
                rental={activeRental}
                onReturnRental={handleReturnRental}
              />
            </TabsContent>

            <TabsContent value="profile">
              <UserProfile
                user={mockUser}
                onSignOut={handleSignOut}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Rental Modal */}
      <RentalModal
        isOpen={showRentalModal}
        onClose={() => setShowRentalModal(false)}
        stationName={selectedStation?.name || ''}
        onStartRental={handleStartRental}
      />
    </div>
  );
};

export default Index;
