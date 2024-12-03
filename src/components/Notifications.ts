import notifee, {
  TimestampTrigger,
  TriggerType,
  AndroidImportance,
  EventType,
  RepeatFrequency,
} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../API';

export async function setupNotificationChannel() {
  await notifee.createChannel({
    id: 'reminder-channel',
    name: 'Reminders',
    importance: AndroidImportance.HIGH,
  });
}

const setCategoriesIOS = async () => {
  await notifee.setNotificationCategories([
    {
      id: 'reminder-actions',
      actions: [
        {
          id: 'completed',
          title: 'Completed',
        },
        {
          id: 'not_completed',
          title: 'Not Completed',
        },
      ],
    },
  ]);
};

export async function scheduleNotification(
  title: string,
  body: string,
  triggerTime: Date,
  reminderData: any,
  isEndNotification = false,
) {
  try {
    let next = null;
    if (reminderData.type === 'Monthly') {
      const currentDate = new Date(triggerTime);
      const nextMonthDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate(),
        currentDate.getHours(),
        currentDate.getMinutes(),
      );
      next = nextMonthDate;
    }
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: triggerTime.getTime(),
      repeatFrequency:
        reminderData.type === 'Daily'
          ? RepeatFrequency.DAILY
          : reminderData.type === 'Weekly'
          ? RepeatFrequency.WEEKLY
          : undefined,
    };
    const notificationPayload = {
      title,
      body,
      android: {
        channelId: 'reminder-channel',
        smallIcon: 'ic_launcher',
        actions: isEndNotification
          ? [
              {
                title: 'Completed',
                pressAction: {id: 'completed', launchActivity: 'default'},
              },
              {
                title: 'Not Completed',
                pressAction: {id: 'not_completed', launchActivity: 'default'},
              },
            ]
          : [],
      },
      ios: {
        categoryId: 'reminder-actions',
      },
      data: reminderData,
    };

    await notifee.createTriggerNotification(notificationPayload, trigger);

    if (reminderData.type === 'Monthly' && next) {
      scheduleNotification(title, body, next, reminderData, isEndNotification);
    }
  } catch (error: any) {
    console.log(`Error scheduling notification: ${error.message}`);
  }
}

export const fetchAndScheduleReminders = async () => {
  await notifee.requestPermission();
  await setCategoriesIOS();
  try {
    const user = await AsyncStorage.getItem('loggedInUser');
    if (user) {
      const userObj = JSON.parse(user);
      const response = await fetch(`${API_URL}allReminders/${userObj.name}`);
      const reminders = await response.json();
      reminders.forEach(async (reminder: any) => {
        const startTimeUTC = new Date(reminder.startTime);
        const startTimeLocal = new Date(
          startTimeUTC.getTime() + startTimeUTC.getTimezoneOffset() * 60000,
        );
        const endTimeUTC = new Date(reminder.endTime);
        const endTimeLocal = new Date(
          endTimeUTC.getTime() + endTimeUTC.getTimezoneOffset() * 60000,
        );
        const timeNowUTC = new Date(Date.now());
        const timeNowLocal = new Date(
          timeNowUTC.getTime() + timeNowUTC.getTimezoneOffset() * 60000,
        );
        if (startTimeLocal > timeNowUTC) {
          await scheduleNotification(
            `PetBuddy!`,
            `${reminder.petName}'s ${reminder.title} is pending`,
            new Date(startTimeLocal),
            reminder,
            false,
          );
        }
        if (endTimeLocal > timeNowUTC) {
          await scheduleNotification(
            `PetBuddy!`,
            `Is ${reminder.petName}'s ${reminder.title} completed?`,
            new Date(endTimeLocal),
            reminder,
            true,
          );
        }
      });
    }
  } catch (error: any) {
    console.log(`Error fetching reminders: ${error.message}`);
  }
};

notifee.onForegroundEvent(async ({type, detail}) => {
  if (type === EventType.ACTION_PRESS) {
    const {pressAction, notification} = detail;
    if (pressAction) {
      const reminderData = notification?.data;
      if (pressAction.id === 'completed') {
        console.log('Reminder marked as completed:', reminderData);
        try {
          const response = await fetch(
            `${API_URL}activity/${reminderData?.petName}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(reminderData),
            },
          );
          console.log('Completed response:', response.status);
        } catch (error) {
          console.log('Error marking reminder as completed:', error);
        }
      }
    }
  }
});
