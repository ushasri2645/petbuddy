import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Register from '../src/screens/Register/RegisterScreen';
import {NavigationContainer} from '@react-navigation/native';

describe('Register Component', () => {
  it('renders all input fields correctly', () => {
    const {getByPlaceholderText} = render(
      <NavigationContainer>
        <Register navigation={{replace: jest.fn()}} />
      </NavigationContainer>,
    );

    expect(getByPlaceholderText('User name')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Contact')).toBeTruthy();
    expect(getByPlaceholderText('About you')).toBeTruthy();
    expect(getByPlaceholderText('Adress')).toBeTruthy();
  });

  it('navigates to Login screen when "Already have an account? Login" is pressed', () => {
    const mockNavigation = {replace: jest.fn()};
    const {getByText} = render(
      <NavigationContainer>
        <Register navigation={mockNavigation} />
      </NavigationContainer>,
    );

    const loginText = getByText('Already have an account? Login');
    fireEvent.press(loginText);

    expect(mockNavigation.replace).toHaveBeenCalledWith('Login');
  });
});
