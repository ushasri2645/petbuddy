import React from 'react';
import {render,screen} from '@testing-library/react-native';
import Login from '../src/screens/Login/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import { Platform } from 'react-native';

describe("Test for Main Component",()=>{
    it('renders the top image', () => {
        const { getByTestId } = render(
          <NavigationContainer>
            <Login navigation={{replace: jest.fn()}} />
          </NavigationContainer>,
        );
        const imageBackground = getByTestId('top-image');
        expect(imageBackground).toBeTruthy();
    })
    it('it should render the petbuddy image',()=>{
        const { getByTestId } = render(
          <NavigationContainer>
            <Login navigation={{replace: jest.fn()}} />
          </NavigationContainer>,
        );
        const imageBackground = getByTestId('petbuddy-image');
        expect(imageBackground).toBeTruthy();
    })
    it('it should render all the texts correctly',()=>{
        const { getByText } = render(
          <NavigationContainer>
            <Login navigation={{replace: jest.fn()}} />
          </NavigationContainer>,
        );
        expect(getByText('Pet')).toBeTruthy();
        expect(getByText('Buddy!')).toBeTruthy();
        expect(getByText("Don't have an account? Register")).toBeTruthy();
        expect(getByText('©️All Rights Reserved to PetBuddy - 2024')).toBeTruthy();
        expect(getByText('LOGIN')).toBeTruthy();
    })
    it('Should test for input elements',()=>{
        const {getByPlaceholderText} = render(
          <NavigationContainer>
            <Login navigation={{replace: jest.fn()}} />
          </NavigationContainer>,
        );
        expect(getByPlaceholderText('User name')).toBeTruthy();
        expect(getByPlaceholderText('Password')).toBeTruthy();
    })
    it('renders the image with correct height and width for iOS', () => {
        Platform.OS = 'ios';
        render(
          <NavigationContainer>
            <Login navigation={{replace: jest.fn()}} />
          </NavigationContainer>,
        );
        expect(screen.getByTestId('top-image').props.style).toMatchObject({
          resizeMode: 'stretch',
          height: 100,
          width: 400,
        });
      });

})