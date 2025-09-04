import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Gem, Sparkles, Zap, Star, Clock, TrendingUp, History } from 'lucide-react';
import { DateTimeQuery } from './DateTimeQueryForm';

interface EnhancedFortunePredictionsProps {
  userName: string;
  query: DateTimeQuery;
}

export function EnhancedFortunePredictions({ userName, query }: EnhancedFortunePredictionsProps) {
  const [currentPredictions, setCurrentPredictions] = useState({
    query: 0,
    future: 0,
    past: 0
  });

  // Generate predictions based on user data and date
  const generatePredictions = (type: 'query' | 'future' | 'past', dayOffset = 0) => {
    const predictions = {
      query: [
        `${userName}, on this exact date and time, you were probably wondering what you're doing with your life. Spoiler: still wondering.`,
        `This specific moment in time reveals that ${userName} was destined to check a weather app. Profound stuff.`,
        `The universe aligned on this date to show ${userName} that procrastination is an art form.`,
        `On this day, ${userName}, your biggest achievement was successfully breathing. Congratulations!`,
        `This date marks the moment ${userName} realized that adult life is just googling how to do things.`
      ],
      future: [
        `${userName}, tomorrow you'll discover that your socks have been plotting against you. Time to switch to sandals.`,
        `In the next 2 days, ${userName} will have an existential crisis over which Netflix show to watch. Choose wisely.`,
        `Future ${userName} will thank present ${userName} for absolutely nothing productive done today.`,
        `Next 48 hours: ${userName} will master the art of looking busy while doing literally nothing.`,
        `Tomorrow, ${userName}, you'll finally understand why they call it 'rush hour' when nobody's moving.`,
        `Day after tomorrow: ${userName} will have a deep conversation with your reflection. Spoiler: you'll lose the argument.`,
        `In 2 days, ${userName} will solve world hunger... in your dreams. Literally.`,
        `Future prediction: ${userName} will spend tomorrow looking for your keys while holding them.`
      ],
      past: [
        `A month ago, ${userName} was probably doing the exact same thing you're doing now. Growth is a myth.`,
        `30 days back, ${userName} made a decision that led you here. Questionable choices, but here we are.`,
        `Last month, ${userName} was full of hope and ambition. Time is the ultimate reality check.`,
        `4 weeks ago, ${userName} probably said 'I'll start tomorrow.' Still waiting for that tomorrow?`,
        `Past ${userName} thought they had everything figured out. Present ${userName} knows better.`,
        `A month back, ${userName} was younger, more naive, and had the same problems. Some things never change.`,
        `30 days ago, ${userName} made plans. The universe laughed. The universe is still laughing.`,
        `Last month's ${userName} would be disappointed in today's ${userName}. But hey, at least you're consistent!`
      ]
    };

    return predictions[type];
  };

  const icons = [
    <Gem className="h-6 w-6 text-purple-500" />,
    <Sparkles className="h-6 w-6 text-blue-500" />,
    <Zap className="h-6 w-6 text-yellow-500" />,
    <Star className="h-6 w-6 text-green-500" />
  ];

  const colors = [
    "from-purple-100 to-pink-100 border-purple-300",
    "from-blue-100 to-cyan-100 border-blue-300",
    "from-yellow-100 to-orange-100 border-yellow-300",
    "from-green-100 to-teal-100 border-green-300"
  ];

  const nextPrediction = (type: 'query' | 'future' | 'past') => {
    setCurrentPredictions(prev => ({
      ...prev,
      [type]: (prev[type] + 1) % generatePredictions(type).length
    }));
  };

  const PredictionCard = ({ type, title, icon, predictions }: any) => {
    const currentIndex = currentPredictions[type as keyof typeof currentPredictions];
    const prediction = predictions[currentIndex];
    const colorScheme = colors[currentIndex % colors.length];
    const iconElement = icons[currentIndex % icons.length];

    return (
      <Card className={`bg-gradient-to-br ${colorScheme} border-2 transition-all duration-500`}>
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-gray-800 flex items-center justify-center gap-2">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="bg-white/70 rounded-lg p-4 mb-4">
              <p className="text-gray-700 italic">"{prediction}"</p>
            </div>
            {iconElement}
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={() => nextPrediction(type)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
            >
              Another {title.split(' ')[0]} ✨
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl mb-2 flex items-center justify-center gap-2">
          <Gem className="h-6 w-6 text-purple-600" />
          Fortune Predictions for {userName}
        </h2>
        <p className="text-gray-600">Your destiny through the lens of sarcasm</p>
      </div>

      <Tabs defaultValue="query" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="query" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Selected Time
          </TabsTrigger>
          <TabsTrigger value="future" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Future (2 Days)
          </TabsTrigger>
          <TabsTrigger value="past" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Past (Month)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="query" className="space-y-4">
          <div className="text-center mb-4">
            <p className="text-gray-600">Fortune for {query.queryDate} at {query.queryTime} ({query.queryWeekday})</p>
          </div>
          <PredictionCard 
            type="query"
            title="Present Fortune"
            icon={<Clock className="h-6 w-6 text-indigo-500" />}
            predictions={generatePredictions('query')}
          />
        </TabsContent>

        <TabsContent value="future" className="space-y-4">
          <div className="text-center mb-4">
            <p className="text-gray-600">What the next 2 days hold for you</p>
          </div>
          <PredictionCard 
            type="future"
            title="Future Fortune"
            icon={<TrendingUp className="h-6 w-6 text-green-500" />}
            predictions={generatePredictions('future')}
          />
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <div className="text-center mb-4">
            <p className="text-gray-600">Reflections on the past month</p>
          </div>
          <PredictionCard 
            type="past"
            title="Past Fortune"
            icon={<History className="h-6 w-6 text-orange-500" />}
            predictions={generatePredictions('past')}
          />
        </TabsContent>
      </Tabs>

      <div className="text-center mt-6 text-xs text-gray-500">
        <p>*Accuracy guaranteed to be 100% fictional. Side effects may include uncontrollable laughter.</p>
      </div>
    </div>
  );
}