import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import Register from '../src/screens/Register/RegisterScreen';
import {NavigationContainer} from '@react-navigation/native';
import {API_URL} from '../API';
import {Alert, Platform} from 'react-native';

global.fetch = jest.fn();
Alert.alert = jest.fn();
describe('Register Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
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

  it('should update input fields with specified values', () => {
    const mockNavigation = jest.fn();
    const {getByPlaceholderText} = render(
      <Register navigation={mockNavigation} />,
    );
    fireEvent.changeText(getByPlaceholderText('User name'), 'Usha');
    fireEvent.changeText(getByPlaceholderText('Password'), '1234');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), '1234');
    fireEvent.changeText(getByPlaceholderText('Email'), 'usha@gmail.com');
    fireEvent.changeText(getByPlaceholderText('Contact'), '12345678');
    fireEvent.changeText(getByPlaceholderText('About you'), 'I love pets');
    fireEvent.changeText(getByPlaceholderText('Adress'), 'wgl');

    expect(getByPlaceholderText('User name').props.value).toBe('Usha');
    expect(getByPlaceholderText('Password').props.value).toBe('1234');
    expect(getByPlaceholderText('Confirm Password').props.value).toBe('1234');
    expect(getByPlaceholderText('Email').props.value).toBe('usha@gmail.com');
    expect(getByPlaceholderText('Contact').props.value).toBe('12345678');
    expect(getByPlaceholderText('About you').props.value).toBe('I love pets');
    expect(getByPlaceholderText('Adress').props.value).toBe('wgl');
  });

  it('should trigger handle register function', async () => {
    const mockNavigation = {replace: jest.fn()};
    const {getByPlaceholderText, getByText} = render(
      <Register navigation={mockNavigation} />,
    );

    (fetch as jest.Mock).mockResolvedValue({
      status: 201,
    });

    const mockData = {
      name: 'Usha',
      password: '1234',
      address: 'wgl',
      about: 'I love pets',
      email: 'usha@gmail.com',
      contact: '1234567890',
      image_uri: '',
      pets: [],
    };

    fireEvent.changeText(getByPlaceholderText('User name'), 'Usha');
    fireEvent.changeText(getByPlaceholderText('Password'), '1234');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), '1234');
    fireEvent.changeText(getByPlaceholderText('Email'), 'usha@gmail.com');
    fireEvent.changeText(getByPlaceholderText('Contact'), '1234567890');
    fireEvent.changeText(getByPlaceholderText('About you'), 'I love pets');
    fireEvent.changeText(getByPlaceholderText('Adress'), 'wgl');
    const registerButton = getByText('REGISTER');
    fireEvent.press(registerButton);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledWith(`${API_URL}users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockData),
      });
      expect(Alert.alert).toHaveBeenCalledWith('Registration Success');
      expect(mockNavigation.replace).toHaveBeenCalledWith('Loading');
      
    });
    await waitFor(()=>{
      expect(mockNavigation.replace).toHaveBeenCalledWith('Login');
    })
  });

  it('should fail as password and confirm password mismatch', async () => {
    const mockNavigation = {replace: jest.fn()};
    const {getByPlaceholderText, getByText} = render(
      <Register navigation={mockNavigation} />,
    );

    fireEvent.changeText(getByPlaceholderText('User name'), 'Usha');
    fireEvent.changeText(getByPlaceholderText('Password'), '1234');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), '12345');

    const registerButton = getByText('REGISTER');
    fireEvent.press(registerButton);
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Pasword and confirm password mismatch',
      );
    });
  });

  it('should trigger handle register function', async () => {
    const mockNavigation = {replace: jest.fn()};
    const {getByPlaceholderText, getByText} = render(
      <Register navigation={mockNavigation} />,
    );

    (fetch as jest.Mock).mockResolvedValue({
      status: 400,
    });

    const mockData = {
      name: 'Usha',
      password: '1234',
      address: 'wgl',
      about: 'I love pets',
      email: 'usha@gmail.com',
      contact: '1234567890',
      image_uri: '',
      pets: [],
    };

    fireEvent.changeText(getByPlaceholderText('User name'), 'Usha');
    fireEvent.changeText(getByPlaceholderText('Password'), '1234');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), '1234');
    fireEvent.changeText(getByPlaceholderText('Email'), 'usha@gmail.com');
    fireEvent.changeText(getByPlaceholderText('Contact'), '1234567890');
    fireEvent.changeText(getByPlaceholderText('About you'), 'I love pets');
    fireEvent.changeText(getByPlaceholderText('Adress'), 'wgl');
    const registerButton = getByText('REGISTER');
    fireEvent.press(registerButton);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledWith(`${API_URL}users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockData),
      });
      expect(Alert.alert).toHaveBeenCalledWith('Registration failed');
    });
  });

  it("should throw error",async()=>{
    const mockNavigation = {replace: jest.fn()};
    const {getByText} = render(
      <Register navigation={mockNavigation} />,
    );

    (fetch as jest.Mock).mockRejectedValue(new Error("API NOT FOUND"));
    const registerButton = getByText('REGISTER');
    fireEvent.press(registerButton);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith('Error registering user: Error: API NOT FOUND');
    });
  })
});
