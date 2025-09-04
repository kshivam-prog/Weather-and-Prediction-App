import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Clock, Calendar } from 'lucide-react';

export function TimeDisplay() {
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
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeEmoji = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) return '🌅';
    if (hour >= 12 && hour < 17) return '☀️';
    if (hour >= 17 && hour < 21) return '🌆';
    return '🌙';
  };

  const getTimeMessage = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) return 'Morning vibes (or barely surviving)';
    if (hour >= 12 && hour < 17) return 'Afternoon energy (or post-lunch coma)';
    if (hour >= 17 && hour < 21) return 'Evening mood (or existential crisis time)';
    return 'Night owl hours (or insomnia kicks in)';
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 border-2 border-indigo-300">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-indigo-800 flex items-center justify-center gap-2">
          <Clock className="h-6 w-6" />
          Current Time
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-4xl mb-2 font-mono">{formatTime(currentTime)}</div>
          <div className="text-lg">{getTimeEmoji()}</div>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-indigo-700">
          <Calendar className="h-5 w-5" />
          <span>{formatDate(currentTime)}</span>
        </div>
        
        <div className="bg-white/50 rounded-lg p-3 text-center">
          <p className="text-sm text-indigo-700 italic">"{getTimeMessage()}"</p>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-indigo-600">
          <div>Year: {currentTime.getFullYear()}</div>
          <div>Month: {currentTime.getMonth() + 1}</div>
          <div>Day: {currentTime.getDate()}</div>
          <div>Week Day: {currentTime.getDay() + 1}</div>
        </div>
      </CardContent>
    </Card>
  );
}