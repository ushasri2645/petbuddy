import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import { UserContextProvider,UserContext } from '../src/Context/Context';
import { Button, Text } from 'react-native';
import '@testing-library/jest-native/extend-expect';

const TestComponent: React.FC = () => {
    return (
        <UserContext.Consumer>
            {(context) => (
                <>
                    <Text testID="username">{context?.user?.name || 'No user'}</Text>
                    <Button
                        testID="set-user-button"
                        title="Set User"
                        onPress={() =>
                            context?.setUser({
                                name: 'Usha',
                                password: '123',
                                address: 'Wgl',
                                about: 'Me',
                                email: 'usha@gmail.com',
                                contact: '1234567890',
                                pets: [],
                            })
                        }
                    />
                </>
            )}
        </UserContext.Consumer>
    );
};

describe('UserContext', () => {
    it('should provide the default user as null', () => {
        const { getByTestId } = render(
            <UserContextProvider>
                <TestComponent />
            </UserContextProvider>
        );
        const usernameText = getByTestId('username');
        expect(usernameText).toHaveTextContent('No user');
    });

    it('should update the user context when setUser is called', () => {
        const { getByTestId } = render(
            <UserContextProvider>
                <TestComponent />
            </UserContextProvider>
        );

        const setUserButton = getByTestId('set-user-button');
        fireEvent.press(setUserButton);

        const usernameText = getByTestId('username');
        expect(usernameText).toHaveTextContent('Usha');
    });
});
