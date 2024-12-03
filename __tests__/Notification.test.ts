import notifee, {
  AndroidImportance,
  EventType,
  RepeatFrequency,
  TriggerType,
} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  scheduleNotification,
  fetchAndScheduleReminders,
  setupNotificationChannel,
} from '../src/components/Notifications';
import {API_URL} from '../API';

jest.mock('@notifee/react-native', () => ({
  createChannel: jest.fn(),
  setNotificationCategories: jest.fn(),
  createTriggerNotification: jest.fn(),
  requestPermission: jest.fn(),
  onForegroundEvent: jest.fn(),
  AndroidImportance: {HIGH: 'high'},
  RepeatFrequency: {DAILY: 'daily', WEEKLY: 'weekly'},
  TriggerType: {TIMESTAMP: 'timestamp'},
  EventType: {
    ACTION_PRESS: 'ACTION_PRESS',
  },
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

global.fetch = jest.fn();

describe('Reminder Notification Functions', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers()
    global.Date.now = jest.fn(() => new Date('2024-11-19T10:00:00Z').getTime());
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('should set up the notification channel', async () => {
    await setupNotificationChannel();
    expect(notifee.createChannel).toHaveBeenCalledWith({
      id: 'reminder-channel',
      name: 'Reminders',
      importance: AndroidImportance.HIGH,
    });
  });

  it('should schedule a notification for daily reminders', async () => {
    const reminderData = {type: 'Daily'};
    const triggerTime = new Date('2024-11-20T10:00:00Z');

    await scheduleNotification(
      'Reminder Title',
      'Reminder Body',
      triggerTime,
      reminderData,
      false,
    );

    expect(notifee.createTriggerNotification).toHaveBeenCalledWith(
      {
        title: 'Reminder Title',
        body: 'Reminder Body',
        android: {
          channelId: 'reminder-channel',
          smallIcon: 'ic_launcher',
          actions: [],
        },
        ios: {
          categoryId: 'reminder-actions',
        },
        data: reminderData,
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp: triggerTime.getTime(),
        repeatFrequency: RepeatFrequency.DAILY,
      },
    );
  });

  it('should handle errors in scheduleNotification', async () => {
    (notifee.createTriggerNotification as jest.Mock).mockImplementation(() => {
      throw new Error('Notification error');
    });

    const reminderData = {type: 'Daily'};
    const triggerTime = new Date('2024-11-20T10:00:00Z');

    await scheduleNotification('Error Test', 'Body', triggerTime, reminderData);

    expect(console.log).toHaveBeenCalledWith(
      'Error scheduling notification: Notification error',
    );
  });

  it('should fetch reminders and schedule them', async () => {
    const reminders = [
      {
        startTime: '2024-11-20T12:00:00Z',
        endTime: '2024-11-20T14:00:00Z',
        petName: 'Buddy',
        title: 'Walk',
        type: 'Daily',
      },
    ];

    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify({name: 'testUser'}),
    );
    (fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: () => reminders,
    });

    await fetchAndScheduleReminders();

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('loggedInUser');
    expect(fetch).toHaveBeenCalledWith(`${API_URL}allReminders/testUser`);
    expect(notifee.createTriggerNotification).toHaveBeenCalledTimes(2);
  });

  it('should handle no reminders', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify({name: 'testUser'}),
    );
    (fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: () => [],
    });

    await fetchAndScheduleReminders();

    expect(notifee.createTriggerNotification).not.toHaveBeenCalled();
  });

  it('should handle errors in fetchAndScheduleReminders', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify({name: 'testUser'}),
    );
    (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    await fetchAndScheduleReminders();

    expect(console.log).toHaveBeenCalledWith(
      'Error fetching reminders: Network error',
    );
  });
});

