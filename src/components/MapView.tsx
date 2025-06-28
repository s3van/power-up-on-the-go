
import React, { useState } from 'react';
import { MapPin, Battery, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Station {
  id: string;
  name: string;
  lat: number;
  lng: number;
  available: number;
  total: number;
  batteryLevels: number[];
  distance: string;
  price: string;
}

interface MapViewProps {
  stations: Station[];
  selectedStation: Station | null;
  onStationSelect: (station: Station) => void;
  onRentPowerBank: (stationId: string) => void;
}

const MapView: React.FC<MapViewProps> = ({ 
  stations, 
  selectedStation, 
  onStationSelect, 
  onRentPowerBank 
}) => {
  return (
    <div className="relative">
      {/* Map Container */}
      <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg relative overflow-hidden border">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10"></div>
        
        {/* Station Markers */}
        {stations.map((station) => (
          <div
            key={station.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 ${
              selectedStation?.id === station.id ? 'z-20 scale-125' : 'z-10'
            }`}
            style={{
              left: `${(station.lng + 74) * 50}%`,
              top: `${(40.8 - station.lat) * 50}%`,
            }}
            onClick={() => onStationSelect(station)}
          >
            <div className={`relative ${selectedStation?.id === station.id ? 'animate-pulse' : ''}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
                station.available > 0 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-red-500 hover:bg-red-600'
              }`}>
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-800 shadow-md">
                {station.available}
              </div>
            </div>
          </div>
        ))}
        
        {/* User Location */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse shadow-lg"></div>
          <div className="absolute inset-0 w-4 h-4 bg-blue-600/30 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Station Details Card */}
      {selectedStation && (
        <Card className="mt-4 border-0 shadow-lg bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">
                {selectedStation.name}
              </CardTitle>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{selectedStation.distance}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {selectedStation.available}
                </div>
                <div className="text-sm text-gray-500">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {selectedStation.price}
                </div>
                <div className="text-sm text-gray-500">per hour</div>
              </div>
            </div>
            
            {/* Battery Levels */}
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Battery Levels</div>
              <div className="flex space-x-2">
                {selectedStation.batteryLevels.map((level, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <Battery className={`w-4 h-4 ${
                      level > 70 ? 'text-green-500' : 
                      level > 30 ? 'text-yellow-500' : 'text-red-500'
                    }`} />
                    <span className="text-xs text-gray-600">{level}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={() => onRentPowerBank(selectedStation.id)}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-medium py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
              disabled={selectedStation.available === 0}
            >
              {selectedStation.available > 0 ? (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Rent Power Bank
                </>
              ) : (
                'No Power Banks Available'
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MapView;
