import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, Calendar } from 'lucide-react';
import { DateTimeQuery } from './DateTimeQueryForm';

interface EnhancedWeatherDisplayProps {
  location: string;
  query: DateTimeQuery;
}

export function EnhancedWeatherDisplay({ location, query }: EnhancedWeatherDisplayProps) {
  // Generate mock weather data based on date
  const generateWeatherData = (dateStr: string, type: 'query' | 'future' | 'past') => {
    const date = new Date(dateStr);
    const seed = date.getTime() + (type === 'future' ? 100000 : type === 'past' ? -100000 : 0);
    
    const conditions = ['sunny', 'cloudy', 'rainy', 'windy'];
    const descriptions = {
      query: [
        'Perfect weather for overthinking life decisions',
        'Weather so average, it hurts',
        'Mother Nature is feeling basic today',
        'The sky is having an identity crisis',
        'Weather sponsored by your local coffee shop'
      ],
      future: [
        'Future you will thank past you for checking this',
        'Tomorrow\'s weather: sponsored by procrastination',
        'The universe has plans, weather included',
        'Future forecast: 90% chance of existing',
        'Tomorrow\'s mood depends on this weather'
      ],
      past: [
        'Remember when you cared about this weather?',
        'Past weather: brought to you by nostalgia',
        'That weather you missed while scrolling your phone',
        'Weather that happened while you were sleeping',
        'The good old days... of weather'
      ]
    };

    return {
      temperature: Math.floor((seed / 100000) % 20) + 15,
      condition: conditions[Math.floor((seed / 10000) % 4)],
      humidity: Math.floor((seed / 1000) % 30) + 40,
      windSpeed: Math.floor((seed / 100) % 15) + 5,
      description: descriptions[type][Math.floor((seed / 10) % 5)]
    };
  };

  const getWeatherIcon = (condition: string, size = 'h-8 w-8') => {
    const iconClass = `${size} ${
      condition === 'sunny' ? 'text-yellow-500' :
      condition === 'cloudy' ? 'text-gray-500' :
      condition === 'rainy' ? 'text-blue-500' :
      'text-green-500'
    }`;

    switch (condition) {
      case 'sunny': return <Sun className={iconClass} />;
      case 'cloudy': return <Cloud className={iconClass} />;
      case 'rainy': return <CloudRain className={iconClass} />;
      case 'windy': return <Wind className={iconClass} />;
      default: return <Sun className={iconClass} />;
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

  // Generate weather for query date
  const queryWeather = generateWeatherData(query.queryDate, 'query');
  
  // Generate future weather (next 2 days)
  const futureWeather = [];
  for (let i = 1; i <= 2; i++) {
    const futureDate = new Date(query.queryDate);
    futureDate.setDate(futureDate.getDate() + i);
    futureWeather.push({
      date: futureDate.toLocaleDateString(),
      weather: generateWeatherData(futureDate.toISOString(), 'future')
    });
  }

  // Generate past weather (last 30 days, show 5 samples)
  const pastWeather = [];
  for (let i = 1; i <= 30; i += 6) {
    const pastDate = new Date(query.queryDate);
    pastDate.setDate(pastDate.getDate() - i);
    pastWeather.push({
      date: pastDate.toLocaleDateString(),
      weather: generateWeatherData(pastDate.toISOString(), 'past')
    });
  }

  const WeatherCard = ({ weather, title, date, type }: any) => (
    <Card className={`bg-gradient-to-br ${getWeatherColor(weather.condition)} border-2 mb-4`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>{title}</span>
          {getWeatherIcon(weather.condition)}
        </CardTitle>
        {date && <p className="text-sm text-gray-600">{date}</p>}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="text-2xl">{weather.temperature}°C</div>
          <div className="text-right text-sm space-y-1">
            <div className="flex items-center gap-1">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span>{weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind className="h-4 w-4 text-green-500" />
              <span>{weather.windSpeed} km/h</span>
            </div>
          </div>
        </div>
        <div className="bg-white/50 rounded-lg p-2 text-center">
          <p className="text-xs text-gray-700 italic">"{weather.description}"</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl mb-2 flex items-center justify-center gap-2">
          <Thermometer className="h-6 w-6 text-blue-600" />
          Weather in {location}
        </h2>
        <p className="text-gray-600">Your weather journey through time</p>
      </div>

      <Tabs defaultValue="query" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="query">Selected Date</TabsTrigger>
          <TabsTrigger value="future">Future (2 Days)</TabsTrigger>
          <TabsTrigger value="past">Past (Month)</TabsTrigger>
        </TabsList>

        <TabsContent value="query" className="space-y-4">
          <WeatherCard 
            weather={queryWeather}
            title={`Weather for ${query.queryDate}`}
            date={`${query.queryTime} on ${query.queryWeekday}`}
            type="query"
          />
        </TabsContent>

        <TabsContent value="future" className="space-y-4">
          <div className="text-center mb-4">
            <p className="text-gray-600">Next 2 days from your selected date</p>
          </div>
          {futureWeather.map((item, index) => (
            <WeatherCard 
              key={index}
              weather={item.weather}
              title={`Day ${index + 1} Forward`}
              date={item.date}
              type="future"
            />
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <div className="text-center mb-4">
            <p className="text-gray-600">Sample days from the past month</p>
          </div>
          {pastWeather.map((item, index) => (
            <WeatherCard 
              key={index}
              weather={item.weather}
              title={`${6 * (index + 1)} Days Ago`}
              date={item.date}
              type="past"
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}