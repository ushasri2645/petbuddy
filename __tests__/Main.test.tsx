import React from 'react';
import {render} from '@testing-library/react-native';
import Main from '../src/screens/Main/MainScreen';
import {NavigationContainer} from '@react-navigation/native';

describe('Main Component', () => {
  beforeEach(() => {});
  it('renders the background image', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <Main navigation={{replace: jest.fn()}} />
      </NavigationContainer>,
    );
    const imageBackground = getByTestId('image-background');
    expect(imageBackground).toBeTruthy();
  });

  it('renders the welcome text', () => {
    const {getByText} = render(
      <NavigationContainer>
        <Main navigation={{replace: jest.fn()}} />
      </NavigationContainer>,
    );
    expect(getByText(/Hey! Welcome/i)).toBeTruthy();
  });

  it('renders the subtitle text', () => {
    const {getByText} = render(
      <NavigationContainer>
        <Main navigation={{replace: jest.fn()}} />
      </NavigationContainer>,
    );
    expect(
      getByText(/While you sit and stay - we'll go out and play/i),
    ).toBeTruthy();
  });

  it('renders the Get Started button', () => {
    const {getByText} = render(
      <NavigationContainer>
        <Main navigation={{replace: jest.fn()}} />
      </NavigationContainer>,
    );
    const getStartedButton = getByText('Get Started');
    const getStartedArrow = getByText('➜');
    expect(getStartedButton).toBeTruthy();
    expect(getStartedArrow).toBeTruthy();
  });
});
