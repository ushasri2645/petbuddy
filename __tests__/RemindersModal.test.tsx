import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react-native';
import AddReminder from '../src/components/AddreminderModal';
import {Alert} from 'react-native';

jest.mock('react-native-date-picker', () => {
  return {
    __esModule: true,
    default: jest.fn().mockReturnValue(null),
  };
});

jest.mock('@notifee/react-native', () => ({
  createChannel: jest.fn(),
  setNotificationCategories: jest.fn(),
  requestPermission: jest.fn(),
  createTriggerNotification: jest.fn(),
  onForegroundEvent: jest.fn().mockImplementation(() => ({
    remove: jest.fn(),
  })),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

global.fetch = jest.fn();

Alert.alert = jest.fn();

describe('AddReminder', () => {
  const mockCloseFn = jest.fn();
  const mockPet = {name: 'Buddy'};

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<AddReminder visible={true} pet={mockPet} closeFn={mockCloseFn} />);

    expect(screen.getByTestId('add-reminder-text')).toBeTruthy();
    expect(screen.getByText('Select Frequency:')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter Activity')).toBeTruthy();
    expect(screen.getByText('Start Time:')).toBeTruthy();
    expect(screen.getByText('End Time:')).toBeTruthy();
  });

  it('handles activity input change', () => {
    render(<AddReminder visible={true} pet={mockPet} closeFn={mockCloseFn} />);

    const activityInput = screen.getByPlaceholderText('Enter Activity');
    fireEvent.changeText(activityInput, 'Morning walk');
    expect(activityInput.props.value).toBe('Morning walk');
  });

  it('handles frequency selection', () => {
    render(<AddReminder visible={true} pet={mockPet} closeFn={mockCloseFn} />);

    const weeklyOption = screen.getByText('Weekly');
    fireEvent.press(weeklyOption);

    expect(screen.getByText('Select Date for Weekly Reminder')).toBeTruthy();
  });

  it('handles date selection', () => {
    render(<AddReminder visible={true} pet={mockPet} closeFn={mockCloseFn} />);

    const weeklyOption = screen.getByText('Weekly');
    fireEvent.press(weeklyOption);
    expect(screen.getByText('Select Date for Weekly Reminder')).toBeTruthy();

    const datePickerDoneButton = screen.getByText('Done');
    fireEvent.press(datePickerDoneButton);

    expect(screen.getByTestId('selected-date')).toBeTruthy();
  });
  it('handles start time selection', () => {
    render(<AddReminder visible={true} pet={mockPet} closeFn={mockCloseFn} />);

    const weeklyOption = screen.getByText('Weekly');
    fireEvent.press(weeklyOption);
    expect(screen.getByText('Select Date for Weekly Reminder')).toBeTruthy();

    const datePickerDoneButton = screen.getByText('Done');
    fireEvent.press(datePickerDoneButton);

    expect(screen.getByTestId('selected-date')).toBeTruthy();

    const selectStartTime = screen.getByTestId('select-start-time');
    fireEvent.press(selectStartTime);
    const startTiemDone = screen.getByTestId('startTimeDone');
    fireEvent.press(startTiemDone);
    expect(screen.getByTestId('start-time')).toBeTruthy();
  });
  it('handles end time selection', () => {
    render(<AddReminder visible={true} pet={mockPet} closeFn={mockCloseFn} />);

    const weeklyOption = screen.getByText('Weekly');
    fireEvent.press(weeklyOption);
    expect(screen.getByText('Select Date for Weekly Reminder')).toBeTruthy();

    const datePickerDoneButton = screen.getByText('Done');
    fireEvent.press(datePickerDoneButton);

    expect(screen.getByTestId('selected-date')).toBeTruthy();

    const selectEndTime = screen.getByTestId('select-end-time');
    fireEvent.press(selectEndTime);
    const endTimeDone = screen.getByTestId('endTimeDone');
    fireEvent.press(endTimeDone);
    expect(screen.getByTestId('end-time')).toBeTruthy();
  });
  it('should create reminder successfully', async () => {
    (fetch as jest.Mock).mockResolvedValue({status: 201});
    (Alert.alert as jest.Mock).mockResolvedValue('Reminder created');
    render(<AddReminder visible={true} pet={mockPet} closeFn={mockCloseFn} />);

    const activityInput = screen.getByTestId('activity-input');
    fireEvent.changeText(activityInput, 'Morning Walk');

    const typeOption = screen.getByTestId('Weekly-type');
    fireEvent.press(typeOption);

    const addButton = screen.getByTestId('add-button');
    fireEvent.press(addButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith('Reminder created');
    });
  });
  it('should not create reminder successfully & throw error', async () => {
    (fetch as jest.Mock).mockResolvedValue({status: 400});
    (Alert.alert as jest.Mock).mockResolvedValue('Something went wrong.');
    render(<AddReminder visible={true} pet={mockPet} closeFn={mockCloseFn} />);

    const startTime = new Date();
    const endTime = new Date();
    const date = new Date();
    const activityInput = screen.getByTestId('activity-input');
    fireEvent.changeText(activityInput, 'Morning Walk');

    const typeOption = screen.getByTestId('Weekly-type');
    fireEvent.press(typeOption);

    const addButton = screen.getByTestId('add-button');
    fireEvent.press(addButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith('Something went wrong.');
    });
  });
  it('shows an error when fetch fails', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject('API Error'),
    );
    render(<AddReminder visible={true} pet={mockPet} closeFn={mockCloseFn} />);
    const activityInput = screen.getByTestId('activity-input');
    fireEvent.changeText(activityInput, 'Vet Appointment');
    const addButton = screen.getByTestId('add-button');
    fireEvent.press(addButton);
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Unable to add reminder : API Error',
      );
    });
  });
});

describe('AddReminder Component', () => {
  const mockCloseFn = jest.fn();
  const petMock = {name: 'Buddy'}; 

  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('shows an error when fetch fails', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject('API Error'),
    );
    render(<AddReminder visible={true} pet={petMock} closeFn={mockCloseFn} />);
    const activityInput = screen.getByTestId('activity-input');
    fireEvent.changeText(activityInput, 'Vet Appointment');
    const addButton = screen.getByTestId('add-button');
    fireEvent.press(addButton);
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Unable to add reminder : API Error',
      );
    });
  });
});
