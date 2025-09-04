import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Gem, Sparkles, Zap, Star } from 'lucide-react';

interface FuturePredictionsProps {
  userName: string;
}

export function FuturePredictions({ userName }: FuturePredictionsProps) {
  const [currentPrediction, setCurrentPrediction] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const predictions = [
    {
      title: "Tomorrow's Forecast",
      text: `${userName}, tomorrow you'll discover that your coffee maker is actually plotting against you. Invest in tea.`,
      icon: <Gem className="h-6 w-6 text-purple-500" />,
      color: "from-purple-100 to-pink-100 border-purple-300"
    },
    {
      title: "Next Week's Drama",
      text: `Next week, ${userName} will finally understand why people say 'it's not you, it's me.' Spoiler: it was always you.`,
      icon: <Sparkles className="h-6 w-6 text-blue-500" />,
      color: "from-blue-100 to-cyan-100 border-blue-300"
    },
    {
      title: "Monthly Revelation",
      text: `This month, ${userName} will realize that adulting is just googling how to do basic things and pretending you knew all along.`,
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      color: "from-yellow-100 to-orange-100 border-yellow-300"
    },
    {
      title: "Yearly Wisdom",
      text: `By the end of this year, ${userName} will master the art of looking busy while doing absolutely nothing productive.`,
      icon: <Star className="h-6 w-6 text-green-500" />,
      color: "from-green-100 to-teal-100 border-green-300"
    },
    {
      title: "Life Prediction",
      text: `${userName}, your future holds many moments of staring at your phone and forgetting what you were looking for.`,
      icon: <Gem className="h-6 w-6 text-indigo-500" />,
      color: "from-indigo-100 to-purple-100 border-indigo-300"
    },
    {
      title: "Career Forecast",
      text: `${userName} will soon become an expert at nodding during meetings while mentally planning what to have for lunch.`,
      icon: <Sparkles className="h-6 w-6 text-red-500" />,
      color: "from-red-100 to-pink-100 border-red-300"
    },
    {
      title: "Relationship Update",
      text: `${userName}, your most stable relationship will continue to be with your bed and Netflix subscription.`,
      icon: <Zap className="h-6 w-6 text-rose-500" />,
      color: "from-rose-100 to-pink-100 border-rose-300"
    },
    {
      title: "Technology Prophecy",
      text: `${userName} will spend 73% of tomorrow looking for your phone while holding it in your hand.`,
      icon: <Star className="h-6 w-6 text-violet-500" />,
      color: "from-violet-100 to-purple-100 border-violet-300"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPrediction((prev) => (prev + 1) % predictions.length);
        setIsAnimating(false);
      }, 300);
    }, 8000);

    return () => clearInterval(interval);
  }, [predictions.length]);

  const nextPrediction = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPrediction((prev) => (prev + 1) % predictions.length);
      setIsAnimating(false);
    }, 300);
  };

  const currentPred = predictions[currentPrediction];

  return (
    <Card className={`w-full max-w-md mx-auto bg-gradient-to-br ${currentPred.color} border-2 transition-all duration-500`}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-gray-800 flex items-center justify-center gap-2">
          {currentPred.icon}
          Future Predictions
        </CardTitle>
        <p className="text-sm text-gray-600">Totally accurate* fortune telling</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
          <div className="text-center mb-4">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">{currentPred.title}</h3>
            <div className="bg-white/70 rounded-lg p-4">
              <p className="text-gray-700 italic">"{currentPred.text}"</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={nextPrediction}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
          >
            Reveal Another Prophecy ✨
          </Button>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500">*Accuracy not guaranteed. Side effects may include laughter and self-reflection.</p>
        </div>
      </CardContent>
    </Card>
  );
}