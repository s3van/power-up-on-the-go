
import React, { useState, useEffect } from 'react';
import { QrCode, Timer, MapPin, Battery, X, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface RentalModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationName: string;
  onStartRental: () => void;
}

const RentalModal: React.FC<RentalModalProps> = ({ 
  isOpen, 
  onClose, 
  stationName, 
  onStartRental 
}) => {
  const [step, setStep] = useState<'scan' | 'confirm' | 'payment'>('scan');
  const [selectedBattery, setSelectedBattery] = useState<number | null>(null);

  const mockBatteries = [
    { id: 1, level: 95, status: 'available' },
    { id: 2, level: 87, status: 'available' },
    { id: 3, level: 92, status: 'available' },
    { id: 4, level: 78, status: 'available' },
  ];

  const handleScanComplete = () => {
    setStep('confirm');
    setSelectedBattery(1);
  };

  const handleConfirmRental = () => {
    setStep('payment');
  };

  const handlePaymentComplete = () => {
    onStartRental();
    onClose();
    setStep('scan');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Rent Power Bank</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Station: {stationName}</div>
          </div>

          {step === 'scan' && (
            <div className="text-center space-y-6">
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-50 to-green-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <QrCode className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 text-sm">Scan QR code on the power bank station</p>
                </div>
              </div>
              <Button 
                onClick={handleScanComplete}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              >
                Simulate QR Scan
              </Button>
            </div>
          )}

          {step === 'confirm' && selectedBattery && (
            <div className="space-y-4">
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-center">Power Bank Selected</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <Battery className="w-8 h-8 text-green-500" />
                    <span className="text-3xl font-bold text-green-600">
                      {mockBatteries[0].level}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Battery ID: #{selectedBattery}</p>
                  
                  <div className="bg-white rounded-lg p-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Hourly Rate:</span>
                      <span className="font-semibold">$2.99</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Estimated Duration:</span>
                      <span>2-4 hours</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Estimated Cost:</span>
                      <span className="text-blue-600">$5.98 - $11.96</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Button 
                onClick={handleConfirmRental}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              >
                Confirm Rental
              </Button>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 border rounded-lg bg-blue-50 border-blue-200">
                      <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded mr-3"></div>
                      <div className="flex-1">
                        <div className="font-medium">•••• •••• •••• 4242</div>
                        <div className="text-sm text-gray-600">Expires 12/25</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Security Deposit:</span>
                          <span>$20.00</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span className="text-xs">Refunded upon return</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Button 
                onClick={handlePaymentComplete}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                Start Rental
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RentalModal;
