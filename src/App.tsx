import React, { useState, useEffect } from 'react';
import { UserInfoForm } from './components/UserInfoForm';
import { DateTimeQueryForm, DateTimeQuery } from './components/DateTimeQueryForm';
import { CurrentDateTime } from './components/CurrentDateTime';
import { EnhancedWeatherDisplay } from './components/EnhancedWeatherDisplay';
import { EnhancedFortunePredictions } from './components/EnhancedFortunePredictions';
import { Button } from './components/ui/button';
import { Separator } from './components/ui/separator';
import { ArrowLeft, RefreshCw, Trash2 } from 'lucide-react';
import { saveUserInfo, getUserInfo, saveDateTimeQuery, getLastQuery, clearStoredData } from './utils/dataStorage';

interface UserInfo {
  name: string;
  age: string;
  dob: string;
  location: string;
  contact: string;
}

export default function App() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    age: '',
    dob: '',
    location: '',
    contact: ''
  });

  const [dateTimeQuery, setDateTimeQuery] = useState<DateTimeQuery>({
    queryDate: new Date().toISOString().split('T')[0],
    queryTime: new Date().toTimeString().slice(0, 5),
    queryWeekday: new Date().toLocaleDateString('en-US', { weekday: 'long' })
  });

  const [currentStep, setCurrentStep] = useState<'userInfo' | 'dateTime' | 'results'>('userInfo');

  // Load saved data on component mount
  useEffect(() => {
    const savedUserInfo = getUserInfo();
    const savedQuery = getLastQuery();
    
    if (savedUserInfo) {
      setUserInfo(savedUserInfo);
      setCurrentStep('dateTime');
    }
    
    if (savedQuery) {
      setDateTimeQuery(savedQuery);
    }
  }, []);

  const handleUserSubmit = () => {
    saveUserInfo(userInfo);
    setCurrentStep('dateTime');
  };

  const handleDateTimeSubmit = () => {
    saveDateTimeQuery(dateTimeQuery);
    setCurrentStep('results');
  };

  const handleBackToUserInfo = () => {
    setCurrentStep('userInfo');
  };

  const handleBackToDateTime = () => {
    setCurrentStep('dateTime');
  };

  const handleNewQuery = () => {
    setCurrentStep('dateTime');
  };

  const handleClearData = () => {
    clearStoredData();
    setUserInfo({
      name: '',
      age: '',
      dob: '',
      location: '',
      contact: ''
    });
    setCurrentStep('userInfo');
  };

  // Render user info form step
  if (currentStep === 'userInfo') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          <UserInfoForm 
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            onSubmit={handleUserSubmit}
          />
        </div>
      </div>
    );
  }

  // Render date/time query form step
  if (currentStep === 'dateTime') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 p-4">
        {/* Current time in top right */}
        <div className="fixed top-4 right-4 z-10">
          <CurrentDateTime />
        </div>

        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-lg">
            <div className="mb-6 text-center">
              <Button 
                onClick={handleBackToUserInfo}
                variant="outline"
                className="mb-4 bg-white/50 border-green-200 hover:bg-white/70"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Profile
              </Button>
            </div>
            
            <DateTimeQueryForm 
              query={dateTimeQuery}
              setQuery={setDateTimeQuery}
              onSubmit={handleDateTimeSubmit}
              userName={userInfo.name}
            />
          </div>
        </div>
      </div>
    );
  }

  // Render results page
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Fixed header with current time */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm border-b border-blue-200">
        <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button 
              onClick={handleBackToDateTime}
              variant="outline"
              size="sm"
              className="bg-white/50 border-blue-200 hover:bg-white/70"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Change Date/Time
            </Button>
            
            <Button 
              onClick={handleNewQuery}
              variant="outline"
              size="sm"
              className="bg-white/50 border-green-200 hover:bg-white/70"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              New Query
            </Button>

            <Button 
              onClick={handleClearData}
              variant="outline"
              size="sm"
              className="bg-white/50 border-red-200 hover:bg-white/70 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Data
            </Button>
          </div>

          <CurrentDateTime />
        </div>
      </div>

      {/* Main content with top padding for fixed header */}
      <div className="pt-20 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Welcome message */}
          <div className="text-center mb-8">
            <h1 className="text-4xl mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome back, {userInfo.name}! 🌟
            </h1>
            <p className="text-gray-600">Your personalized weather and fortune journey awaits</p>
            <div className="mt-2 text-sm text-gray-500">
              Exploring: {dateTimeQuery.queryDate} at {dateTimeQuery.queryTime} ({dateTimeQuery.queryWeekday})
            </div>
          </div>

          {/* Weather Section */}
          <div className="mb-12">
            <EnhancedWeatherDisplay 
              location={userInfo.location}
              query={dateTimeQuery}
            />
          </div>

          <Separator className="my-12" />

          {/* Fortune Section */}
          <div className="mb-12">
            <EnhancedFortunePredictions 
              userName={userInfo.name}
              query={dateTimeQuery}
            />
          </div>

          {/* Footer */}
          <Separator className="my-8" />
          <div className="text-center text-sm text-gray-500 space-y-2 pb-8">
            <p>Built with ❤️, sarcasm, and a healthy dose of randomness</p>
            <p>Your data is stored locally - no clouds involved (except the weather ones)!</p>
            <div className="flex justify-center space-x-4 text-xs">
              <span>🔐 Privacy First</span>
              <span>😄 Laughter Guaranteed</span>
              <span>🎯 100% Fictional Accuracy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}