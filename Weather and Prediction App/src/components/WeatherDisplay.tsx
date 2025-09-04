import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets } from 'lucide-react';

interface WeatherDisplayProps {
  location: string;
}

export function WeatherDisplay({ location }: WeatherDisplayProps) {
  // Mock weather data - in a real app, this would come from a weather API
  const weatherData = {
    temperature: Math.floor(Math.random() * 20) + 15, // 15-35°C
    condition: ['sunny', 'cloudy', 'rainy', 'windy'][Math.floor(Math.random() * 4)],
    humidity: Math.floor(Math.random() * 30) + 40, // 40-70%
    windSpeed: Math.floor(Math.random() * 15) + 5, // 5-20 km/h
    description: [
      'Perfect weather for staying inside',
      'Great day to question your life choices',
      'Weather so nice, even your plants are jealous',
      'Typical weather for typical people',
      'Mother Nature is having mood swings again'
    ][Math.floor(Math.random() * 5)]
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="h-12 w-12 text-yellow-500" />;
      case 'cloudy': return <Cloud className="h-12 w-12 text-gray-500" />;
      case 'rainy': return <CloudRain className="h-12 w-12 text-blue-500" />;
      case 'windy': return <Wind className="h-12 w-12 text-green-500" />;
      default: return <Sun className="h-12 w-12 text-yellow-500" />;
    }
  };

  const getWeatherColor = (condition: string) => {
    switch (condition) {
      case 'sunny': return 'from-yellow-100 to-orange-100 border-yellow-300';
      case 'cloudy': return 'from-gray-100 to-blue-100 border-gray-300';
      case 'rainy': return 'from-blue-100 to-indigo-100 border-blue-300';
      case 'windy': return 'from-green-100 to-teal-100 border-green-300';
      default: return 'from-yellow-100 to-orange-100 border-yellow-300';
    }
  };

  return (
    <Card className={`w-full max-w-md mx-auto bg-gradient-to-br ${getWeatherColor(weatherData.condition)} border-2`}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-gray-800">Weather in {location}</CardTitle>
        <div className="flex justify-center mt-2">
          {getWeatherIcon(weatherData.condition)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-4xl mb-2">{weatherData.temperature}°C</div>
          <div className="text-gray-600 capitalize">{weatherData.condition}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            <span className="text-sm">Humidity: {weatherData.humidity}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="h-5 w-5 text-green-500" />
            <span className="text-sm">Wind: {weatherData.windSpeed} km/h</span>
          </div>
        </div>
        
        <div className="bg-white/50 rounded-lg p-3 text-center">
          <p className="text-sm text-gray-700 italic">"{weatherData.description}"</p>
        </div>
      </CardContent>
    </Card>
  );
}