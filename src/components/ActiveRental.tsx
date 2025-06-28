
import React, { useState, useEffect } from 'react';
import { Timer, MapPin, Battery, QrCode, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ActiveRentalProps {
  rental: {
    id: string;
    batteryId: string;
    startTime: Date;
    batteryLevel: number;
    stationName: string;
    hourlyRate: number;
  } | null;
  onReturnRental: () => void;
}

const ActiveRental: React.FC<ActiveRentalProps> = ({ rental, onReturnRental }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(rental?.batteryLevel || 95);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate battery drain (very slow for demo)
      setBatteryLevel(prev => Math.max(prev - 0.01, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!rental) {
    return (
      <Card className="text-center p-8">
        <CardContent>
          <Battery className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Active Rental</h3>
          <p className="text-gray-500">Find a nearby station to rent a power bank</p>
        </CardContent>
      </Card>
    );
  }

  const duration = Math.floor((currentTime.getTime() - rental.startTime.getTime()) / 1000);
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
  const currentCost = (duration / 3600) * rental.hourlyRate;

  return (
    <div className="space-y-4">
      {/* Active Rental Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Battery className="w-5 h-5 mr-2" />
              Active Rental
            </span>
            <div className="text-right text-sm">
              <div>Battery #{rental.batteryId}</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <div className="text-sm opacity-90">Duration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">${currentCost.toFixed(2)}</div>
              <div className="text-sm opacity-90">Current Cost</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Battery Level</span>
                <span>{batteryLevel.toFixed(0)}%</span>
              </div>
              <Progress 
                value={batteryLevel} 
                className="h-3 bg-white/20"
              />
            </div>
            
            <div className="flex items-center text-sm">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Rented from: {rental.stationName}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Battery Status Warning */}
      {batteryLevel < 20 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center text-red-700">
              <AlertCircle className="w-5 h-5 mr-2" />
              <div>
                <div className="font-semibold">Low Battery Warning</div>
                <div className="text-sm">Consider returning soon or finding a charging station</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Return Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Return Power Bank</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600 mb-4">
            Return to any station to end your rental. You'll be charged for the actual usage time.
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="flex flex-col items-center py-6 h-auto"
            >
              <QrCode className="w-8 h-8 mb-2" />
              <span className="text-sm">Scan to Return</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center py-6 h-auto"
            >
              <MapPin className="w-8 h-8 mb-2" />
              <span className="text-sm">Find Station</span>
            </Button>
          </div>
          
          <Button 
            onClick={onReturnRental}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
          >
            Return Power Bank
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActiveRental;
