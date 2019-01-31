import { Constants, Notifications, Permissions } from 'expo';

export async function getiOSNotificationPermission() {
    const { status } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    if (status !== 'granted') {
        await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
}

export function scheduleNotification() {
    const localNotification = {
        title: 'Remember to study!',
        body: 'This is your final warning, student!',
        android: {
            sound: true,
        },
        ios: {
            sound: true,
        },
    };

    Notifications.cancelAllScheduledNotificationsAsync()
    // uncomment next 2 lines to test local notifications (fired after 5 seconds)
    // let tomorrow = Date.now();
    // tomorrow += 5000;

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);



    const schedulingOptions = { time: tomorrow };
    Notifications.scheduleLocalNotificationAsync(
        localNotification,
        schedulingOptions
    );
}