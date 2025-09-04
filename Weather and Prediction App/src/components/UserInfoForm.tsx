import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

interface UserInfo {
  name: string;
  age: string;
  dob: string;
  location: string;
  contact: string;
}

interface UserInfoFormProps {
  userInfo: UserInfo;
  setUserInfo: (info: UserInfo) => void;
  onSubmit: () => void;
}

export function UserInfoForm({ userInfo, setUserInfo, onSubmit }: UserInfoFormProps) {
  const handleInputChange = (field: keyof UserInfo, value: string) => {
    setUserInfo({ ...userInfo, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInfo.name && userInfo.age && userInfo.dob && userInfo.location && userInfo.contact) {
      onSubmit();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-blue-800">Welcome! Tell us about yourself</CardTitle>
        <p className="text-blue-600">Just a few quick details to get started</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-blue-700">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your awesome name"
              value={userInfo.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="border-blue-200 focus:border-blue-400"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="age" className="text-blue-700">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="How young are you?"
              value={userInfo.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              className="border-blue-200 focus:border-blue-400"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="dob" className="text-blue-700">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={userInfo.dob}
              onChange={(e) => handleInputChange('dob', e.target.value)}
              className="border-blue-200 focus:border-blue-400"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="location" className="text-blue-700">Where do you live?</Label>
            <Input
              id="location"
              type="text"
              placeholder="Your city or area"
              value={userInfo.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="border-blue-200 focus:border-blue-400"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="contact" className="text-blue-700">Contact Number</Label>
            <Input
              id="contact"
              type="tel"
              placeholder="Your phone number"
              value={userInfo.contact}
              onChange={(e) => handleInputChange('contact', e.target.value)}
              className="border-blue-200 focus:border-blue-400"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
          >
            Let's Go! 🚀
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}