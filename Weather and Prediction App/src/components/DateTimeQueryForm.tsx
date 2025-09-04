import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, Clock } from 'lucide-react';

export interface DateTimeQuery {
  queryDate: string;
  queryTime: string;
  queryWeekday: string;
}

interface DateTimeQueryFormProps {
  query: DateTimeQuery;
  setQuery: (query: DateTimeQuery) => void;
  onSubmit: () => void;
  userName: string;
}

export function DateTimeQueryForm({ query, setQuery, onSubmit, userName }: DateTimeQueryFormProps) {
  const handleInputChange = (field: keyof DateTimeQuery, value: string) => {
    setQuery({ ...query, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.queryDate && query.queryTime && query.queryWeekday) {
      onSubmit();
    }
  };

  // Weekday options
  const weekdayOptions = [
    'Monday',
    'Tuesday', 
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  return (
    <Card className="w-full max-w-lg mx-auto bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-green-800 flex items-center justify-center gap-2">
          <Calendar className="h-6 w-6" />
          Tell us about the day, {userName}!
        </CardTitle>
        <p className="text-green-600">What date and time do you want to explore?</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="queryDate" className="text-green-700">Select Date</Label>
            <Input
              id="queryDate"
              type="date"
              value={query.queryDate}
              onChange={(e) => handleInputChange('queryDate', e.target.value)}
              className="border-green-200 focus:border-green-400"
              required
            />
          </div>

          <div>
            <Label htmlFor="queryTime" className="text-green-700 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Select Time
            </Label>
            <Input
              id="queryTime"
              type="time"
              value={query.queryTime}
              onChange={(e) => handleInputChange('queryTime', e.target.value)}
              className="border-green-200 focus:border-green-400"
              required
            />
          </div>

          <div>
            <Label className="text-green-700">Weekday</Label>
            <Select value={query.queryWeekday} onValueChange={(value) => handleInputChange('queryWeekday', value)}>
              <SelectTrigger className="border-green-200 focus:border-green-400">
                <SelectValue placeholder="Select a weekday" />
              </SelectTrigger>
              <SelectContent>
                {weekdayOptions.map((weekday) => (
                  <SelectItem key={weekday} value={weekday}>{weekday}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
          >
            Explore Weather & Fortune! 🔮
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}