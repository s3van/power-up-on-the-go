
import React from 'react';
import { MapPin, Battery, Clock, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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

interface StationListProps {
  stations: Station[];
  onStationSelect: (station: Station) => void;
  onRentPowerBank: (stationId: string) => void;
}

const StationList: React.FC<StationListProps> = ({ 
  stations, 
  onStationSelect, 
  onRentPowerBank 
}) => {
  return (
    <div className="space-y-4">
      {stations.map((station) => (
        <Card 
          key={station.id} 
          className="hover:shadow-lg transition-all duration-200 cursor-pointer bg-white/95 backdrop-blur-sm border-0 shadow-md"
          onClick={() => onStationSelect(station)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">{station.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{station.distance}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>4.8</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">{station.price}</div>
                <div className="text-xs text-gray-500">per hour</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className={`text-xl font-bold ${
                    station.available > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {station.available}
                  </div>
                  <div className="text-xs text-gray-500">Available</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-600">{station.total}</div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
              </div>
              
              {/* Battery Level Indicators */}
              <div className="flex space-x-1">
                {station.batteryLevels.slice(0, 3).map((level, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <Battery className={`w-4 h-4 ${
                      level > 70 ? 'text-green-500' : 
                      level > 30 ? 'text-yellow-500' : 'text-red-500'
                    }`} />
                    <span className="text-xs text-gray-600">{level}%</span>
                  </div>
                ))}
                {station.batteryLevels.length > 3 && (
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 text-gray-400 text-xs font-bold">+{station.batteryLevels.length - 3}</div>
                  </div>
                )}
              </div>
            </div>
            
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                onRentPowerBank(station.id);
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-medium py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
              disabled={station.available === 0}
            >
              {station.available > 0 ? (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Rent Now
                </>
              ) : (
                'Unavailable'
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StationList;
