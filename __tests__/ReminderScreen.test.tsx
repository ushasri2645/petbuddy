import {render, screen} from '@testing-library/react-native';
import Reminders from '../src/screens/Reminders/ReminderScreen';
import React from 'react';
import {fireEvent, waitFor, act} from '@testing-library/react-native';
import AddReminder from '../src/components/AddreminderModal';
import {API_URL} from '../API';

jest.mock('react-native-date-picker', () => {
  return {
    __esModule: true,
    default: jest.fn().mockReturnValue(null),
  };
});

global.fetch = jest.fn();
describe('Test for remidners page', () => {
  const mockRoute = {
    params: {
      pet: {
        name: 'Buddy',
        age: 3,
        weight: 15,
        height: 50,
        color: 'Brown',
        remarks: 'Friendly dog',
      },
    },
  };

  it('Should render reminder text', () => {
    const {getByTestId} = render(<Reminders route={mockRoute} />);
    expect(getByTestId('reminder-header')).toBeTruthy();
    expect(getByTestId('+-icon')).toBeTruthy();
  });
});

jest.mock('./../src/components/AddreminderModal', () => jest.fn(() => null));

describe('Reminders Component', () => {
  const mockPet = {
    name: 'Fluffy',
    image_uri: '',
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the header and basic UI elements', () => {
    const {getByTestId, getByText} = render(
      <Reminders route={{params: {pet: mockPet}}} />,
    );

    expect(getByTestId('reminder-header').props.children).toBe('⏱ Reminders');
    expect(getByText('+')).toBeTruthy();
  });

  it('should fetch and display reminders', async () => {
    const mockReminders = [
      {
        title: 'Walk the dog',
        date: '2024-11-16T00:00:00Z',
        startTime: '2024-11-16T10:00:00Z',
        endTime: '2024-11-16T11:00:00Z',
        type: 'Daily',
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: async () => mockReminders,
    });
    const mockRoute = {
      params: {
        pet: {
          name: 'Buddy',
          age: 3,
          weight: 15,
          height: 50,
          color: 'Brown',
          remarks: 'Friendly dog',
        },
      },
    };
    const {getByText} = render(<Reminders route={mockRoute} />);

    await waitFor(() => {
      expect(getByText('Walk the dog')).toBeTruthy();
      expect(getByText('On 16 Nov 2024 - 10:00 AM - 11:00 AM')).toBeTruthy();
    });
  });

  it('should display "No reminders found" when no reminders are fetched', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: async () => [],
    });

    const {getByText} = render(<Reminders route={{params: {pet: mockPet}}} />);

    await waitFor(() => {
      expect(getByText('No reminders found: Try adding')).toBeTruthy();
    });
  });

  it('should toggle modal visibility when the "+" button is pressed', async () => {
    const {getByText, queryByTestId} = render(
      <Reminders route={{params: {pet: mockPet}}} />,
    );
    fireEvent.press(getByText('+'));
    expect(AddReminder).toHaveBeenCalledWith(
      expect.objectContaining({visible: true}),
      {},
    );
    // expect(screen.getByTestId("reminder-modal")).toBeTruthy()
  });

  it('should handle API errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    const {getByText} = render(<Reminders route={{params: {pet: mockPet}}} />);

    await waitFor(() => {
      expect(getByText('No reminders found: Try adding')).toBeTruthy();
    });
  });

  it('should render reminders based on the type', async () => {
    const mockReminders = [
      {
        title: 'Walk the dog',
        date: '2024-11-16T00:00:00Z',
        startTime: '2024-11-16T10:00:00Z',
        endTime: '2024-11-16T11:00:00Z',
        type: 'Daily',
      },
      {
        title: 'Walk the dog - Weekly',
        date: '2024-11-16T00:00:00Z',
        startTime: '2024-11-16T10:00:00Z',
        endTime: '2024-11-16T11:00:00Z',
        type: 'Weekly',
      },
      {
        title: 'Walk the dog - Monthly',
        date: '2024-11-16T00:00:00Z',
        startTime: '2024-11-16T10:00:00Z',
        endTime: '2024-11-16T11:00:00Z',
        type: 'Monthly',
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: async () => mockReminders,
    });
    const mockRoute = {
      params: {
        pet: {
          name: 'Buddy',
          age: 3,
          weight: 15,
          height: 50,
          color: 'Brown',
          remarks: 'Friendly dog',
        },
      },
    };
    const {getByText,getByTestId} = render(<Reminders route={mockRoute} />);
    const dailyTypeButton = getByTestId("daily-type")
    const weeklyTypeButton = getByTestId("weekly-type")
    const monthlyTypeButton = getByTestId("monthly-type")
    fireEvent.press(dailyTypeButton)
    await waitFor(() => {
      expect(getByText('Walk the dog')).toBeTruthy();
      expect(getByText('On 16 Nov 2024 - 10:00 AM - 11:00 AM')).toBeTruthy();
    });

    fireEvent.press(weeklyTypeButton)
    await waitFor(() => {
      expect(getByText('Walk the dog')).toBeTruthy();
      expect(getByText('On 16 Nov 2024 - 10:00 AM - 11:00 AM')).toBeTruthy();
    });

    fireEvent.press(monthlyTypeButton)
    await waitFor(() => {
      expect(getByText('Walk the dog')).toBeTruthy();
      expect(getByText('On 16 Nov 2024 - 10:00 AM - 11:00 AM')).toBeTruthy();
    });
  });
});
