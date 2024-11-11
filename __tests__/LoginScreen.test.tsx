import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import Login from '../src/screens/Login/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {Platform} from 'react-native';
import {UserContext, UserContextProvider} from '../src/Context/Context';

describe('Test for Main Component', () => {
  const mockSetUser = jest.fn();
  const user = {
    name: 'Usha',
    password: '1234',
    email: 'usha@gmail.com',
    contact: '23456789',
    about: 'me',
    address: 'wgl',
    pets: [],
  };
  it('renders the top image', () => {
    const {getByTestId} = render(
      <NavigationContainer>
       <UserContext.Provider
          value={{
            user: user,
            setUser: mockSetUser,
          }}>
          <Login navigation={{replace: jest.fn()}} />
        </UserContext.Provider>
      </NavigationContainer>,
    );
    const imageBackground = getByTestId('top-image');
    expect(imageBackground).toBeTruthy();
  });
  it('it should render the petbuddy image', () => {
    const {getByTestId} = render(
      <NavigationContainer>
       <UserContext.Provider
          value={{
            user: user,
            setUser: mockSetUser,
          }}>
          <Login navigation={{replace: jest.fn()}} />
        </UserContext.Provider>
      </NavigationContainer>,
    );
    const imageBackground = getByTestId('petbuddy-image');
    expect(imageBackground).toBeTruthy();
  });
  it('it should render all the texts correctly', () => {
    const {getByText} = render(
      <NavigationContainer>
       <UserContext.Provider
          value={{
            user: user,
            setUser: mockSetUser,
          }}>
          <Login navigation={{replace: jest.fn()}} />
        </UserContext.Provider>
      </NavigationContainer>,
    );
    expect(getByText('Pet')).toBeTruthy();
    expect(getByText('Buddy!')).toBeTruthy();
    expect(getByText("Don't have an account? Register")).toBeTruthy();
    expect(getByText('©️All Rights Reserved to PetBuddy - 2024')).toBeTruthy();
    expect(getByText('LOGIN')).toBeTruthy();
  });
  it('Should test for input elements', () => {
    const {getByPlaceholderText} = render(
      <NavigationContainer>
       <UserContext.Provider
          value={{
            user: user,
            setUser: mockSetUser,
          }}>
          <Login navigation={{replace: jest.fn()}} />
        </UserContext.Provider>
      </NavigationContainer>,
    );
    expect(getByPlaceholderText('User name')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });
  it('renders the image with correct height and width for iOS', () => {
    Platform.OS = 'ios';
    render(
      <NavigationContainer>
       <UserContext.Provider
          value={{
            user: user,
            setUser: mockSetUser,
          }}>
          <Login navigation={{replace: jest.fn()}} />
        </UserContext.Provider>
      </NavigationContainer>,
    );
    expect(screen.getByTestId('top-image').props.style).toMatchObject({
      resizeMode: 'stretch',
      height: 100,
      width: 400,
    });
  });
  it('navigates to Login screen when "Already have an account? Login" is pressed', () => {
    const mockNavigation = {replace: jest.fn()};
    const {getByText} = render(
      <NavigationContainer>
       <UserContext.Provider
          value={{
            user: user,
            setUser: mockSetUser,
          }}>
          <Login navigation={mockNavigation} />
        </UserContext.Provider>
      </NavigationContainer>,
    );

    const registerText = getByText("Don't have an account? Register");
    fireEvent.press(registerText);

    expect(mockNavigation.replace).toHaveBeenCalledWith('Register');
  });
  it('updates username field on input change', () => {
    const setUserName = jest.fn();
    const mockNavigation = {replace: jest.fn()};
    const {getByTestId} = render(
      <NavigationContainer>
       <UserContext.Provider
          value={{
            user: user,
            setUser: mockSetUser,
          }}>
          <Login navigation={mockNavigation} />
        </UserContext.Provider>
      </NavigationContainer>,
    );
    const usernameInput = getByTestId('username-input');
    fireEvent.changeText(usernameInput, 'testUser');
    expect(usernameInput.props.value).toBe('testUser');
  });
  it('updates password field on input change', () => {
    const mockNavigation = {replace: jest.fn()};
    const setPassword = jest.fn();
    const {getByTestId} = render(
      <NavigationContainer>
       <UserContext.Provider
          value={{
            user: user,
            setUser: mockSetUser,
          }}>
          <Login navigation={mockNavigation} />
        </UserContext.Provider>
      </NavigationContainer>,
    );

    const passwordInput = getByTestId('password-input');
    fireEvent.changeText(passwordInput, 'testPass123');
    expect(passwordInput.props.value).toBe('testPass123');
  });
});
