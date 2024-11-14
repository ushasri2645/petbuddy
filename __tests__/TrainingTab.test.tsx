import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Linking } from 'react-native';
import Training from '../src/tabs/Training/TrainingTab';

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn().mockResolvedValue(undefined),
}));

describe('Training Component', () => {
  it('renders the training page correctly', () => {
    const { getByText } = render(<Training />);

    expect(getByText('Pet Training Essentials')).toBeTruthy();
    expect(getByText('Guidance and Tips to Shape Good Habits')).toBeTruthy();
    expect(getByText('Basic Commands')).toBeTruthy();
    expect(getByText('Behavior Training')).toBeTruthy();
    expect(getByText('Potty Training')).toBeTruthy();
    expect(getByText('Socialization Skills')).toBeTruthy();
  });

  it('opens the correct URL when a button is pressed', () => {
    const { getByText } = render(<Training />);

    const learnMoreButton = getByText('Learn More');
    fireEvent.press(learnMoreButton);

    expect(Linking.openURL).toHaveBeenCalledWith('https://www.akc.org/expert-advice/training/');
  });

  it('opens the correct URL for behavior training', () => {
    const { getByText } = render(<Training />);

    const readMoreButton = getByText('Read More');
    fireEvent.press(readMoreButton);

    expect(Linking.openURL).toHaveBeenCalledWith('https://www.aspca.org/pet-care/dog-care/dog-training');
  });

  it('opens the correct URL for potty training guide', () => {
    const { getByText } = render(<Training />);

    const pottyTrainingButton = getByText('Potty Training Guide');
    fireEvent.press(pottyTrainingButton);

    expect(Linking.openURL).toHaveBeenCalledWith('https://www.humanesociety.org/resources/how-housetrain-your-dog-or-puppy');
  });

  it('opens the correct URL for socialization techniques', () => {
    const { getByText } = render(<Training />);

    const socializationButton = getByText('Explore Socialization Techniques');
    fireEvent.press(socializationButton);

    expect(Linking.openURL).toHaveBeenCalledWith('https://www.cesarsway.com/socializing-your-dog');
  });
});
