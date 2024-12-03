import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react-native';
import Login from '../src/screens/Login/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {Alert, Platform} from 'react-native';
import {UserContext} from '../src/Context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

const mockNavigation = {
  replace: jest.fn(),
};
Alert.alert = jest.fn()

describe('Login Component', () => {
  const mockSetUser = jest.fn();

  const renderComponent = () =>
    render(
      <UserContext.Provider value={{user: null, setUser: mockSetUser}}>
        <Login navigation={mockNavigation} />
      </UserContext.Provider>,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the top image', () => {
    const {getByTestId} = renderComponent();
    expect(getByTestId('top-image')).toBeTruthy();
  });

  it('renders the petbuddy image', () => {
    const {getByTestId} = renderComponent();
    expect(getByTestId('petbuddy-image')).toBeTruthy();
  });

  it('renders required texts', () => {
    const {getByText} = renderComponent();
    expect(getByText('Pet')).toBeTruthy();
    expect(getByText('Buddy!')).toBeTruthy();
    expect(getByText("Don't have an account? Register")).toBeTruthy();
    expect(getByText('©️All Rights Reserved to PetBuddy - 2024')).toBeTruthy();
    expect(getByText('LOGIN')).toBeTruthy();
  });

  it('renders input fields with placeholders', () => {
    const {getByPlaceholderText} = renderComponent();
    expect(getByPlaceholderText('User name')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it("navigates to the Register screen when Don't have an account is clicked", () => {
    const {getByText} = renderComponent();
    fireEvent.press(getByText("Don't have an account? Register"));
    expect(mockNavigation.replace).toHaveBeenCalledWith('Register');
  });

  it('updates the username field on input change', () => {
    const {getByPlaceholderText} = renderComponent();
    const usernameInput = getByPlaceholderText('User name');
    fireEvent.changeText(usernameInput, 'Usha');
    expect(usernameInput.props.value).toBe('Usha');
  });

  it('updates the password field on input change', () => {
    const {getByPlaceholderText} = renderComponent();
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(passwordInput, 'password123');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('displays an error alert when login fails with invalid credentials', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 401,
      }),
    ) as jest.Mock;

    const {getByText, getByPlaceholderText} = renderComponent();
    fireEvent.changeText(getByPlaceholderText('User name'), 'wronguser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpassword');
    fireEvent.press(getByText('LOGIN'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Invalid Credentials')
      expect(mockNavigation.replace).not.toHaveBeenCalled();
    });
  });
  it('displays an user not found alert', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 404,
      }),
    ) as jest.Mock;

    const {getByText, getByPlaceholderText} = renderComponent();
    fireEvent.changeText(getByPlaceholderText('User name'), 'wronguser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpassword');
    fireEvent.press(getByText('LOGIN'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('User Details not found')
      expect(mockNavigation.replace).not.toHaveBeenCalled();
    });
  });

  it('logs in successfully and navigates to Home screen', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: jest.fn().mockResolvedValue({name: 'Usha', password: '1234'}),
      }),
    ) as jest.Mock;

    const {getByText, getByPlaceholderText} = renderComponent();
    fireEvent.changeText(getByPlaceholderText('User name'), 'Usha');
    fireEvent.changeText(getByPlaceholderText('Password'), '1234');
    fireEvent.press(getByText('LOGIN'));

    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalledWith({name: 'Usha', password: '1234'});
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'loggedInUser',
        JSON.stringify({name: 'Usha', password: '1234'}),
      );
      expect(mockNavigation.replace).toHaveBeenCalledWith('Loading');
    });

    await waitFor(()=>{
      expect(mockNavigation.replace).toHaveBeenCalledWith('Home')
    })
  });

  it('shows alert for empty fields', async () => {
    const {getByText} = renderComponent();
    fireEvent.press(getByText('LOGIN'));
    await waitFor(() => {
      expect(mockNavigation.replace).not.toHaveBeenCalled();
    });
  });

  it('displays an error alert for server errors', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Server error'))) as jest.Mock;

    const {getByText, getByPlaceholderText} = renderComponent();
    fireEvent.changeText(getByPlaceholderText('User name'), 'Usha');
    fireEvent.changeText(getByPlaceholderText('Password'), '123');
    fireEvent.press(getByText('LOGIN'));

    await waitFor(() => {
      expect(mockNavigation.replace).not.toHaveBeenCalled();
    });
  });

  it("should handle no context case",()=>{
    const {getByText} = render(<Login navigation={mockNavigation} />)
    expect(getByText("Something went wrong")).toBeTruthy()
  })
})