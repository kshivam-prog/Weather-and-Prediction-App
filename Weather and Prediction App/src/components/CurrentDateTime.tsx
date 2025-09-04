import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Clock, Calendar } from 'lucide-react';

export function CurrentDateTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
      <CardContent className="p-3">
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-1 text-blue-700">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-mono">{formatTime(currentTime)}</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-blue-600">
            <Calendar className="h-3 w-3" />
            <span className="text-xs">{formatDate(currentTime)}</span>
          </div>
          <div className="text-xs text-gray-500">
            {currentTime.getFullYear()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}