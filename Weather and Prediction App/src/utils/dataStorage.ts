export interface UserInfo {
  name: string;
  age: string;
  dob: string;
  location: string;
  contact: string;
  registrationDate: string;
}

export interface DateTimeQuery {
  queryDate: string;
  queryTime: string;
  queryWeekday: string;
}

// Save user info to localStorage
export const saveUserInfo = (userInfo: UserInfo): void => {
  try {
    const dataToSave = {
      ...userInfo,
      registrationDate: new Date().toISOString()
    };
    localStorage.setItem('weatherAppUserInfo', JSON.stringify(dataToSave));
  } catch (error) {
    console.error('Error saving user info:', error);
  }
};

// Get user info from localStorage
export const getUserInfo = (): UserInfo | null => {
  try {
    const stored = localStorage.getItem('weatherAppUserInfo');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error retrieving user info:', error);
    return null;
  }
};

// Save date/time query
export const saveDateTimeQuery = (query: DateTimeQuery): void => {
  try {
    localStorage.setItem('weatherAppLastQuery', JSON.stringify(query));
  } catch (error) {
    console.error('Error saving query:', error);
  }
};

// Get last date/time query
export const getLastQuery = (): DateTimeQuery | null => {
  try {
    const stored = localStorage.getItem('weatherAppLastQuery');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error retrieving query:', error);
    return null;
  }
};

// Clear all stored data
export const clearStoredData = (): void => {
  try {
    localStorage.removeItem('weatherAppUserInfo');
    localStorage.removeItem('weatherAppLastQuery');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};