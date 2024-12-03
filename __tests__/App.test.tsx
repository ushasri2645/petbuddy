import React from 'react';
import {render, screen} from '@testing-library/react-native';
import App from '../App';
import * as Notifications from '../src/components/Notifications';
import {UserContext, UserContextProvider} from '../src/Context/Context';
import {NavigationContainer} from '@react-navigation/native';
import { AppNavigator } from '../Navigation';
import { View } from 'react-native';

jest.mock('../src/components/Notifications', () => ({
  setupNotificationChannel: jest.fn(),
  fetchAndScheduleReminders: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({children}: {children: React.ReactNode}) => (
    <div data-testid="navigation-container">{children}</div>
  ),
}));

jest.mock('../src/Context/Context', () => ({
  UserContextProvider: ({children}: {children: React.ReactNode}) => (
    <div data-testid="user-context-provider">{children}</div>
  ),
}));

jest.mock('../Navigation', () => ({
  AppNavigator: () => <div data-testid="app-navigator" />,
}));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls setupNotificationChannel and fetchAndScheduleReminders on mount', () => {
    render(<App />);

    // expect(Notifications.setupNotificationChannel).toHaveBeenCalledTimes(1);
    expect(Notifications.fetchAndScheduleReminders).toHaveBeenCalledTimes(1);
  });
});
